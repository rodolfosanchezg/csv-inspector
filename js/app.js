const fileInput = document.querySelector('#csv-file');
const fileNameOutput = document.querySelector('.file-name');

// Update the displayed name whenever the file selection changes.
fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];
  fileNameOutput.textContent = selectedFile
    ? `File: ${selectedFile.name}`
    : 'File: No file selected';
});
