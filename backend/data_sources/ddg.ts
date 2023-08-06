import puppeteer from 'puppeteer';

interface DDGResult {
  title: string;
  author: string;
  date: string;
  description: string;
  url: string;
}

async function scrapeDDG(searchQuery: string): Promise<DDGResult[]> {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
  await page.goto(url);

  const results = await page.evaluate(() => {
    const results = document.querySelectorAll('.results_links_deep');
    return Array.from(results).map((result) => {
      const title = result.querySelector('.result__title')?.textContent?.trim();
      const author = ''; // Since the author information is not provided in the markup, leave it as an empty string
      const date = ''; // Since the date information is not provided in the markup, leave it as an empty string
      const description = result.querySelector('.result__snippet')?.textContent?.trim();
      const url = result.querySelector('.result__url')?.getAttribute('href');
      let destination = '';
      if (url) {
        try {
          const urlObj = new URL(`http:${url}`);
          const searchParams = urlObj.searchParams;
          destination = searchParams.get('uddg') || '';
        } catch (e) {
          destination = '';
        }
      }

      return {
        title: title || '',
        author: author || '',
        date: date || '',
        description: description || '',
        url: destination || url || '',
      };
    });
  });

  const pageUrl = await page.url();
  await browser.close();

  return results;
}

export default scrapeDDG;

