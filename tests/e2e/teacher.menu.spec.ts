import { test, expect } from '@playwright/test';

test('teacher sees only class features', async ({ page }) => {
  await page.goto('/?autologin=1');
  await expect(page.getByText('Quick Log')).toBeVisible();
  await expect(page.getByText('ABC Tracker')).toBeVisible();
  await expect(page.getByText('AI Dashboard')).toBeHidden();
});


