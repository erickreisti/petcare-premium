import { expect, test, type Page } from "@playwright/test";

const SECTIONS = ["home", "services", "about", "prices", "testimonials", "contact"];

// Erros de console e exceções não tratadas durante o teste
function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

// A rolagem é suave (Lenis): espera a seção chegar perto do topo
async function expectNear(page: Page, id: string, timeout?: number) {
  await expect
    .poll(() => page.locator(`#${id}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top)), { timeout })
    .toBeLessThan(200);
}

test.beforeEach(async ({ page }) => {
  // Caminho relativo para respeitar o basePath de E2E_BASE_URL
  await page.goto("./");
});

test("carrega a home com título, seções e foto do hero", async ({ page }) => {
  const errors = collectErrors(page);
  await page.reload();

  await expect(page).toHaveTitle("Petcare Premium | Centro Veterinário de Excelência");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cuidados para a");
  for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();

  // A foto do hero é um <image> de SVG: confere que o arquivo carregou
  const loaded = await page.evaluate(async () => {
    const href = document.querySelector("#home image")?.getAttribute("href");
    if (!href) return false;
    const img = new Image();
    img.src = href;
    await img.decode().catch(() => {});
    return img.naturalWidth > 0;
  });
  expect(loaded).toBe(true);

  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("links do menu levam às seções", async ({ page, isMobile }) => {
  for (const id of ["services", "about", "prices", "testimonials"]) {
    if (isMobile) {
      // O nome do botão alterna entre "Abrir menu" e "Fechar menu"
      const toggle = page.locator('button[aria-controls="mobile-menu"]');
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page.locator("#mobile-menu").locator(`a[href="#${id}"]`).click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    } else {
      // Abaixo de 1600px (o Desktop Chrome tem 1280) o menu do topo fica sempre
      // visível. A nav Principal também contém o menu mobile, oculto no desktop
      const nav = page.getByRole("navigation", { name: "Principal" });
      // Um clique enquanto a página ainda hidrata (ou o Lenis inicia) pode se perder: repete
      await expect(async () => {
        await nav.locator(`a[href="#${id}"]:visible`).click();
        await expectNear(page, id, 3000);
      }).toPass();
      continue;
    }
    await expectNear(page, id);
  }
});

test("assinar um plano mostra o aviso de demo", async ({ page }) => {
  // Um clique antes da hidratação do React não faz nada: repete até o aviso aparecer
  await expect(async () => {
    await page.getByRole("button", { name: /^Assinar / }).first().click();
    await expect(page.getByRole("status")).toContainText("Este site é uma demonstração", { timeout: 1000 });
  }).toPass();
});

test("newsletter mostra o aviso de demo e limpa o campo", async ({ page }) => {
  const email = page.getByLabel("Seu e-mail");
  await email.fill("tutor@exemplo.com");
  await email.press("Enter");
  await expect(page.getByRole("status")).toContainText("nenhum e-mail foi cadastrado");
  await expect(email).toHaveValue("");
});
