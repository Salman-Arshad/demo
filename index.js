xlsx = require("node-xlsx").default;
const request = require("request");
const fs = require("fs");
bluebird = require("bluebird");
async function main(fileName) {
    let csv = xlsx.parse(`data.xlsx`);
    let data = csv[0].data;
    // console.log(data);
    // console.log(workSheetsFromFile[0].data);
    //    for(let i=0;i<data.length;i++){
    //        console.log(data[i][10])
    //    }
    // const show = data[0].data;
    for (let i = 1; i < 2; i++) {
        console.log("runnig", i);
        let e = data[i];
        if (e[9]) {
            let url = e[9];
            console.log(url);
            url = url.substr(0, url.lastIndexOf("0")) + "1";
            if (e[10]) {
                turl = e[10];
                turl = turl.substr(0, turl.lastIndexOf("0")) + "1";
            }

            await downLoadFile(url, e[0].toString());
            console.log("file downloaded");
            if (e[10]) {
                await downLoadFile(turl, e[0].toString() + ".jpg");
                console.log("th downloaded");
            }
            let obj = {};
            obj.url = await upload(e[0].toString());
            if (e[10]) {
                obj.thumbnail = await upload(e[0].toString() + ".jpg");
            }
            obj.ott_id = e[0].toString();
            appendJson(obj);
            console.log(obj);
        }
    }
}
function downLoadFile(uri, filename) {
    console.log(filename)
    return new Promise((resolve, reject) => {
        fs.open(filename, "w+", function (err, fd) {
            // handle error
            fs.close(fd, function (err) {
                // handle error
            });
        });
        var myFile = request({ uri, encoding: null }).pipe(fs.createWriteStream(filename));
        myFile.on("finish", () => {
            return resolve();
        });
    });
}

main();

const uploadStream = ({ Bucket, Key }) => {
    const s3 = new AWS.S3({
        accessKeyId: "AKIA2UWOCQB3NRN5YGQA",
        secretAccessKey: "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",
    });
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: s3.upload({ Bucket, Key, Body: pass, ACL: "public-read" }).promise(),
    };
};

function upload(key) {
    return new Promise((resolve, reject) => {
        const { writeStream, promise } = uploadStream({ Bucket: "videos-download", key });
        const readStream = fs.createReadStream(key);
        const pipeline = readStream.pipe(writeStream);
        promise.then((res) => {
            resolve(res.location);
        });
    });
}

function appendJson(data2) {
    fs.readFile("results.json", "utf8", function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            obj.push(data2);
            json = JSON.stringify(obj);
            fs.writeFile("results.json", json, "utf8", console.log); // write it back
        }
    });
}

//show movie
