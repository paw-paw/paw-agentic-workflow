import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateAdoptionFixtures } from '../paw/tools/adoption/validate-adoption-fixtures.mjs';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

test('adoption surface is registered and remains inactive', () => {
  const index = read('docs/README.md');
  const transition = read('docs/governance/V1-TRANSITION.md');
  const status = read('docs/governance/BOOTSTRAP-STATUS.md');
  const adoption = read('paw/adoption/README.md');

  assert.match(index, /\| `paw\/adoption\/\*\*` \| contract, verifiable \| contract \| authoritative \|/);
  assert.match(transition, /`paw\/adoption\/`/);
  assert.match(status, /Portable adoption contracts/);
  assert.match(adoption, /does not activate adoption\s+automation/);
  assert.match(adoption, /No file in this surface may activate `paw\/parches\/\*\*`/);
});

test('adoption tooling and fixtures validate the complete adoption matrix', () => {
  const result = validateAdoptionFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.adapter_fixture_count, 6);
  assert.equal(result.evidence.record_fixture_count, 6);
  assert.equal(result.evidence.assessment_fixture_count, 5);
});

test('validation commands include adoption checks', () => {
  const readme = read('README.md');
  const agents = read('AGENTS.md');
  const tools = read('paw/tools/README.md');
  const tests = read('paw/tests/README.md');

  assert.match(readme, /node paw\/tools\/validate-adoption\.mjs --fixtures --json/);
  assert.match(agents, /node paw\/tools\/validate-adoption\.mjs --fixtures --json/);
  assert.match(tools, /validate-adoption\.mjs/);
  assert.match(tests, /fixtures\/adoption\/\*\*/);
});
