#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';

import { runValidatorCli } from '../../paw/tools/cli/run-validator-cli.mjs';
import { parsePatchYaml } from '../../paw/tools/validation/parse-patch-yaml.mjs';
import { validatePatchDirectory } from '../../paw/tools/validation/validate-patch-directory.mjs';

const root = cwd();
const LIVE_MARKDOWN_ROOTS = ['docs', 'sdd', '.codex/skills'];

function rel(path) {
  return relative(root, path) || '.';
}

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter((entry) => statSync(entry).isDirectory());
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function validateManifest(patchDir, options = {}) {
  const result = validatePatchDirectory(patchDir, {
    allowedRoots: [patchDir],
    legacyRoots: options.legacy === true ? [patchDir] : [],
  });
  return result.diagnostics
    .filter((diagnostic) => diagnostic.severity === 'error')
    .map((diagnostic) => {
      const line = diagnostic.line === null ? '' : `:${diagnostic.line}`;
      return `${rel(diagnostic.path)}${line} ${diagnostic.message}`;
    });
}

function validateRepo() {
  const errors = [];

  for (const dir of ['sdd', 'sdd/core', 'sdd/parches', 'sdd/orchestration']) {
    if (!existsSync(join(root, dir))) errors.push(`${dir} is required`);
  }
  for (const file of [
    'sdd/core/README.md',
    'sdd/core/patch-model.md',
    'sdd/core/artifact-lifecycle.md',
    'sdd/core/decision-drift-policy.md',
    '.codex/skills/sdd-close/SKILL.md',
  ]) {
    if (!existsSync(join(root, file))) errors.push(`${file} is required`);
  }

  const docsSdd = join(root, 'docs/sdd');
  if (existsSync(docsSdd)) {
    errors.push('docs/sdd must not exist; move SDD artifacts to sdd/parches or sdd/parches/legacy');
  }

  const patchesDir = join(root, 'sdd/parches');
  for (const patchDir of listDirs(patchesDir)) {
    if (patchDir.endsWith('/legacy')) continue;
    errors.push(...validateManifest(patchDir));
  }

  const legacyDir = join(root, 'sdd/parches/legacy');
  if (existsSync(legacyDir)) {
    for (const legacyPatch of listDirs(legacyDir)) {
      if (existsSync(join(legacyPatch, 'patch.yaml'))) {
        errors.push(`${rel(join(legacyPatch, 'patch.yaml'))} must not exist under legacy`);
      }
    }
  }

  return errors;
}

function listAll(path) {
  if (!existsSync(path)) return [];
  const results = [path];
  for (const name of readdirSync(path)) {
    const entry = join(path, name);
    results.push(entry);
    if (statSync(entry).isDirectory()) results.push(...listAll(entry));
  }
  return results;
}

function listMarkdownFiles(path) {
  return listAll(path).filter((entry) => statSync(entry).isFile() && entry.endsWith('.md'));
}

function isWithin(path, parent) {
  const normalizedParent = normalize(parent + sep);
  return normalize(path + sep).startsWith(normalizedParent);
}

function parseManifests(rootDir) {
  const manifests = [];
  const patchesDir = join(rootDir, 'sdd/parches');
  for (const patchDir of listDirs(patchesDir)) {
    if (patchDir.endsWith('/legacy')) continue;
    const manifestPath = join(patchDir, 'patch.yaml');
    if (!existsSync(manifestPath)) continue;
    const parsed = parsePatchYaml(readFileSync(manifestPath, 'utf8'), {
      sourcePath: manifestPath,
    });
    if (parsed.ok) manifests.push({ patchDir, manifest: parsed.value });
  }
  return manifests;
}

function collectDeclaredLiveSources(rootDir) {
  const sources = new Set();
  for (const { manifest } of parseManifests(rootDir)) {
    for (const doc of manifest.related_docs ?? []) {
      sources.add(normalize(doc));
    }
  }
  return sources;
}

function collectClosedPatchDirs(rootDir) {
  return parseManifests(rootDir)
    .filter(({ manifest }) => manifest.status === 'closed')
    .map(({ patchDir }) => patchDir);
}

