const readXlsxFile = require("read-excel-file/node");
bluebird = require("bluebird");
function main(fileName) {
    readXlsxFile("file.xlsx").then((rows) => {
        let headers = rows[0];
        // bluebird.map(
        //     rows,
        //     function (currentNumber) {
        //         return Promise((r, s) => {
        //             console.log({ url: currentNumber[8], fileNme: currentNumber[1] });
        //         });
        //         console.log({ url: currentNumber[8], fileNme: currentNumber[1] });
        //         // return Promise.delay(currentNumber * 2, 1000);
        //     },
        //     { concurrency: 2 }
        // );
    });
}

main();
