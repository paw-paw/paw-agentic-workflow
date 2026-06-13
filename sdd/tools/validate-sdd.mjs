#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { cwd, exit } from 'node:process';
import { pathToFileURL } from 'node:url';

const root = cwd();
const args = new Set(process.argv.slice(2));
const useFixtures = args.has('--fixtures');

const PATCH_KINDS = new Set(['spec', 'batch']);
const LIFECYCLES = new Set(['spec-first', 'spec-anchored']);
const STATUSES = new Set(['active', 'blocked', 'closed', 'abandoned']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
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

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === '[]') return [];
  if (trimmed === 'null') return null;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parsePatchYaml(path) {
  const result = {};
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  let currentList = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && currentList) {
      result[currentList].push(parseScalar(listItem[1]));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      throw new Error(`Unsupported YAML line in ${rel(path)}: ${line}`);
    }
    const [, key, rawValue] = match;
    if (rawValue === '') {
      result[key] = [];
      currentList = key;
    } else {
      result[key] = parseScalar(rawValue);
      currentList = Array.isArray(result[key]) ? key : null;
    }
  }

  return result;
}

function validateManifest(patchDir, options = {}) {
  const errors = [];
  const manifestPath = join(patchDir, 'patch.yaml');
  const isLegacy = options.legacy === true;

  if (isLegacy) {
    if (existsSync(manifestPath)) {
      errors.push(`${rel(manifestPath)} must not exist for legacy fixtures/workspaces`);
    }
    return errors;
  }

  if (!existsSync(manifestPath)) {
    errors.push(`${rel(manifestPath)} is required`);
    return errors;
  }

  let manifest;
  try {
    manifest = parsePatchYaml(manifestPath);
  } catch (error) {
    errors.push(error.message);
    return errors;
  }

  const required = [
    'schema_version',
    'change_id',
    'program_id',
    'patch_kind',
    'lifecycle',
    'status',
    'created_at',
    'closed_at',
    'related_docs',
  ];
  for (const key of required) {
    if (!(key in manifest)) errors.push(`${rel(manifestPath)} missing ${key}`);
  }

  if (manifest.schema_version !== 1) {
    errors.push(`${rel(manifestPath)} schema_version must be 1`);
  }
  if (!PATCH_KINDS.has(manifest.patch_kind)) {
    errors.push(`${rel(manifestPath)} patch_kind must be spec or batch`);
  }
  if (!LIFECYCLES.has(manifest.lifecycle)) {
    errors.push(`${rel(manifestPath)} lifecycle must be spec-first or spec-anchored`);
  }
  if (!STATUSES.has(manifest.status)) {
    errors.push(`${rel(manifestPath)} status must be active, blocked, closed, or abandoned`);
  }
  if (!ISO_DATE.test(manifest.created_at ?? '')) {
    errors.push(`${rel(manifestPath)} created_at must be YYYY-MM-DD`);
  }
  if (manifest.closed_at !== null && !ISO_DATE.test(manifest.closed_at ?? '')) {
    errors.push(`${rel(manifestPath)} closed_at must be YYYY-MM-DD or null`);
  }
  if (!Array.isArray(manifest.related_docs)) {
    errors.push(`${rel(manifestPath)} related_docs must be an array`);
  }
  if (manifest.patch_kind === 'batch' && manifest.lifecycle === 'spec-anchored') {
    errors.push(`${rel(manifestPath)} cannot combine batch + spec-anchored`);
  }
  if (
    manifest.lifecycle === 'spec-anchored' &&
    Array.isArray(manifest.related_docs) &&
    manifest.related_docs.length === 0
  ) {
    errors.push(`${rel(manifestPath)} related_docs is required for spec-anchored`);
  }
  if (manifest.status === 'closed' && !existsSync(join(patchDir, 'cierre.md'))) {
    errors.push(`${rel(patchDir)} is closed but missing cierre.md`);
  }
  if (manifest.status === 'closed' && manifest.closed_at === null) {
    errors.push(`${rel(manifestPath)} closed patches require closed_at`);
  }
  if (manifest.status !== 'closed' && manifest.closed_at !== null) {
    errors.push(`${rel(manifestPath)} open patches must keep closed_at null`);
  }
  if (
    ISO_DATE.test(manifest.created_at ?? '') &&
    ISO_DATE.test(manifest.closed_at ?? '') &&
    manifest.closed_at < manifest.created_at
  ) {
    errors.push(`${rel(manifestPath)} closed_at cannot be earlier than created_at`);
  }
  if (manifest.patch_kind === 'batch') {
    errors.push(...validateBatchContract(patchDir));
  }

  return errors;
}

function validateBatchContract(patchDir) {
  const errors = [];
  const definitionPath = join(patchDir, 'definicion.md');
  if (!existsSync(definitionPath)) {
    errors.push(`${rel(definitionPath)} is required for batch patches`);
    return errors;
  }

  const definition = readFileSync(definitionPath, 'utf8');
  const requiredSections = [
    '## 2. Lista cerrada de items',
    '## 3. Criterio global de cierre',
  ];
  for (const section of requiredSections) {
    if (!definition.includes(section)) {
      errors.push(`${rel(definitionPath)} missing batch section ${section}`);
    }
  }
  if (!/- Item .+:\s*[\r\n]+\s+- criterio de cierre:/m.test(definition)) {
    errors.push(`${rel(definitionPath)} must define at least one item closure criterion`);
  }
  return errors;
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
    try {
      manifests.push({ patchDir, manifest: parsePatchYaml(manifestPath) });
    } catch {
      // Manifest syntax errors are handled by validateManifest.
    }
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
  const errors = useFixtures ? validateFixtures() : [...validateRepo(), ...validateMarkdownLinks(root)];

  if (errors.length > 0) {
    console.error(`SDD validation failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    exit(1);
  }

  console.log(useFixtures ? 'SDD fixture validation passed' : 'SDD repo validation passed');
}
