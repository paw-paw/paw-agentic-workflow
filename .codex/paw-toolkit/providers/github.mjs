const STATE_MAP = new Map([
  ['DRAFT', 'draft'],
  ['OPEN', 'open'],
  ['CLOSED', 'closed'],
  ['MERGED', 'merged'],
]);

const CHECK_STATUS_MAP = new Map([
  ['SUCCESS', 'pass'],
  ['FAILURE', 'fail'],
  ['ERROR', 'fail'],
  ['PENDING', 'pending'],
  ['SKIPPED', 'skipped'],
  ['UNKNOWN', 'unknown'],
]);

export function normalizeGithubSnapshot(input) {
  const state = input?.merged === true
    ? 'merged'
    : STATE_MAP.get(String(input?.state ?? '').toUpperCase()) ?? 'absent';
  const headSha = typeof input?.head_sha === 'string' ? input.head_sha : '';
  const checks = Array.isArray(input?.checks)
    ? input.checks.map((check) => ({
        name: String(check.name ?? ''),
        classification: check.required === true ? 'ci-gated' : 'informational',
        status: CHECK_STATUS_MAP.get(String(check.status ?? '').toUpperCase()) ?? 'unknown',
        head_sha: typeof check.head_sha === 'string' ? check.head_sha : headSha,
      }))
    : [];

  return {
    provider: state === 'absent' ? 'absent' : 'github',
    state,
    head_sha: headSha,
    checks,
    observed_at: typeof input?.observed_at === 'string' ? input.observed_at : '',
  };
}

