import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-content');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // if your event's details have a different selector, use it instead of .event .details
    const eventDetails = await page.$('#details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.detail-btn');
    const eventDetails = await page.$('#details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.detail-btn');
    const eventDetails = await page.$('#details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter Events By City', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#event-list');
  });

  afterAll(() => {
    browser.close();
  });

  test('when user has not searched for a city, show upcoming events from all cities', async () => {
    const events = await page.$$('#event-list li');
    expect(events.length).toBe(32);
  });

  test('user should see a list of suggestions when they search for a city', async () => {
    await page.click('.filter-button');

    await page.waitForSelector('.filter-options.active');

    const input = await page.$('.city');

    await input.type('Berlin');

    const suggestions = await page.$('.suggestions');
    expect(suggestions).toBeDefined();
  });

  test('user can select a city from the suggested list', async () => {
    await page.waitForSelector('.suggestions li'); // Wait for suggestions to be loaded
    const suggestions = await page.$$('.suggestions li');

    await suggestions[1].click(); // Select the second suggestion

    await page.waitForSelector('#event-list');
    const events = await page.$$('#event-list li');

    for (const event of events) {
      const firstParagraph = await event.$('div p:first-of-type');
      const textContent = await page.evaluate(el => el.textContent, firstParagraph);
      expect(textContent).toContain('Berlin, Germany');
    }

  });
});