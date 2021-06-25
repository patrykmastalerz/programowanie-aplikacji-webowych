import * as puppeteer from 'puppeteer'

describe('index tests', () => {

  beforeAll(async () => {
    
    const browser = await puppeteer.launch({ headless: false, slowMo: 30 })
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#title');
    await page.type('#title', 'Testowy tytuł notatki');
  
    await page.waitForSelector('#text');
    await page.type('#text', 'Notatka testowa');
  
    await page.waitForSelector('#color');
    await page.select('#color', 'white');
  
    await page.click('#addNoteButton');
    await page.waitFor(2000); 
    await page.screenshot({path: 'tests/screenshot.png'});
    await browser.close();




  });
});

