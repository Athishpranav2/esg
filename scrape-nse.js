const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeBatch() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const results = [];

  for (let i = 1; i <= 15; i++) {
    const url = `https://www.nse-esgrating.com/esg-ratings/${i}?fiscalYear=2024-2025`;
    console.log(`Scraping ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000));
      
      const data = await page.evaluate(() => {
        const text = document.body.innerText;
        // The company name is usually on the second or third non-empty line
        const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
        
        let name = '';
        let score = 0;
        
        // Find company name (usually right after 'Login' or at the top)
        for (let j = 0; j < lines.length; j++) {
          if (lines[j] === 'Login') {
            name = lines[j+1];
            break;
          }
        }
        if (!name && lines.length > 1) name = lines[1];

        // Find ESG Rating
        for (let j = 0; j < lines.length; j++) {
          if (lines[j].includes('ESG Rating')) {
            score = parseInt(lines[j+1], 10);
            break;
          }
        }
        
        return { name, score, raw: lines.slice(0, 10) };
      });
      
      console.log(`Found: ${data.name} - ${data.score}`);
      if (data.name && data.score) {
        results.push({ id: i, name: data.name, score: data.score });
      }
    } catch (err) {
      console.error(`Failed ID ${i}: ${err.message}`);
    }
  }

  fs.writeFileSync('nse-results.json', JSON.stringify(results, null, 2));
  console.log('Finished scraping. Results saved to nse-results.json');
  await browser.close();
}

scrapeBatch();
