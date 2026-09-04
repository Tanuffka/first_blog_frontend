import { type Page, type Locator, expect } from '@playwright/test';

export class HomePageComponent {
  readonly page: Page;
  readonly searchTitle: Locator;
  readonly filterTags: Locator;
  readonly sortSelect: Locator;
  readonly articleTitles: Locator;
  readonly articleCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTitle = page.getByRole('textbox', {
      name: /search \(by title\)/i,
    });
    this.filterTags = page.getByRole('combobox', {
      name: /search \(by tags\)/i,
    });
    this.sortSelect = page.locator('select[name="sort"]');
    this.articleCards = page.getByTestId('article');
    this.articleTitles = page.locator('[data-testid="article"]');
    // this.articleTitles = this.articleCards.getByTestId('');
  }
  async filterByTitle(title: string): Promise<void> {
    await this.searchTitle.fill(title);
    await Promise.race([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('article') && response.status() === 200,
        { timeout: 3000 },
      ),
      this.page.waitForTimeout(600),
    ]).catch(() => {});
  }

  async assertArticlesContainTitle(expectedTitle: string): Promise<void> {
    // Чекаємо, поки хоча б один заголовок оновиться і міститиме шукане слово
    const targetTitle = this.articleTitles.first();

    await expect(targetTitle).toBeVisible();
    await expect(targetTitle).toContainText(expectedTitle, {
      ignoreCase: true,
      timeout: 7000, // даємо час на запит після дебаунсу
    });
  }
  async selectTag(tagName: string): Promise<void> {
    await this.filterTags.click();
    await this.filterTags.fill(tagName);
    await this.page.getByRole('option', { exact: true, name: tagName }).click();
  }

  async assertArticlesContainTag(tagName: string): Promise<void> {
    await expect(this.articleCards.first()).toBeVisible();
    const cards = await this.articleCards.all();
    for (const card of cards) {
      await expect(card).toContainText(tagName);
    }
  }
}
