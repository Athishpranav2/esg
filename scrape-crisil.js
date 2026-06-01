const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeCrisil() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const url = 'https://www.crisilesg.com/en/home/esg-ratings.html';
  console.log(`Scraping ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));
    
    // The data might be in tables or divs. Let's dump the HTML first to inspect it
    const htmlContent = await page.evaluate(() => document.body.innerHTML);
    const textContent = await page.evaluate(() => document.body.innerText);
    
    fs.writeFileSync('crisil-html.html', htmlContent);
    fs.writeFileSync('crisil-text.txt', textContent);
    console.log('Scraped CRISIL content');

  } catch (err) {
    console.error(`Scraping failed: ${err.message}`);
  }

  await browser.close();
}

scrapeCrisil();
