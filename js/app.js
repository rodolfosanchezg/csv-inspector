const fileInput = document.querySelector('#csv-file');
const fileNameOutput = document.querySelector('.file-name');
const recordCountOutput = document.getElementById('record-count');
const columnCountOutput = document.getElementById('column-count');
let csvContents = '';
let latestReadId = 0;

// Each new selection invalidates earlier reads that may finish later.
fileInput.addEventListener('change', async () => {
  const readId = ++latestReadId;
  const selectedFile = fileInput.files[0];
  recordCountOutput.textContent = '-';
  columnCountOutput.textContent = '-';
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
    recordCountOutput.textContent = countRecords(csvContents);
    columnCountOutput.textContent = countColumns(csvContents);
    console.log('CSV file loaded successfully.');
  } catch (error) {
    if (readId !== latestReadId) {
      return;
    }

    csvContents = '';
    console.error('Unable to read the CSV file.', error);
  }
});
