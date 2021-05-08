const puppy = require("puppeteer");
const id = "demep10201@ddwfzp.com";
const pass = "123456";
let dataToType = "afajfldjfnv";
let moderators = [
    "demep10201",
    "nocidi6371",
    "bansalbhavesh47",
    "bansalbhavesh50",
    "sibaje3329"
]
async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultviewport : false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".username.text-ellipsis");
    await tab.click("a[data-analytics= 'NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true});
    let administrationButtons = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await administrationButtons[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },createChallengeButton);
    await createChallenge("https://www.hackerrank.com" + createChallengeUrl,tab);
}
    async function createChallenge(url,tab){
    await tab.goto(url);
    await tab.waitForSelector("#name");
    await tab.type("#name", dataToType); 
    await tab.type("#preview", dataToType);
    await tab.waitForSelector (".CodeMirror textarea", {visible: true});
    let fourBoxes = tab.$$(".CodeMirror textarea");
    for(let i = 0; i < fourBoxes.length; i++){
        await fourBoxes[i].type(dataToType);
    }
}
main();