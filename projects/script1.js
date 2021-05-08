const puppy = require("puppeteer");
let location = "Geeta Colony";
let details = ["Temperature", "weather", "Wind Speed"]

async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultviewport : false,
        args: ["--start-maximized"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.accuweather.com/");
    await tab.waitForSelector(".searchbar-content", {visible:true});
    await tab.click(".searchbar-content");
    await tab.type(".searchbar-content", location, {delay : 100});
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".cur-con-weather-card card-module non-ad content-module lbar-panel");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".cur-con-weather-card card-module non-ad content-module lbar-panel");
    await tab.keyboard.press("Enter");
    
}
main();