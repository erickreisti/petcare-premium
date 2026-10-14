import { defineConfig, devices } from "@playwright/test";

// Smoke de ponta a ponta. Por padrão usa o `next dev` em localhost:3000 (sobe
// um se não houver). E2E_BASE_URL aponta para outro servidor, por exemplo o
// build estático em http://localhost:4173/petcare-premium/
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000/";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  // O `next dev` compila a página na primeira visita
  timeout: 90_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
