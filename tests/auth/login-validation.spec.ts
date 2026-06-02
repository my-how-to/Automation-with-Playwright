import { test, expect } from '@playwright/test';

// Clear storage state to ensure tests run in a completely clean/unauthenticated environment
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Validation', () => {

  test.beforeEach(async ({ page }) => {
    // Before each test, navigate to the login page
    await page.goto(process.env.BASE_URL!);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.getByRole('textbox', { name: 'E-Mail-Adresse' }).fill('wrong-user@email.com');
    await page.getByRole('textbox', { name: 'Passwort' }).fill('WrongPassword123!');
    await page.getByRole('button', { name: 'Anmelden' }).click();

    await expect(page.getByText('Fehlermeldung Die E-Mail-')).toBeVisible();

  });

  test('should require fields and validate empty submit', async ({ page }) => {
    // Attempt to submit the form without filling in any fields
    await page.getByRole('button', { name: 'Anmelden' }).click();

    // Check that the fields are highlighted or a warning message appears
    const emailInput = page.getByRole('textbox', { name: 'E-Mail-Adresse' });
    await expect(emailInput).toHaveAttribute('required');
  });

});
