import { readFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const client = read('src/lib/supabase.js')
const sql = read('supabase/setup.sql')
const gitignore = read('.gitignore')

const filesToScan = [
  'src/lib/supabase.js',
  'supabase/setup.sql',
  'vite.config.js',
  'README.md',
]
const repositoryText = filesToScan.map((path) => read(path)).join('\n')

assert(!/eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/.test(repositoryText), 'JWT-like credential is committed in project configuration')
assert(!/(?:service[_-]?role|sb_secret_)[=:"' ]+[A-Za-z0-9_-]{12,}/i.test(repositoryText), 'privileged Supabase credential appears in project configuration')
assert(client.includes('import.meta.env.VITE_SUPABASE_URL'), 'Supabase URL is not environment based')
assert(/^\.env\.\*$/m.test(gitignore) && /^!\.env\.example$/m.test(gitignore), 'local environment files are not safely ignored')
assert(/enable row level security/i.test(sql), 'whitelist RLS is not enabled')
assert(/revoke all on table public\.whitelist/i.test(sql), 'table privileges are not explicitly revoked')
assert(/grant insert \(handle, post_link, comment_link, wallet, quests\)/i.test(sql), 'anonymous table grant is broader than expected')
assert(!/with check\s*\(\s*true\s*\)/i.test(sql), 'RLS policy accepts every row')
assert(/set search_path = ''/i.test(sql), 'security-definer function does not use an empty search path')

if (failures.length) {
  console.error(`Security gate failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log('Security gate passed.')
