import { test, expect } from 'tests/fixtures/testBase';

test.describe('Header navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Checking header navigation elements names', async ({ page }) => {
    await expect.soft(page.getByRole('banner')).toContainText('FIRST BLOG');
    await expect.soft(page.getByRole('banner')).toContainText('Login');
    await expect.soft(page.getByRole('banner')).toContainText('Register');
  });

  test('should display all header links on homepage', async ({ header }) => {
    await header.assertNavigationVisible();
  });

  test('should navigate to registration page via header', async ({
    header,
    page,
  }) => {
    await header.openRegister();
    await expect(page).toHaveURL(/.*register/);
  });

  test('should navigate to login page via header', async ({ header, page }) => {
    await header.openLogin();
    await expect(page).toHaveURL(/.*login/);
  });

  test('should navigate to home page when clicking logo', async ({
    header,
    page,
  }) => {
    await header.openRegister();
    await header.openHome();
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
