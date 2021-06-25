import * as puppeteer from 'puppeteer';

describe('index tests', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let date: string;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 10})
    page = await browser.newPage();
    date = Date.now().toString();

    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#title');
    await page.type('#title', 'Testowy tytuł notatki');
  
    await page.waitForSelector('#text');
    await page.type('#text', `Notatka testowa - ${date}`);
  
    await page.waitForSelector('#color');
    await page.select('#color', 'white');
  
    await page.click('#addNoteButton');
  });

  it('notatka utworzona',  async () => {
    

    await page.waitForSelector(`#others`);
    let res = await page.evaluate(  (date) => {

      const notes = [...document.querySelectorAll("#others .note-text")] as HTMLSpanElement[]; 
      // :c
      const note =  notes.find( x => x.innerText === `NOTATKA TESTOWA - ${date}`)
      return note.innerText;
    },date);

    await expect(res).toBe(`NOTATKA TESTOWA - ${date}`);
  });

  afterAll(async () => {
    await page.screenshot({path: 'tests/screenshot.png'});
    await browser.close();
  })
});
