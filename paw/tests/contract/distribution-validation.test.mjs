import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateDistributionContracts } from '../../tools/distribution/validate-distribution-contracts.mjs';
import {
  validateDistributionFixtures,
} from '../../tools/distribution/validate-distribution-fixtures.mjs';
import { validateDistributionManifest } from '../../tools/distribution/validate-distribution-manifest.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

test('canonical distribution manifest is valid', () => {
  const result = validateDistributionContracts(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.contract_count, 1);
  assert.equal(result.evidence.schema_count, 1);
  assert.ok(result.evidence.file_count > 0);
});

test('distribution fixture matrix covers manifest integrity rules', () => {
  const result = validateDistributionFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.fixture_count, 4);
  assert.equal(result.evidence.valid_count, 1);
  assert.equal(result.evidence.invalid_count, 3);
});

test('distribution manifest rejects excluded private source paths', () => {
  const fixture = readJson('paw/tests/fixtures/distribution/invalid-excluded-source/case.json');
  const result = validateDistributionManifest(fixture.manifest, '<fixture>', {
    fileResolver(sourcePath) {
      return fixture.filesystem[sourcePath] ?? null;
    },
  });
  assert.ok(result.diagnostics.some(({ code }) => code === 'DISTRIBUTION_EXCLUDED_SOURCE'));
});

test('distribution manifest rejects stable release publication in patch 09', () => {
  const fixture = readJson('paw/tests/fixtures/distribution/invalid-stable-release/case.json');
  const result = validateDistributionManifest(fixture.manifest, '<fixture>', {
    fileResolver(sourcePath) {
      return fixture.filesystem[sourcePath] ?? null;
    },
  });
  assert.ok(result.diagnostics.some(({ code }) => code === 'DISTRIBUTION_STABLE_RELEASE_INVALID'));
});

