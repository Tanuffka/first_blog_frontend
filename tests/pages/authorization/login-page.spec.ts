import { test, expect } from 'tests/fixtures/testBase';
test.describe('Authentication', () => {
  test.beforeEach(async ({ header, page }) => {
    await page.goto('http://localhost:3000');
    await header.assertNavigationVisible();
  });

  test('Checking link redirection to login page', async ({ page }) => {
    // console.log(await page.getByTestId('main-app-header').innerHTML());
    await page.getByRole('link', { name: 'login' }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('Should successfully login with valid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click();
    await page
      .locator('input[name="email"]')
      .fill('tanyaa.ischenko+2@gmail.com');
    await page.locator('input[name="password"]').fill('Tanya123$$');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(
      page.getByRole('link', { name: 'create article' }),
    ).toBeVisible();
  });

  test('should show user avatar in header after successful login', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'login' }).click();
    await page
      .locator('input[name="email"]')
      .fill('tanyaa.ischenko+2@gmail.com');
    await page.locator('input[name="password"]').fill('Tanya123$$');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(
      page.getByRole('link', { name: 'create article' }),
    ).toBeVisible();
  });

  test('Should not login with unvalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click();
    await page
      .locator('input[name="email"]')
      .fill('tanyaa.ischenko.TEST@gmail.com');
    await page.locator('input[name="password"]').fill('Tanya23$$');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(
      page.getByRole('link', { name: 'create article' }),
    ).toBeVisible();
  });
});
