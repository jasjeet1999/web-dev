const fs = require("fs");
const { default: Symbols } = require("selenium-webdriver/lib/symbols");

function callback(err,data){
    if(err)
    console.log("unable to read file");
    else
    console.log(data);
}
fs.readFile("abc.txt","utf-8",callback);