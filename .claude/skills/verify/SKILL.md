---
name: verify
description: Roda a verificação completa do site (tipos, lint e o smoke E2E no desktop e no celular) e resume o resultado. Use antes de commit/push ou quando o usuário pedir para testar tudo.
---

# Verificação completa

Rode na ordem e **não pare no primeiro erro**: colete tudo para relatar de uma vez.

1. `npm run check`: `tsc --noEmit` + `eslint .`
2. `npm run e2e`: Playwright nos projetos `desktop` e `celular`. Usa o
   `npm run dev` de `localhost:3000` se já estiver rodando; senão sobe um
   (a primeira compilação demora).

Para testar o build estático (com o basePath `/petcare-premium`), sirva a
pasta `out` dentro de uma pasta `petcare-premium` e rode com
`E2E_BASE_URL=http://localhost:<porta>/petcare-premium/`. **Só rode
`npm run build` se o dev server estiver parado**: os dois juntos estouram a RAM.

## Relatório

Uma linha por etapa (✅/❌ e números: testes passados/falhos por projeto). Para
cada falha: arquivo:linha e a mensagem, sem colar o log inteiro. Não diga que
está tudo certo se alguma etapa não rodou.

Corrija erros só se o usuário pediu. Senão, relate.
