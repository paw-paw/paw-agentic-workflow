import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  createInstallPlan,
  createUninstallPlan,
  verifyInstallation,
} from '../../tools/distribution/install-plan.mjs';

function checksum(content) {
  return createHash('sha256').update(content).digest('hex');
}

const manifest = {
  files: [
    {
      source_path: 'paw/core/README.md',
      destination_path: 'paw/core/README.md',
      checksum_sha256: checksum('core'),
    },
    {
      source_path: '.codex/README.md',
      destination_path: '.codex/README.md',
      checksum_sha256: checksum('codex'),
    },
  ],
};

function resolver(snapshot) {
  return (destinationPath) => snapshot[destinationPath] ?? null;
}

test('clean install plan creates declared files only', () => {
  const plan = createInstallPlan(manifest, { destinationResolver: resolver({}) });
  assert.equal(plan.ok_to_write, true);
  assert.deepEqual(plan.creates.map((item) => item.destination_path), [
    'paw/core/README.md',
    '.codex/README.md',
  ]);
  assert.equal(plan.conflicts.length, 0);
});

test('install plan detects existing unowned conflicts before writing', () => {
  const plan = createInstallPlan(manifest, {
    destinationResolver: resolver({ 'paw/core/README.md': 'local' }),
  });
  assert.equal(plan.ok_to_write, false);
  assert.equal(plan.conflicts[0].reason, 'existing_unowned_file');
});

test('owned unchanged previous file can be overwritten only with approval', () => {
  const previousRecord = {
    owned_files: [
      {
        destination_path: 'paw/core/README.md',
        checksum_sha256: checksum('old-core'),
      },
    ],
  };
  const blocked = createInstallPlan(manifest, {
    destinationResolver: resolver({ 'paw/core/README.md': 'old-core' }),
    previousRecord,
  });
  assert.equal(blocked.ok_to_write, false);
  assert.equal(blocked.conflicts[0].reason, 'overwrite_requires_approval');

  const approved = createInstallPlan(manifest, {
    destinationResolver: resolver({ 'paw/core/README.md': 'old-core' }),
    previousRecord,
    approveOverwrites: true,
  });
  assert.equal(approved.ok_to_write, true);
  assert.equal(approved.overwrites[0].backup_required, true);
});

test('post-install verification fails when a declared file is missing or changed', () => {
  const result = verifyInstallation(manifest, {
    destinationResolver: resolver({ 'paw/core/README.md': 'core' }),
  });
  assert.equal(result.valid, false);
  assert.deepEqual(result.missing.map((item) => item.destination_path), ['.codex/README.md']);

  const changed = verifyInstallation(manifest, {
    destinationResolver: resolver({
      'paw/core/README.md': 'core',
      '.codex/README.md': 'changed',
    }),
  });
  assert.equal(changed.valid, false);
  assert.deepEqual(changed.changed.map((item) => item.destination_path), ['.codex/README.md']);
});

test('uninstall removes only owned unchanged files and keeps unrelated files', () => {
  const installationRecord = {
    owned_files: [
      {
        destination_path: 'paw/core/README.md',
        checksum_sha256: checksum('core'),
      },
    ],
  };
  const plan = createUninstallPlan(manifest, {
    destinationResolver: resolver({
      'paw/core/README.md': 'core',
      '.codex/README.md': 'codex',
    }),
    installationRecord,
  });
  assert.equal(plan.ok_to_remove, true);
  assert.deepEqual(plan.remove.map((item) => item.destination_path), ['paw/core/README.md']);
  assert.deepEqual(plan.keep.map((item) => item.destination_path), ['.codex/README.md']);
});

test('uninstall blocks changed owned files without approval', () => {
  const installationRecord = {
    owned_files: [
      {
        destination_path: 'paw/core/README.md',
        checksum_sha256: checksum('core'),
      },
    ],
  };
  const plan = createUninstallPlan(manifest, {
    destinationResolver: resolver({ 'paw/core/README.md': 'customized' }),
    installationRecord,
  });
  assert.equal(plan.ok_to_remove, false);
  assert.equal(plan.conflicts[0].reason, 'changed_owned_file_requires_approval');
});

