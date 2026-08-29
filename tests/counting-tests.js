const testResults = document.querySelector('#test-results');
const testSummary = document.querySelector('#test-summary');
let passedTests = 0;
let totalTests = 0;

function runTest(name, getActual, expected) {
  totalTests += 1;
  const result = document.createElement('li');

  try {
    const actual = getActual();
    const passed = actual === expected;

    result.textContent = passed
      ? `PASS: ${name}`
      : `FAIL: ${name} (expected ${expected}, received ${actual})`;

    if (passed) {
      passedTests += 1;
    }
  } catch (error) {
    result.textContent = `FAIL: ${name} (threw ${String(error)})`;
  }

  testResults.append(result);
}

runTest('Records: empty CSV', () => countRecords(''), 0);
runTest('Records: header only', () => countRecords('name,age'), 0);
runTest('Records: header plus one record', () => countRecords('name,age\nAna,32'), 1);
runTest(
  'Records: Windows CRLF line endings',
  () => countRecords('name,age\r\nAna,32\r\nCarlos,41'),
  2,
);
runTest(
  'Records: blank lines are ignored',
  () => countRecords('name,age\n\nAna,32\n \nCarlos,41'),
  2,
);

runTest('Columns: empty CSV', () => countColumns(''), 0);
runTest('Columns: normal header', () => countColumns('name,age,city'), 3);
runTest(
  'Columns: quoted comma',
  () => countColumns('name,"job title, department",city'),
  3,
);
runTest(
  'Columns: escaped double quotes',
  () => countColumns('name,"She said ""hello"", team",city'),
  3,
);

testSummary.textContent = `${passedTests} of ${totalTests} tests passed.`;
