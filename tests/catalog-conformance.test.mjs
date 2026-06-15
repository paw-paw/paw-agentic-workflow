import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function listFiles(path) {
  const files = [];
  for (const entry of readdirSync(join(root, path), { withFileTypes: true })) {
    const child = `${path}/${entry.name}`;
    files.push(...(entry.isDirectory() ? listFiles(child) : [child]));
  }
  return files;
}

test('catalog surface is registered and remains adoption-neutral', () => {
  const index = read('docs/README.md');
  const architecture = read('docs/governance/ARCHITECTURE.md');
  const pawReadme = read('paw/README.md');
  const catalogReadme = read('paw/catalogs/README.md');

  assert.match(index, /paw\/catalogs\/\*\*/);
  assert.match(architecture, /\| Catalogs \| `paw\/catalogs\/`/);
  assert.match(pawReadme, /`catalogs\/`/);
  assert.match(
    catalogReadme,
    /does not\s+activate PAW workspaces, adoption automation/,
  );
});

test('catalog tooling is read-only and runtime-neutral', () => {
  const files = listFiles('paw/tools/catalogs').filter((path) => extname(path) === '.mjs');
  const forbiddenWrites =
    /\b(?:appendFile|copyFile|cp|mkdir|rename|rm|rmdir|truncate|unlink|writeFile)(?:Sync)?\b/;

  for (const path of files) {
    const source = read(path);
    assert.doesNotMatch(source, forbiddenWrites, path);
    for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      assert.ok(match[1].startsWith('.') || match[1].startsWith('node:'), path);
    }
  }
});

test('family guide references every canonical family ID', () => {
  const catalog = JSON.parse(read('paw/catalogs/families/catalog.json'));
  const guide = read('paw/catalogs/families/README.md');

  for (const family of catalog.families) {
    assert.match(guide, new RegExp(`\\\`${family.family_id}\\\``));
  }
});
