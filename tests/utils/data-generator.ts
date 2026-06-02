const getRandomInt = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = <T>(arr: T[]): T => 
  arr[Math.floor(Math.random() * arr.length)];

// This file is responsible for generating dynamic test data for our lead registration tests.
export interface TestData {
  type: 'enterprise' | 'educational institution';
  uiType: string;
  organisation: string;
  bereich: string;
  employees: string;
  employeesFieldName: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  web: string;
  commentField: string;
  statusComment: string;
}

// The createTestData function generates realistic test data based on 
// the client type (enterprise or educational institution) and allows for overriding specific fields when needed.
export function createTestData(
  clientType: 'enterprise' | 'educational institution',
  overrides: Partial<TestData> = {} // Allows overriding any field in the generated data
): TestData {
  const uniqueId = Date.now().toString().slice(-7); 
  const prefix = clientType === 'enterprise' ? 'ENT' : 'EDU';
  const orgName = overrides.organisation || `${prefix} Organization ${uniqueId}`;
  
  const employeeRanges = [
    { min: 1, max: 50 },
    { min: 51, max: 500 },
    { min: 501, max: 1500 },
    { min: 1501, max: 3000 },
    { min: 3001, max: 10000 }
  ];
  
  const selectedRange = getRandomElement(employeeRanges);
  const randomEmployeesCount = getRandomInt(selectedRange.min, selectedRange.max).toString();

  const germanUiType = clientType === 'enterprise' 
    ? 'audit berufundfamilie' 
    : 'audit familiengerechte hochschule';

    const fieldName = clientType === 'enterprise' 
    ? 'Anzahl Beschäftigte' 
    : 'Anzahl Studierende';

  // 
  const baseData: TestData = {
    type: clientType,
    uiType: germanUiType,
    organisation: orgName,
    bereich: `Audit Department ${uniqueId}`,
    employees: randomEmployeesCount, 
    employeesFieldName: fieldName, 
    street: `Street Name ${uniqueId}`,
    zip: getRandomInt(10000, 99999).toString(), 
    city: 'Berlin',
    phone: `+49 69 ${getRandomInt(1000000, 9999999)}`, 
    email: `user_${uniqueId}@email.address`,
    web: `website-${uniqueId}.com`,
    commentField: `This is a system generated test comment for the client ${orgName}. Validating form step data entry.`,
    statusComment: `Lead status updated successfully for the client ${orgName}.`
  };

  // Merge the base data with any overrides provided, allowing for specific fields to be customized while still generating realistic defaults for the rest.
  return { ...baseData, ...overrides };
}
