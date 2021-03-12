// // const AWS = require('aws-sdk');
// // const stream = require('stream');
// // const fs = require("fs")

// // const uploadStream = ({ Bucket, Key }) => {
// //   const s3 = new AWS.S3({
// //     accessKeyId: "AKIA2UWOCQB3NRN5YGQA",
// //     secretAccessKey: "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"
// // });
// //   const pass = new stream.PassThrough();
// //   return {
// //     writeStream: pass,
// //     promise: s3.upload({ Bucket, Key, Body: pass, ACL: "public-read" }).promise(),
// //   };
// // }

// // const { writeStream, promise } = uploadStream({Bucket: 'videos-download', Key: 'yourfile.xlsx'});
// // const readStream = fs.createReadStream('file.xlsx');
// // promise.then((res)=>{
// //     console.log(res)
// // });



// // const pipeline = readStream.pipe(writeStream);

// const request = require("request");
// const fs = require("fs");














// function appendJson(data2){
//     fs.readFile('results.json', 'utf8', function readFileCallback(err, data){
//         if (err){
//             console.log(err);
//         } else {
//         obj = JSON.parse(data); 
//         obj.push(data2); 
//         json = JSON.stringify(obj); 
//         fs.writeFile('results.json', json, 'utf8', console.log); // write it back 
//     }});
//   }

//   appendJson({hello:5})




var FormData = require("form-data");




var form = new FormData();
        form.append("name","hello");
        // form.append("file", fs.createReadStream(key));
        g = form.getHeaders()["a"]="b"
console.log({...form.getHeaders(),a:5})