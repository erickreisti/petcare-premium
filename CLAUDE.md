# PetCare Premium

Site institucional **de demonstração** de um centro veterinário. Não há
backend: ações como assinar plano ou newsletter chamam `showDemoNotice`
(`src/lib/demo.ts`) e mostram um aviso.

- Responda em português (pt-BR). Textos do site também em pt-BR.
- Stack: Next.js 16 (Turbopack, React Compiler), React 19, Tailwind v4, GSAP
  com `@gsap/react` e Lenis.
- Export estático (`output: "export"`) publicado no GitHub Pages com basePath
  `/petcare-premium` só em produção. Caminhos de arquivos em `public/` passam
  por `BASE_PATH` (`src/lib/basePath.ts`). Imagens não são otimizadas pelo
  Next: redimensione e converta para webp antes de adicionar.
- Animações respeitam `prefers-reduced-motion` via `gsap.matchMedia()`.
- Efeitos decorativos (Lenis, barra de progresso, bolhas) carregam depois da
  primeira pintura, em `DeferredEffects`. Não traga eles de volta para o
  bundle inicial.

## Comandos

- `npm run check`: tipos e lint
- `npm run e2e`: smoke Playwright (desktop e celular)
- `/verify`: as duas coisas, com relatório

## Cuidados

- O usuário costuma deixar `npm run dev` aberto. Não mate processos node por
  nome nem a porta 3000. Encerre só o que você subiu, pelo PID.
- `next build` com o dev rodando estoura a memória. Valide com
  `npm run check`, o dev server e os testes. Faça build só com o dev parado.
- Não faça commit sem o usuário pedir.
