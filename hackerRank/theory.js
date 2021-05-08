async function job{
    if(state)
    return('success');
    else 
    throw ('error');
}
//test
#!/usr/bin/env node
const puppy = require("puppeteer");
let id = "demep10201@ddwfzp.com"
let pass = "123456"

async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".username.text-ellipsis");
    await tab.click("a[data-analytics= 'NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true});//default located true
    let button =  await browser.findElements(wd.By.css(".nav-tabs.nav.admin-tabbed-nav li"));
    await buttons[1].click();
    await browser.wait(wd.until.elementLocated(wd.By.css(".nav-tabs.nav.admin-tabbed-nav li")));
    let tables = await browser.findElements(wd.By.css(".nav-tabs.nav.admin-tabbed-nav li"));
    let createChallengeUrl = await tab.evaluate(function(ele){
    return ele.getAttribute("href");
    },createChallengeButton);
    for(let i = 0; i < challenges.length; i++){
        await createChallenge("https://www.hackerrank.com" + createChallengeUrl,challenges[i],await browser.newPage())
    } 

}
async function createChllenge(url,challenge,tab){
    await tab.goto(url);
    await tab.waitForSelector("#name",{visible : true});
    await tab.type("#name", challenge["Challenge Name"]); 
    await tab.type("#preview", challenge["Description"]);
    await tab.waitForSelector ("#problem_statement-container .CodeMirror textarea", {visible: true});
    await tab.type("#problem_statement-container .CodeMirror textarea", challenge["Problem Statement"]);
    await tab.type("#input_format-container .CodeMirror textarea", challenge["Input Format"]);
    await tab.type("#constraints-container .CodeMirror textarea", challenge["Constraints"]);
    await tab.type("#output_format-container CodeMirror textarea", challenge["output Format"]);
    await tab.type("#tags_tag", challenge["Tags"]);
    await tab.keyboard.press("Enter");
    await tab.click(".savage-challenge.btn.btn-green");
}

main();