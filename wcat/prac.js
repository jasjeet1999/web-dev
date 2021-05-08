#!/usr/bin/env node
const fs = require("fs");
async function read(){
    let data = fs.promises.readfile("abc.txt", utf-8);
    console.log(data);
    console.log("hello");
}
read();