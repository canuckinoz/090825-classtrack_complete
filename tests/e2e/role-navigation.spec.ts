// Skeleton Playwright tests
import { test, expect } from '@playwright/test';

test.describe('role navigation', () => {
  test.skip('teacher login shows class dashboard and permitted nav', async ({
    page,
  }) => {
    await page.goto('/login/teacher');
    await expect(page).toHaveTitle(/Teacher/);
  });
});
