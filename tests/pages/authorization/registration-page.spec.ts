import { test, expect } from 'tests/fixtures/testBase';

test.describe('Registration', () => {
  test.beforeEach(async ({ header, page }) => {
    await page.goto('http://localhost:3000');
    await header.assertNavigationVisible();
  });

  test('Checking link redirection to registration page', async ({ page }) => {
    await page.getByRole('link', { name: 'register' }).click();

    await expect(page).toHaveURL(/.*register/);
  });

  test('Should successfully register with valid credentials', async ({
    page,
  }) => {
    const uniqueEmail = `tanyaa.ischenko+${Date.now()}@gmail.com`;

    await page.getByRole('link', { name: 'register' }).click();
    await page.getByLabel(/first\s*name/i).fill('Tetiana');
    await page.getByLabel(/last\s*name/i).fill('BozhTest');
    await page.locator('input[name="email"]').fill(uniqueEmail);
    await page.locator('input[name="password"]').fill('Tanya123$$');
    await page.locator('input[name="confirmPassword"]').fill('Tanya123$$');
    await page.getByRole('button', { name: 'register' }).click();

    await expect(page).toHaveURL(/.*login/);
  });

  test('Should not register with unvalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'register' }).click();
    await page.getByLabel(/first\s*name/i).fill('Tetiana');
    await page.getByLabel(/last\s*name/i).fill('BozhTEST');
    await page.locator('input[name="email"]').fill('tanyaa.ischenko@gmail.com');
    await page.locator('input[name="password"]').fill('T$$');
    await page.locator('input[name="confirmPassword"]').fill('Tanya$$');
    await page.getByRole('button', { name: 'register' }).click();
    await expect(page).toHaveURL(/.*login/);
  });
});
