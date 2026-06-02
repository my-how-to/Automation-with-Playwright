import { test as setup, expect } from '@playwright/test';

// This file is responsible for setting up authentication before tests run. 
// It will log in once and save the session state to a file, which can then be reused in other tests to avoid logging in repeatedly.
const authFile = 'playwright/.auth/user.json';

setup('Setup authenticated session', async ({ page }) => {
  // 1. Navigate to the login page (using BASE_URL from .env)
  await page.goto(process.env.BASE_URL!);
  
  // 2. Fill in the login form with credentials from .env and submit
  await page.getByRole('textbox', { name: 'E-Mail-Adresse' }).fill(process.env.SITE_USER_AUDITOR!);
  await page.getByRole('textbox', { name: 'Passwort' }).fill(process.env.SITE_USER_AUDITOR_PASS!);
  await page.getByRole('button', { name: 'Anmelden' }).click();

  // 3. Wait for the URL to change to the authenticated area (adjust the URL pattern as needed) 
  await page.waitForURL('**/de?check_logged_in=1', { timeout: 15000 });

  // 4. Wait for the network to be idle to ensure all resources have loaded after login
  await page.waitForLoadState('networkidle');

  // 5. Optionally, wait for a specific element that indicates successful login (e.g., a user profile link or dashboard element)
  await page.getByRole('link', { name: 'Leads', exact: true }).waitFor({ state: 'visible', timeout: 10000 });

  // 6. Save the authenticated session state to a file for reuse in other tests
  await page.context().storageState({ path: authFile });
});
