require("chromedriver");

const wd = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
const browser = new wd.Builder().forBrowser('chrome').build(); //opens chrome with Builder method
let matchId = process.argv[2]; //for any match make a variable (& to take input matchid)
let innings = process.argv[3]; //to input innings
let batsmenScorecard = []; //Array declare
let bowlerScorecard = [];
let batsmenKeys = ["playerName", "out", "runs", "ballsPlayed", "fours", "sixes", "strikeRate"];
let bowlerKeys = ["playerName", "overs", "maidenOvers", "runs", "wickets", "noBalls", "wideBalls", "economy"];
async function main () { //await works in async fun.
    await browser.get("https://www.cricbuzz.com/live-cricket-scores/" + matchId);//load site
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-nav-bar a"))); //use it for safe side
    let buttons = await browser.findElements(wd.By.css(".cb-nav-bar a")); //cb nav bar class ke inside(space is used for ander) a(means anchor tag)
    await buttons[1].click();//as button is an array of all navigation bar on site.
    await browser.wait(wd.until.elementLocated(wd.By.css("#innings_"/*for differ innings make a variable*/ + innings + " .cb-col.cb-col-100.cb-ltst-wgt-hdr")));
    let tables = await browser.findElements(wd.By.css("#innings_" + innings + " .cb-col.cb-col-100.cb-ltst-wgt-hdr"));
    let inningsBatsmenRows = await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
    for(let i = 0; i < inningsBatsmenRows.length; i++) {
        let columns = await inningsBatsmenRows[i].findElements(wd.By.css("div"));
        if(columns.length == 7) {
            let data = {};
            for(let j = 0; j < columns.length; j++) {
                data[batsmenKeys[j]]/*object and its keys*/ = await columns[j].getAttribute("innerText");//value(inner text to get the text part)
            }
            batsmenScorecard.push(data);//to put in array
        }
    }
    console.log(batsmenScorecard);
    let inningsBowlerRows = await tables[1].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));//bcz we need the 2nd table so tables[1]
    for(let i = 0; i < inningsBowlerRows.length; i++) {
        let columns = await inningsBowlerRows[i].findElements(wd.By.css("div"));
        if(columns.length == 8) {
            let data = {};
            for(let j = 0; j < columns.length; j++) {
                data[bowlerKeys[j]] = await columns[j].getAttribute("innerText");
            }
            bowlerScorecard.push(data);
        }
    }
    console.log(bowlerScorecard);
    await browser.close();
 }

 main();