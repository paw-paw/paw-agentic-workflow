import assert from 'node:assert/strict';
import test from 'node:test';
import { validateFixtures, validateMarkdownLinks, validateRepo } from '../sdd/tools/validate-sdd.mjs';

test('SDD repo validation passes', () => {
  assert.deepEqual([...validateRepo(), ...validateMarkdownLinks(process.cwd())], []);
});

test('SDD fixture validation passes', () => {
  assert.deepEqual(validateFixtures(), []);
});
