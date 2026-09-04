import { type Page, type Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'FIRST BLOG' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.registerLink = page.getByRole('link', { name: 'Register' });

    this.userAvatar = page.getByTestId('header-avatar');
  }

  async assertNavigationVisible() {
    await expect.soft(this.logo).toBeVisible();
    await expect.soft(this.logo).toHaveAttribute('href', '/');

    await expect.soft(this.loginLink).toBeVisible();
    await expect.soft(this.loginLink).toHaveAttribute('href', '/login');

    await expect.soft(this.registerLink).toBeVisible();
    await expect.soft(this.registerLink).toHaveAttribute('href', '/register');
  }

  async assertUserLoggedIn() {
    await expect(this.userAvatar).toBeVisible();
    await expect.soft(this.loginLink).not.toBeVisible();
    await expect.soft(this.registerLink).not.toBeVisible();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openRegister() {
    await this.registerLink.click();
  }

  async openHome() {
    await this.logo.click();
  }
}
