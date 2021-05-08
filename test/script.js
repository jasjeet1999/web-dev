const puppy = require("puppeteer");
const id = "demep10201@ddwfzp.com";
const pass = "123456";
async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultviewport : false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");


}
main();