function shouldSkipMarkdownFile(file, rootDir, declaredLiveSources, closedPatchDirs) {
  const relativeFile = normalize(relative(rootDir, file));
  if (relativeFile.startsWith(`sdd${sep}parches${sep}legacy${sep}`)) return true;
  if (relativeFile.startsWith(`sdd${sep}tests${sep}`)) return true;

  for (const patchDir of closedPatchDirs) {
    if (isWithin(file, patchDir) && !declaredLiveSources.has(relativeFile)) {
      return true;
    }
  }
  return false;
}

function isExternalTarget(target) {
  return /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#') || target.startsWith('//');
}

function stripFragment(target) {
  return target.split('#', 1)[0].split('?', 1)[0];
}

function validateMarkdownLinks(rootDir) {
  const errors = [];
  const declaredLiveSources = collectDeclaredLiveSources(rootDir);
  const closedPatchDirs = collectClosedPatchDirs(rootDir);

  const markdownFiles = LIVE_MARKDOWN_ROOTS.flatMap((dir) => listMarkdownFiles(join(rootDir, dir))).filter(
    (file) => !shouldSkipMarkdownFile(file, rootDir, declaredLiveSources, closedPatchDirs),
  );

  for (const file of markdownFiles) {
    const content = readFileSync(file, 'utf8');
    const markdownLinkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
    for (const match of content.matchAll(markdownLinkRegex)) {
      const rawTarget = match[1].trim();
      if (!rawTarget || isExternalTarget(rawTarget)) continue;
      const target = stripFragment(rawTarget);
      if (!target) continue;
      const resolved = resolve(dirname(file), target);
      if (!existsSync(resolved)) {
        errors.push(`${rel(file)} links to missing ${rawTarget}`);
      }
    }

  }

  return errors;
}

function validateFixtures() {
  const errors = [];
  const fixturesDir = join(root, 'sdd/tests/fixtures');
  for (const fixtureDir of listDirs(fixturesDir)) {
    const expectedPath = join(fixtureDir, 'expected.json');
    if (!existsSync(expectedPath)) {
      errors.push(`${rel(expectedPath)} is required`);
      continue;
    }
    const expected = readJson(expectedPath);
    const fixtureErrors = validateManifest(fixtureDir, { legacy: expected.legacy === true });
    const actualValid = fixtureErrors.length === 0;
    if (actualValid !== expected.valid) {
      errors.push(
        `${rel(fixtureDir)} expected valid=${expected.valid} but got valid=${actualValid}: ${fixtureErrors.join('; ')}`,
      );
    }
  }
  const linkFixturesDir = join(root, 'sdd/tests/link-fixtures');
  for (const fixtureDir of listDirs(linkFixturesDir)) {
    const expectedPath = join(fixtureDir, 'expected.json');
    if (!existsSync(expectedPath)) {
      errors.push(`${rel(expectedPath)} is required`);
      continue;
    }
    const expected = readJson(expectedPath);
    const fixtureErrors = validateMarkdownLinks(fixtureDir);
    const actualValid = fixtureErrors.length === 0;
    if (actualValid !== expected.valid) {
      errors.push(
        `${rel(fixtureDir)} expected valid=${expected.valid} but got valid=${actualValid}: ${fixtureErrors.join('; ')}`,
      );
    }
  }
  return errors;
}

export { validateFixtures, validateMarkdownLinks, validateRepo };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const cliArgs = process.argv.slice(2);
  const legacyFixtures = cliArgs.length === 1 && cliArgs[0] === '--fixtures';
  const legacyRepo = cliArgs.length === 0;

  if (!legacyFixtures && !legacyRepo) {
    process.exitCode = runValidatorCli(cliArgs, { cwd: root });
  } else {
    const errors = legacyFixtures
      ? validateFixtures()
      : [...validateRepo(), ...validateMarkdownLinks(root)];

    if (errors.length > 0) {
      console.error(`SDD validation failed (${errors.length}):`);
      for (const error of errors) console.error(`- ${error}`);
      exit(1);
    }

    console.log(
      legacyFixtures ? 'SDD fixture validation passed' : 'SDD repo validation passed',
    );
  }
}
