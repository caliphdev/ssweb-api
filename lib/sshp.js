const uploadFile = require("./uploadFile");
const fetch = require("node-fetch");
async function getBrowser(opts = {}) {
    const chromeOptions = {
        headless: true,
       defaultViewport: {
            width: 720,
            height: 1080
        },
        timeout: 120000,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
            "--no-cache"
        ],
        ...opts
    }
    return await require('puppeteer').launch(chromeOptions)
}

async function ssweb(url, fpage = false) {
const browser = await getBrowser()
try {
                const page = await browser.newPage()
                await page.setUserAgent('Mozilla/5.0 (Linux; Android 11; SM-A205F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36')
                await page.goto(url, {
                    waitUntil: 'load',
                    timeout: 300000
                })
const screenshot = await page.screenshot({
                    type: 'png',
                    fullPage: fpage
                })
await browser.close()
return screenshot 
} catch (e) {
await browser.close()
throw e
}
}

module.exports = async function(opts) {
let { url, fullpage } = opts || {};
if (!url) throw { status: 400, creator: 'Caliph', message: 'parameter url tidak boleh kosong!' };
let buffer = await ssweb(url, fullpage)
let { url: result } = await uploadFile(buffer)
const fetching = await fetch(url)
return { status: fetching.status, creator: 'Caliph', result }
}
