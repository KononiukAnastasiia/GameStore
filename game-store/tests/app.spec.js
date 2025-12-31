import { test, expect } from "@playwright/test";

function uniqEmail() {
  return `user_${Date.now()}@test.com`;
}

test("Головна сторінка відкривається і є навігація", async ({ page }) => {
  await page.goto("/");

  // Заголовок сторінки
  await expect(page.getByRole("heading", { name: "GameStore" }).first()).toBeVisible();

  // ✅ Перевіряємо меню тільки всередині <nav>, щоб не ловити кнопку "Перейти в каталог"
  const nav = page.locator("nav");

  await expect(nav.getByRole("link", { name: "Головна", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Каталог", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Про нас", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Контакти", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Вхід", exact: true })).toBeVisible();
});

test("Каталог завантажується з API і показує картки", async ({ page }) => {
  await page.goto("/catalog");

  // Чітко: заголовок сторінки
  await expect(page.getByRole("heading", { name: /Каталог/i }).first()).toBeVisible();

  // Якщо є текст завантаження — дочекаємося поки зникне
  const loadingText = page.getByText("Завантаження каталогу...");
  if (await loadingText.count()) {
    await expect(loadingText).toHaveCount(0);
  }

  // Має бути хоча б 1 гра
  await expect(
    page.getByRole("heading", {
      name: /Cyberpunk 2077|Red Dead Redemption 2|Dota 2|Grand Theft Auto V|The Witcher/i,
    }).first()
  ).toBeVisible();
});

test("Реєстрація → користувач автоматично входить", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("button", { name: "Реєстрація" }).click();

  const email = uniqEmail();
  const password = "12345678";
  const name = "Test User";

  await page.getByLabel("Імʼя").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Пароль").fill(password);

  await page.getByRole("button", { name: /Зареєструватись/i }).click();

  await expect(page.getByRole("heading", { name: /Ви в системі/i })).toBeVisible();
  await expect(page.getByText(email).first()).toBeVisible();
});

test("Вхід працює для вже зареєстрованого користувача", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Реєстрація" }).click();

  const email = `user_${Date.now()}@test.com`;
  const password = "12345678";
  const name = "User2";

  await page.getByLabel("Імʼя").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Пароль").fill(password);
  await page.getByRole("button", { name: /Зареєструватись/i }).click();

  await expect(page.getByText(email).first()).toBeVisible();

  const logoutBtn = page.getByRole("button", { name: /Вийти/i });
  if (await logoutBtn.count()) await logoutBtn.click();

  await page.goto("/login");
  await page.getByRole("button", { name: "Вхід" }).click();

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Пароль").fill(password);
  await page.getByRole("button", { name: /Увійти/i }).click();

  await expect(page.getByText(email).first()).toBeVisible();
});

test("Кнопка Steam веде на store.steampowered.com", async ({ page }) => {
  await page.goto("/catalog");

  const steamLink = page.getByRole("link", { name: /Купити в Steam|Steam/i }).first();
  await expect(steamLink).toBeVisible();

  const href = await steamLink.getAttribute("href");
  expect(href).toContain("store.steampowered.com");
});

