const aws = require("aws-sdk");
const fs = require("fs");
const request = require('request');
const s3 = new aws.S3({
    accessKeyId: "AKIA2UWOCQB3NRN5YGQA",
    secretAccessKey: "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"
});
module.exports = {
    uploadImage: async function UploadImage(image_path) {
        return new Promise((resolve, reject) => {
            request({uri:image_path,encoding:null}, function (error, response, image) {
                if (!error && response.statusCode == 200) {
                    const params = {
                        Bucket: "videos-download", // pass your bucket name
                        Key: Math.floor(Math.random() * 1000000) +'_' + Date.now().toString() + ".jpg", // file will be saved as testBucket/contacts.csv
                        Body: image,
                        ACL: "public-read"
                    };
                    s3.upload(params, "image.jpeg", (err, data) => {
                        if (err) reject(err);
                        if (data) resolve(data.Location);
                    });
                }else{
                    reject(error);
                }
            });
        });
    }
};


module.exports.uploadImage("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80").then((res)=>{
    console.log(res)
})