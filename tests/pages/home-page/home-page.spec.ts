import { test } from 'tests/fixtures/testBase';

test.describe('Home Page - Filters and Sorting (Guest)', () => {
  test.beforeEach(async ({ header, page }) => {
    await page.goto('http://localhost:3000');
    await header.assertNavigationVisible();
  });

  test('should filter articles by title', async ({ homePage }) => {
    const query = 'game';

    await homePage.filterByTitle(query);
    await homePage.assertArticlesContainTitle(query);
  });

  test('should filter articles by tag dropdown', async ({ homePage }) => {
    const tagName = 'SecondTag';
    await homePage.selectTag(tagName);
  });
});
