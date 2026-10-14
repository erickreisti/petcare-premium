// PreToolUse: barra o que não se desfaz ou derruba o ambiente do usuário.
// Sai com código 2: a ação é cancelada e a mensagem volta para o agente.
import { readFileSync } from "node:fs";
import { createConnection } from "node:net";

const input = JSON.parse(readFileSync(0, "utf8"));
const { tool_name: tool, tool_input: args = {} } = input;

function block(reason) {
  console.error(`Bloqueado pelo hook do projeto: ${reason}`);
  process.exit(2);
}

// Resolve true se alguém já escuta na porta (o `npm run dev` do usuário)
const portInUse = (port) =>
  new Promise((resolve) => {
    const s = createConnection({ port, host: "127.0.0.1" });
    s.setTimeout(500);
    s.once("connect", () => (s.destroy(), resolve(true)));
    s.once("timeout", () => (s.destroy(), resolve(false)));
    s.once("error", () => resolve(false));
  });

if (tool === "Bash" || tool === "PowerShell") {
  const cmd = String(args.command ?? "");

  if (
    /\bgit\s+push\b[^|;&]*\s(--force\b|--force-with-lease\b|-f\b|\+\S)/.test(cmd)
  )
    block("push forçado reescreve o histórico remoto. Peça ao usuário.");
  if (/\bgit\s+reset\s+--hard\b/.test(cmd) || /\bgit\s+clean\s+-\w*f/.test(cmd))
    block("descarta trabalho sem volta. Confirme com o usuário antes.");

  // O dev server do usuário roda em node; matar node por nome ou a porta 3000
  // derruba ele junto
  if (
    /\btaskkill\b[^|;&]*\/IM\s+"?node(\.exe)?"?/i.test(cmd) ||
    /\b(Stop-Process|spps)\b[^|;&]*-Name\s+"?node\b/i.test(cmd) ||
    /\b(pkill|killall)\s+(-\S+\s+)*node\b/.test(cmd) ||
    /\bkill-port\b[^|;&]*\b3000\b/.test(cmd)
  )
    block(
      "isso mata o `npm run dev` do usuário. Encerre só o processo que você subiu, pelo PID.",
    );

  // next build com o dev aberto estoura a memória da máquina
  if (/\b(next\s+build|npm\s+run\s+build)\b/.test(cmd) && (await portInUse(3000)))
    block(
      "o dev server está rodando na porta 3000 e o build junto estoura a RAM. Valide com `npm run check` e o dev server, ou peça ao usuário para parar o dev antes.",
    );
}
