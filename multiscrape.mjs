import puppeteer from 'puppeteer';
import {
    scrapeUrl as url,
    width,
    height
} from './config';

/**
 * Get URLs of each book seen.
 * @param browser
 * @returns {Promise<*>}
 */
const getAllUrl = async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor('body');
    return await page.evaluate(() =>
        [...document.querySelectorAll('.product_pod a')].map(link => link.href),
    );
};

/**
 * Get data from url.
 * @param browser
 * @param url
 * @returns {Promise<*>}
 */
const getDataFromUrl = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor('body');
    return page.evaluate(() => {
        const title = document.querySelector('h1').innerText;
        const price = document.querySelector('.price_color').innerText;
        return { title, price };
    });
};


/**
 * Multi-scrape
 */
puppeteer
    .launch()
    .then(async browser => {

        /* Open browser with specific url */
        const page = await browser.newPage();
        await page.setViewport({ width: width, height: height});

        /* Action */
        const urlList = await getAllUrl(browser);
        const result = await Promise.all(
            urlList.map(url => getDataFromUrl(browser, url)),
        );

        /* Close browser */
        await browser.close();

        return result;
    })
    .then(value => console.log(value))
    .catch(e => console.log(`error: ${e}`));
