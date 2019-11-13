const Seven = require('node-7z');
const Console = require('console');
const fs = require('fs');

const puppeteer = require('puppeteer');
const deviceList = require('puppeteer/DeviceDescriptors');

const baseUrl = 'http://localhost:8100/';
const urls = ['home', 'contact', 'product-listing'];

/**
 * @param {string} name
 * @returns {string}
 */
function sanitizeFilename(name) {
    return name.toLowerCase().replace(/ /g, '_');
}

async function run(devices) {

    // Create images directory
    const dir = './images';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // Delete old archive
    const archive = './images.zip';
    if (fs.existsSync(archive)) {
        fs.unlinkSync(archive);
    }

    // Take screenshots
    for (let device of devices) {
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();

        for (let i in urls) {
            if (urls.hasOwnProperty(i)) {
                await page.emulate(deviceList[device.name]);
                await page.goto(baseUrl + urls[i], { waitUntil: 'networkidle0' });
                await page.screenshot({
                    path: sanitizeFilename(`${dir}/${device.brand}_${device.size}_${device.name}_${i}.png`),
                    type: 'png'
                });
            }
        }

        await page.close();
        await browser.close();
    }

    // Create archive
    Seven.add('images.zip', './images/*.png');
}

run([
    {
        name: 'iPhone 8 Plus',
        brand: 'ios',
        size: '5.5inch',
    },
    {
        name: 'iPad Pro',
        brand: 'ios',
        size: '12.9inch',
    },
    {
        name: 'iPhone XR',
        brand: 'ios',
        size: '6.5inch',
    },
    {
        name: 'Pixel 2',
        brand: 'android',
        size: '5inch',
    }
]).then(() => {
    Console.log('Done!');
});
