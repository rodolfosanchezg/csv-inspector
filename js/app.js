const fileInput = document.querySelector('#csv-file');
const fileNameOutput = document.querySelector('.file-name');
const recordCountOutput = document.getElementById('record-count');
const columnCountOutput = document.getElementById('column-count');
const columnNamesSection = document.getElementById('column-names-section');
const columnNamesOutput = document.getElementById('column-names');
let csvContents = '';
let latestReadId = 0;

function displayColumnNames(columnNames) {
  columnNamesSection.hidden = columnNames.length === 0;
  columnNamesOutput.replaceChildren();

  columnNames.forEach((columnName) => {
    const listItem = document.createElement('li');
    listItem.textContent = columnName;
    columnNamesOutput.append(listItem);
  });
}

// Each new selection invalidates earlier reads that may finish later.
fileInput.addEventListener('change', async () => {
  const readId = ++latestReadId;
  const selectedFile = fileInput.files[0];
  recordCountOutput.textContent = '-';
  columnCountOutput.textContent = '-';
  displayColumnNames([]);
  fileNameOutput.textContent = selectedFile
    ? `File: ${selectedFile.name}`
    : 'File: No file selected';

  if (!selectedFile) {
    csvContents = '';
    return;
  }

  try {
    const fileText = await selectedFile.text();

    if (readId !== latestReadId) {
      return;
    }

    csvContents = fileText;
    const columnNames = getColumnNames(csvContents);
    recordCountOutput.textContent = countRecords(csvContents);
    columnCountOutput.textContent = columnNames.length;
    displayColumnNames(columnNames);
    console.log('CSV file loaded successfully.');
  } catch (error) {
    if (readId !== latestReadId) {
      return;
    }

    csvContents = '';
    console.error('Unable to read the CSV file.', error);
  }
});
