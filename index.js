xlsx = require("node-xlsx").default;
const aws = require("aws-sdk");
const AWS = require("aws-sdk");
const request = require("request");
const fs = require("fs");
bluebird = require("bluebird");
const stream = require("stream");
var FormData = require("form-data");
const fetch = require("node-fetch");
const baseurl = "https://sopranorpa.com/";
token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwNGJlM2RmYzUwZmJiMWZlNDEwNTdhMCJ9LCJpYXQiOjE2MTU1ODYzMjh9.Jwt7ZLsbMamqcFuMeUTCkytWOCuPMhJq2j59WlpNXck";

async function main(fileName) {
  let csv = xlsx.parse(`file2.xlsx`);
  let data = csv[0].data;
  // console.log(data);
  // console.log(workSheetsFromFile[0].data);
  //    for(let i=0;i<data.length;i++){
  //        console.log(data[i][10])
  //    }
  // const show = data[0].data;
  for (let i = 1; i < data.length; i++) {
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

      await downLoadFile(url, e[0].toString() + ".mp4");
      console.log(i, "file downloaded");
      if (e[10]) {
        await downLoadFile(turl, e[0].toString() + ".jpg");
        console.log(i, "th downloaded");
      }
      /////download complete
      let obj = {};
      /////
      if (e[10]) {
        let thUrl = await uploadThumbnail(e[0].toString() + ".jpg");
        await uploadFile({key:e[0].toString() + ".mp4",name:e[1],thumbnail:thUrl});
      } else {
        await uploadFile({key:e[0].toString() + ".mp4",name:e[1]});
      }
      //////
    //   obj.url = await upload(e[0].toString() + ".mp4");
    //   if (e[10]) {
    //     obj.thumbnail = await upload(e[0].toString() + ".jpg");
    //   }
    //   obj.ott_id = e[0].toString();
    //   appendJson(obj);
    //   console.log(obj);
    }
  }
}
function downLoadFile(uri, filename) {
  console.log(filename);
  return new Promise((resolve, reject) => {
    fs.open(filename, "w+", function (err, fd) {
      // handle error
      fs.close(fd, function (err) {
        // handle error
      });
    });
    var myFile = request({ uri, encoding: null }).pipe(
      fs.createWriteStream(filename)
    );
    myFile.on("finish", () => {
      return resolve();
    });
  });
}

main(null);

// const uploadStream = ({ Bucket, Key }) => {
//     const s3 = new AWS.S3({
//         accessKeyId: "AKIA2UWOCQB3NRN5YGQA",
//         secretAccessKey: "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",
//     });
//     const pass = new stream.PassThrough();
//     return {
//         writeStream: pass,
//         promise: s3.upload({ Bucket, Key, Body: pass, ACL: "public-read" }).promise(),
//     };
// };

function uploadFile(data) {
  let { key, name, thumbnail } = data;
  return new Promise((resolve, reject) => {
    // const { writeStream, promishttpbine } = uploadStream({ Bucket: "videos-download", Key:key });
    var form = new FormData();
    if (thumbnail) {
      form.append("thumbnail", thumbnail);
    }
    form.append("name", name);
    form.append("file", fs.createReadStream(key));
    const options = {
      method: "POST",
      body: form,
      headers: { ...form.getHeaders(), Authorization: "Bearer " + token },
    };

    fetch(baseurl + "creator/videos/add", options).then(resolve());
    ///
  });
}


function uploadThumbnail(data) {
  // let { key, name, thumbnail } = data;
  return new Promise((resolve, reject) => {
    // const { writeStream, promishttpbine } = uploadStream({ Bucket: "videos-download", Key:key });
    var form = new FormData();

    form.append("file", fs.createReadStream(data));
    const options = {
      method: "POST",
      body: form,
      headers: { ...form.getHeaders(), Authorization: "Bearer " + token },
    };

    fetch(baseurl + "thumbnail", options)
      .then((res) => res.json())
      .then((res) => resolve(res.result.url));
    ///
  });
}

// function appendJson(data2) {
//   fs.readFile("results.json", "utf8", function readFileCallback(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       obj = JSON.parse(data);
//       obj.push(data2);
//       json = JSON.stringify(obj);
//       fs.writeFile("results.json", json, "utf8", console.log); // write it back
//     }
//   });
// }

//show movie
