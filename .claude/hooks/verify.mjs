// Stop: antes de o agente encerrar, confere tipos e lint do que ele mudou.
// Se algo falhar, sai com código 2 e o agente continua para corrigir.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));

const root = (process.env.CLAUDE_PROJECT_DIR ?? process.cwd()).replace(
  /^[a-z]:/,
  (d) => d.toUpperCase(),
);

const run = (cmd, args) =>
  spawnSync(cmd, args, { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 });
const git = (...args) => run("git", args).stdout ?? "";

const changed = [
  ...git("diff", "--name-only", "HEAD").split("\n"),
  ...git("ls-files", "--others", "--exclude-standard").split("\n"),
]
  .map((f) => f.trim())
  .filter((f) => /\.(ts|tsx|mts|mjs)$/.test(f) && existsSync(join(root, f)));
if (changed.length === 0) process.exit(0);

// Mesmo conteúdo, mesmo resultado: só roda de novo se algo mudou desde a
// última verificação
const hash = createHash("sha1")
  .update(git("diff", "HEAD"))
  .update(changed.map((f) => readFileSync(join(root, f))).join("\0"))
  .digest("hex");
const cacheDir = join(root, ".claude", ".cache");
const cacheFile = join(cacheDir, "verify.json");
const cache = existsSync(cacheFile)
  ? JSON.parse(readFileSync(cacheFile, "utf8"))
  : {};
if (cache.passed === hash) process.exit(0);
// Já falhou com este mesmo conteúdo e o agente quis parar: deixa ele relatar
if (cache.failed === hash && input.stop_hook_active) process.exit(0);

const bin = (p) => join(root, "node_modules", p);
const steps = [
  ["Tipos", [bin("typescript/bin/tsc"), "--noEmit"]],
  ["Lint", [bin("eslint/bin/eslint.js"), ...changed]],
];

const failures = [];
for (const [name, args] of steps) {
  const r = run(process.execPath, args);
  if (r.status !== 0) {
    const out = `${r.stdout}\n${r.stderr}`.trim().split("\n");
    failures.push(`## ${name}\n${out.slice(-60).join("\n")}`);
  }
}

mkdirSync(cacheDir, { recursive: true });
writeFileSync(
  cacheFile,
  JSON.stringify(failures.length ? { failed: hash } : { passed: hash }),
);

if (failures.length) {
  console.error(
    `A verificação dos arquivos alterados falhou. Corrija antes de encerrar.\n\n${failures.join("\n\n")}`,
  );
  process.exit(2);
}
