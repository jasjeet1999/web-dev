const fs = require("fs")

let promise = new Promise(function(resolve,reject)
{
    if(fs.existsSync("ab.txt")){
        resolve("file exist"); //like true 
    } else(
        reject("doesnt exist") //false
    )
});
promise.then(function(val) // callback fn but runs multiple time after execution of promise
{
    console.log(val); // runs for resolve or true 
}) .catch(function(err){
    console.log(err); // for reject or false
})