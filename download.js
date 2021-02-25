const request = require("request");
const fs = require("fs") 
var link = "https://www.dropbox.com"
var myFile = request({uri:link,encoding:null}).pipe(fs.createWriteStream('file.html'))

myFile.on("finish",()=>{
    console.log("done")
})
