<div align="center">
  <h1>Petcare Premium 🐾</h1>
  
  **Uma moderna landing page para um Centro Veterinário de Excelência.**

  [![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

</div>

<br />

## 📖 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Como Executar Localmente](#-como-executar-localmente)
- [Scripts e Testes](#-scripts-e-testes)
- [Deploy](#-deploy)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🐶 Sobre o Projeto

> ℹ️ **Projeto demonstrativo.** A clínica, os contatos e os depoimentos são fictícios, e os botões de agendamento/assinatura apenas exibem um aviso.

**Petcare Premium** é uma landing page de altíssimo padrão, desenvolvida para clínicas e centros veterinários que buscam transmitir excelência, cuidado e modernidade. O projeto utiliza as tecnologias web mais avançadas de **2026**, garantindo uma experiência de usuário (UX) imersiva, rápida e totalmente otimizada.

O design foi cuidadosamente elaborado com princípios de *Glassmorphism*, *Soft Shadows* e uma paleta de cores institucional que evoca confiança e energia (Azul Marinho e Laranja).

---

## 🌟 Funcionalidades

- **Design Premium & Glassmorphism**: Interface ultra-moderna com efeitos de vidro fosco, sombras suaves e tipografia elegante.
- **Animações de Alto Desempenho**: Micro-interações e efeitos *reveal* no scroll com **GSAP**, respeitando `prefers-reduced-motion`.
- **Performance**: **Next.js 16** (App Router) com export estático, **React 19** com React Compiler e imagens em WebP. A foto do hero é pré-carregada com prioridade alta e os efeitos decorativos (rolagem suave, barra de progresso e bolhas) só carregam depois da primeira pintura.
- **Responsividade Absoluta**: Otimizado para telas de todos os tamanhos (mobile, tablet, desktop) utilizando **Tailwind CSS v4**.
- **SEO e Acessibilidade**: Meta tags, OpenGraph, sitemap, estrutura semântica e navegação por teclado.

---

## 🛠️ Tecnologias

Este projeto foi construído com as melhores ferramentas do ecossistema front-end moderno:

- **Framework:** [Next.js 16.1](https://nextjs.org/)
- **Biblioteca UI:** [React 19](https://react.dev/) (com Babel React Compiler)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
- **Animações:** [GSAP 3.15](https://gsap.com/) com `@gsap/react`
- **Rolagem suave:** [Lenis](https://lenis.darkroom.engineering/)
- **Testes E2E:** [Playwright](https://playwright.dev/) (desktop e celular)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 20 ou superior) instalado na sua máquina.

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/erickreisti/petcare-premium.git
   cd petcare-premium
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador. *(Nota: O Next.js roda na porta 3000 por padrão).*

---

## 🧪 Scripts e Testes

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | Gera o site estático em `out/` |
| `npm run check` | Checagem de tipos (`tsc`) e lint (`eslint`) |
| `npm run e2e` | Smoke tests com Playwright no desktop e no celular (Pixel 7) |

Os testes E2E conferem o título, as seções, a foto do hero, a navegação pelos menus (topo, lateral e mobile), os avisos de demonstração e a ausência de erros no console. Eles usam o `npm run dev` que já estiver rodando ou sobem um. Para testar o build estático, aponte `E2E_BASE_URL` para ele:

```bash
E2E_BASE_URL=http://localhost:4173/petcare-premium/ npm run e2e
```

Na primeira vez, instale o navegador do Playwright com `npx playwright install chromium`.

> 💡 Evite rodar `npm run build` com o `npm run dev` aberto: os dois juntos consomem muita memória.

---

## 🌐 Deploy

O site é exportado como estático (`output: "export"`) e publicado no GitHub Pages em `/petcare-premium`. O `basePath` só é aplicado em produção, então em desenvolvimento o site fica na raiz de `localhost:3000`. Caminhos de arquivos em `public/` passam por `BASE_PATH` (`src/lib/basePath.ts`).

---

## 📁 Estrutura de Diretórios

```text
petcare/
├── .claude/                # Hooks e skills do Claude Code (proteções e verificação)
├── e2e/                    # Testes de ponta a ponta (Playwright)
├── public/                 # Assets públicos (imagens em WebP, ícones)
├── src/
│   ├── app/                # App Router do Next.js (layout, página, sitemap)
│   ├── components/
│   │   ├── layout/         # Header (menus topo, lateral e mobile) e Footer
│   │   ├── sections/       # Seções da home (Hero, Serviços, Sobre, Planos, Depoimentos)
│   │   └── ui/             # Peças reutilizáveis e efeitos (bolhas, rolagem suave, aviso de demo)
│   └── lib/                # Animações compartilhadas, basePath e aviso de demo
├── CLAUDE.md               # Regras do projeto para o Claude Code
├── eslint.config.mjs       # Configurações do ESLint 9
├── next.config.ts          # Configurações do Next.js (export estático e basePath)
├── playwright.config.ts    # Configurações dos testes E2E
└── package.json            # Dependências e scripts do projeto
```

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tem alguma ideia para melhorar esta landing page:

1. Faça um **Fork** do projeto
2. Crie uma **Branch** para sua feature (`git checkout -b feature/MinhaFeatureIncrivel`)
3. Faça o **Commit** de suas alterações (`git commit -m 'feat: Adicionando nova animacao com GSAP'`)
4. Faça o **Push** para a branch (`git push origin feature/MinhaFeatureIncrivel`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença MIT. 

---
<div align="center">
  Desenvolvido com 💙 por <a href="https://github.com/erickreisti">Erick</a>
</div>
