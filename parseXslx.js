const readXlsxFile = require('read-excel-file/node');

// File path.
readXlsxFile('file.xlsx').then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.
  console.log(rows[1])
})

// Readable Stream.
