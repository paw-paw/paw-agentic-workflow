import { createHash } from 'node:crypto';

function sha256(content) {
  return createHash('sha256').update(content ?? '').digest('hex');
}

function destinationContent(entry, destinationResolver) {
  if (!destinationResolver) return null;
  const value = destinationResolver(entry.destination_path);
  return value === undefined ? null : value;
}

function previousOwned(previousRecord, destinationPath) {
  return previousRecord?.owned_files?.find((file) => file.destination_path === destinationPath) ?? null;
}

function action(type, entry, extra = {}) {
  return {
    type,
    source_path: entry.source_path,
    destination_path: entry.destination_path,
    ...extra,
  };
}

export function createInstallPlan(manifest, {
  destinationResolver,
  previousRecord = null,
  approveOverwrites = false,
} = {}) {
  const creates = [];
  const unchanged = [];
  const overwrites = [];
  const conflicts = [];

  for (const entry of manifest.files ?? []) {
    const content = destinationContent(entry, destinationResolver);
    if (content === null) {
      creates.push(action('create', entry));
      continue;
    }

    const currentChecksum = sha256(content);
    if (currentChecksum === entry.checksum_sha256) {
      unchanged.push(action('unchanged', entry));
      continue;
    }

    const owned = previousOwned(previousRecord, entry.destination_path);
    if (!owned) {
      conflicts.push(action('conflict', entry, {
        reason: 'existing_unowned_file',
        current_checksum: currentChecksum,
      }));
      continue;
    }

    if (owned.checksum_sha256 !== currentChecksum) {
      conflicts.push(action('conflict', entry, {
        reason: 'local_customization',
        current_checksum: currentChecksum,
        previous_checksum: owned.checksum_sha256,
      }));
      continue;
    }

    if (!approveOverwrites) {
      conflicts.push(action('conflict', entry, {
        reason: 'overwrite_requires_approval',
        current_checksum: currentChecksum,
      }));
      continue;
    }

    overwrites.push(action('overwrite', entry, {
      previous_checksum: owned.checksum_sha256,
      backup_required: true,
    }));
  }

  return {
    ok_to_write: conflicts.length === 0,
    creates,
    unchanged,
    overwrites,
    conflicts,
  };
}

export function verifyInstallation(manifest, { destinationResolver } = {}) {
  const missing = [];
  const changed = [];
  const verified = [];

  for (const entry of manifest.files ?? []) {
    const content = destinationContent(entry, destinationResolver);
    if (content === null) {
      missing.push(action('missing', entry));
      continue;
    }
    const currentChecksum = sha256(content);
    if (currentChecksum !== entry.checksum_sha256) {
      changed.push(action('changed', entry, { current_checksum: currentChecksum }));
      continue;
    }
    verified.push(action('verified', entry));
  }

  return {
    valid: missing.length === 0 && changed.length === 0,
    verified,
    missing,
    changed,
  };
}

export function createUninstallPlan(manifest, {
  destinationResolver,
  installationRecord = null,
  approveChangedRemoval = false,
} = {}) {
  const remove = [];
  const keep = [];
  const conflicts = [];
  const ownedFiles = installationRecord?.owned_files ?? [];

  for (const entry of manifest.files ?? []) {
    const owned = ownedFiles.find((file) => file.destination_path === entry.destination_path);
    const content = destinationContent(entry, destinationResolver);
    if (content === null) {
      keep.push(action('already_absent', entry));
      continue;
    }
    if (!owned) {
      keep.push(action('keep_unowned', entry));
      continue;
    }

    const currentChecksum = sha256(content);
    if (currentChecksum === entry.checksum_sha256 || approveChangedRemoval) {
      remove.push(action('remove', entry, { current_checksum: currentChecksum }));
      continue;
    }

    conflicts.push(action('conflict', entry, {
      reason: 'changed_owned_file_requires_approval',
      current_checksum: currentChecksum,
    }));
  }

  return {
    ok_to_remove: conflicts.length === 0,
    remove,
    keep,
    conflicts,
  };
}

