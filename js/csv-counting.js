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
  let quoteHasClosed = false;

  function finishColumn() {
    columnNames.push(fieldWasQuoted ? columnName : columnName.trim());
    columnName = '';
    fieldWasQuoted = false;
    quoteHasClosed = false;
  }

  // Delimiting quotes are omitted, and doubled quotes inside quoted fields become one quote.
  // Whitespace outside quoted fields is discarded, while inner whitespace is preserved.
  // Only commas outside quoted fields separate columns; multiline fields are unsupported.
  for (let index = 0; index < headerLine.length; index += 1) {
    if (headerLine[index] === '"') {
      if (insideQuotes && headerLine[index + 1] === '"') {
        columnName += '"';
        index += 1;
      } else {
        if (!insideQuotes) {
          if (columnName.trim() === '') {
            columnName = '';
            fieldWasQuoted = true;
          }
        } else {
          quoteHasClosed = true;
        }

        insideQuotes = !insideQuotes;
      }
    } else if (headerLine[index] === ',' && !insideQuotes) {
      finishColumn();
    } else if (fieldWasQuoted && quoteHasClosed && headerLine[index].trim() === '') {
      continue;
    } else {
      columnName += headerLine[index];
    }
  }

  finishColumn();
  return columnNames;
}

function countColumns(csvText) {
  return getColumnNames(csvText).length;
}
