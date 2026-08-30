function getNonEmptyLines(csvText) {
  return csvText.split(/\r?\n/).filter((line) => line.trim() !== '');
}

function countRecords(csvText) {
  // This counts physical non-empty lines, so quoted multiline fields are not supported.
  return Math.max(getNonEmptyLines(csvText).length - 1, 0);
}

function getColumnNames(csvText) {
  const headerLine = getNonEmptyLines(csvText)[0];

  if (!headerLine) {
    return [];
  }

  const columnNames = [];
  let columnName = '';
  let insideQuotes = false;
  let fieldWasQuoted = false;

  // Delimiting quotes are omitted, and doubled quotes inside quoted fields become one quote.
  // Only commas outside quoted fields separate columns; multiline fields are unsupported.
  for (let index = 0; index < headerLine.length; index += 1) {
    if (headerLine[index] === '"') {
      if (insideQuotes && headerLine[index + 1] === '"') {
        columnName += '"';
        index += 1;
      } else {
        if (!insideQuotes) {
          fieldWasQuoted = true;
        }

        insideQuotes = !insideQuotes;
      }
    } else if (headerLine[index] === ',' && !insideQuotes) {
      columnNames.push(fieldWasQuoted ? columnName : columnName.trim());
      columnName = '';
      fieldWasQuoted = false;
    } else {
      columnName += headerLine[index];
    }
  }

  columnNames.push(fieldWasQuoted ? columnName : columnName.trim());
  return columnNames;
}

function countColumns(csvText) {
  return getColumnNames(csvText).length;
}
