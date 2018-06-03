import puppeteer from 'puppeteer';
import {
    screenshotUrl as url,
    width,
    height,
    screenshotPath
} from './config';

/**
 * Screenshot function
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
    await page.screenshot({ path: screenshotPath });

    /* Close browser */
    await browser.close();

});
