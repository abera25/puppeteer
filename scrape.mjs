import puppeteer from 'puppeteer';
import {
    scrapeUrl as url,
    width,
    height
} from './config';

/**
 * Scrape
 */
puppeteer.launch({
    headless: false,
    args: [`--window-size=${ width },${ height }`]
}).then(async browser => {

    /* Open browser with specific url */
    const page = await browser.newPage();
    await page.setViewport({ width: width, height: height});
    await page.goto(url);

    /* Action */
    await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    const result = await page.evaluate(() => {
        let title = document.querySelector('h1').innerText;
        let price = document.querySelector('.price_color').innerText;
        return { title, price };
    });
    await page.waitFor(200); // Not required, only to see what's happening

    /* Close browser */
    await browser.close();

    return result;
}).then(value => console.log(value));
