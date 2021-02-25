xlsx = require("node-xlsx").default;
const request = require("request");
const fs = require("fs");
bluebird = require("bluebird");
async function main(fileName) {
    let csv = xlsx.parse(`data.xlsx`);
    let data = csv[0].data;
    console.log(data);
    // console.log(workSheetsFromFile[0].data);
    //    for(let i=0;i<data.length;i++){
    //        console.log(data[i][10])
    //    }
    // const show = data[0].data;
    for (let i = 0; i < 1; i++) {
        let e = data[i];
        if (e[9]) {
            let url = e[9];
            url = url.substr(0, url.lastIndexOf("0")) + "1";
            turl = e[10];
            turl = turl.substr(0, turl.lastIndexOf("0")) + "1";

            await downLoadFile(url, e[1]);
            if (e[10]) {
                await downLoadFile(turl, e[i] + ".jpg");
            }
            let obj = {};
            obj.url = await upload(e[1]);
            if (e[10]) {
                obj.thumbnail = await upload(e[i] + ".jpg");
            }
            obj.ott_id = e[0]
            appendJson(obj)
            
        }
    }
}
function downLoadFile(uri, fileName) {
    return Promise((resolve, reject) => {
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
        const { writeStream, promise } = uploadStream({ Bucket: "videos-download", Key });
        const readStream = fs.createReadStream(key);
        const pipeline = readStream.pipe(writeStream);
        promise.then((res) => {
            resolve(res.location);
        });
    });
}

function appendJson(data) {
    let rawdata = fs.readFileSync("results.json");
    let student = JSON.parse(rawdata);
    rawdata.Push(data);
    fs.writeFileSync(JSON.stringify(rawdata));
}

//show movie
