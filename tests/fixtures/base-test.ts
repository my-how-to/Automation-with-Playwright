import { test as base } from '@playwright/test';
import { createTestData, type TestData } from '../utils/data-generator';

// Describe the shape of the fixtures we want to use in our tests
type MyFixtures = {
  enterpriseClient: TestData;
  educationalClient: TestData;
};

// Extend the base test with our custom fixtures
export const test = base.extend<MyFixtures>({
  
  // Fixture for Enterprise Client with 2000 employees
  enterpriseClient: async ({}, use) => {
    const data = createTestData('enterprise', { 
      employees: '2000',
    //   city: 'Munich',
    //   organisation: 'My Custom Fixed Name'
    });
    // Pass the generated data to the test
    await use(data); 
  },

  // Fixture for Educational Institution with 5000 employees
  educationalClient: async ({}, use) => {
    const data = createTestData('educational institution', { 
      employees: '5000' 
    });
    // Pass the generated data to the test
    await use(data);
  },
});

// Export the built-in expect so we don't have to import it separately
export { expect } from '@playwright/test';
