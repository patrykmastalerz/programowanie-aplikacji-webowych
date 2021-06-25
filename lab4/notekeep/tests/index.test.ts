import * as puppeteer from 'puppeteer';

describe('index tests', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let id: string;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo:5})
    page = await browser.newPage();
    id = Date.now().toString();

    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#title');
    await page.type('#title', 'Testowy tytuł notatki');
  
    await page.waitForSelector('#text');
    await page.type('#text', `Notatka testowa - ${id}`);
  
    await page.waitForSelector('#color');
    await page.select('#color', 'white');
  
    await page.click('#addNoteButton');
  });

  it('notatka utworzona',  async () => {
    await page.waitForSelector('.note-text');
    let res = await page.evaluate( () => {

      const notes = [...document.querySelectorAll(".note-text")] as HTMLSpanElement[]; 
      const note = notes.find( x => x.innerText === `Notatka testowa - ${id}`)
      return note.innerText;
    });

    expect(res).toBe(`Notatka testowa - ${id}`);
  });

  afterAll(async () => {
    await page.screenshot({path: 'tests/screenshot.png'});
    await browser.close();
  })
});
