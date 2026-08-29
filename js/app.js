const fileInput = document.querySelector('#csv-file');
const fileNameOutput = document.querySelector('.file-name');
const recordCountOutput = document.getElementById('record-count');
const columnCountOutput = document.getElementById('column-count');
let csvContents = '';
let latestReadId = 0;

function countRecords(csvText) {
  // This counts physical non-empty lines, so quoted multiline fields are not supported.
  const nonEmptyLines = csvText
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '');

  return Math.max(nonEmptyLines.length - 1, 0);
}

function countColumns(csvText) {
  const headerLine = csvText
    .split(/\r?\n/)
    .find((line) => line.trim() !== '');

  if (!headerLine) {
    return 0;
  }

  let columnCount = 1;
  let insideQuotes = false;

  // Only commas outside quoted fields separate columns; multiline fields are unsupported.
  for (let index = 0; index < headerLine.length; index += 1) {
    if (headerLine[index] === '"') {
      if (insideQuotes && headerLine[index + 1] === '"') {
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (headerLine[index] === ',' && !insideQuotes) {
      columnCount += 1;
    }
  }

  return columnCount;
}

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
