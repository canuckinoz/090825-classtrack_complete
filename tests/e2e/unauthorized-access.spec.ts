import { test, expect } from '@playwright/test';

test.describe('unauthorized access', () => {
  test.skip('redirects anonymous user to login', async ({ page }) => {
    await page.goto('/dashboards/class');
    await expect(page).toHaveURL(/login/);
  });
});
