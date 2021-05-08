const puppy = require("puppeteer");
// puppy returns promise when applied a functiom on it
let browserPromise = puppy.launch({//browser open promise
    headless: false,
    defaultViewport: false,
});

const id = "xihanow591@bombaya.com";
const pass = "9315413828";
let tab;
browserPromise.then(function(browser) {
    let pagesPromise = browser.pages();//browser tabs promsmise 
    return pagesPromise;
}).then(function(pages) {
    tab = pages[0]
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");//url open promise
    return pageOpenPromise;
}).then(function() {
    let idPromise = tab.type("#input-1", id);
    return idPromise;    
}).then(function() {
    let passPromise = tab.type("#input-2", pass);
    return passPromise;
}).then(function() {
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
}).then(function() {
    let waitPromise = tab.waitForSelector("#base-card-1-link", {visible: true});
    return waitPromise;
}).then(function() {
    let IPKclickPromise = tab.click("#base-card-1-link");
    return IPKclickPromise;
}).then(function() {
    let waitPromise = tab.waitForSelector("a[data-attr1='arrays']", {visible: true});
    return waitPromise;
}).then(function() {
    let arrayBoxClickPromise = tab.click("a[data-attr1='arrays']");
    return arrayBoxClickPromise;
}).then(function() {
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item", {visible: true});
    return waitPromise;
}).then(function() {
    let allButtonsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allButtonsPromise;
}).then(function(data) {
    let allButtonsUrlsPromise = [];
    for(let i of data) {
        let urlPromise = tab.evaluate(function(ele) {
            return ele.getAttribute("href");
        }, i);
        allButtonsUrlsPromise.push(urlPromise);
    }
    return Promise.all(allButtonsUrlsPromise);
}).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log("error occured");
});