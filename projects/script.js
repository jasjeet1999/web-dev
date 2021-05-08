const puppy = require("puppeteer");
const id = "yiwoheg";
const pass = "random@123";

async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultviewport : false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector("input[name = 'username']" , {visible:true})
    await tab.type("input[name = 'username']", id,{delay : 100});
    await tab.type("input[name = 'password']", pass,{delay : 100});
    await tab.click(".sqdOP.L3NKy.y3zKF");
    await tab.waitForSelector("svg[aria-label = 'Find People']",{visible : true});
    await tab.click("svg[aria-label = 'Find People']");
    await tab.waitForSelector(".pKKVh");
    await tab.click("._9AhH0");
    await tab.waitForSelector(".zV_Nj")
    await tab.click(".zV_Nj");
    await tab.waitForSelector(".zV_Nj");
    await tab.click(".zV_Nj");
    await tab.waitForSelector("svg[aria-label ='Carousel']",{visible: true});
    let follow = await tab.$$("svg[aria-label ='Carousel']");
    for(let i=0; i<follow.length; i++){
    await follow[i].click();
    }
}


main();