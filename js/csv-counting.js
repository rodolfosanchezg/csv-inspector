function getNonEmptyLines(csvText) {
  return csvText.split(/\r?\n/).filter((line) => line.trim() !== '');
}

function countRecords(csvText) {
  // This counts physical non-empty lines, so quoted multiline fields are not supported.
  return Math.max(getNonEmptyLines(csvText).length - 1, 0);
}

function countColumns(csvText) {
  const headerLine = getNonEmptyLines(csvText)[0];

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
