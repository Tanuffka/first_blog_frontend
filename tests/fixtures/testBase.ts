import { test as testBase, expect } from '@playwright/test';

import { HeaderComponent } from '../page-object/HeaderComponent';
import { HomePageComponent } from '../page-object/HomePageComponent';

type CustomFixtures = {
  header: HeaderComponent;
  homePage: HomePageComponent;
};

export const test = testBase.extend<CustomFixtures>({
  header: async ({ page }, reuse) => {
    const header = new HeaderComponent(page);
    await reuse(header);
  },
  homePage: async ({ page }, reuse) => {
    await reuse(new HomePageComponent(page));
  },
});

export { expect };
