import puppeteer from 'puppeteer';

interface WikipediaResult {
  title: string;
  author: string;
  date: string;
  description: string;
  url: string;
}

async function scrapeWikipedia(searchQuery: string): Promise<WikipediaResult[]> {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
  await page.goto(url);

  const title = await page.evaluate(() => {
    const titleElement = document.querySelector('h1#firstHeading');
    return titleElement?.textContent || '';
  });

  const author = await page.evaluate(() => {
    const authorElement = document.querySelector('meta[name="citation_author"]');
    return authorElement ? authorElement.getAttribute('content') || '' : '';
  });

  const date = await page.evaluate(() => {
    const dateElement = document.querySelector('div#mw-content-text span.date');
    return dateElement ? dateElement.textContent || '' : '';
  });

  const description = await page.evaluate(() => {
    const descriptionElement = document.querySelectorAll('div#mw-content-text p')[1];
    if (descriptionElement) {
      let descriptionText = descriptionElement.textContent || '';
      const newlineIndex = descriptionText.indexOf('\n');
      if (newlineIndex !== -1) {
        descriptionText = descriptionText.substring(0, newlineIndex);
      }
      if (descriptionText.length > 300) {
        descriptionText = `${descriptionText.slice(0, 296)} ...`;
      }
      return descriptionText;
    }
    return '';
  });

  const pageUrl = await page.url();
  await browser.close();

  const result: WikipediaResult[] = [
    {
      title: title,
      author: author,
      date: date,
      description: description,
      url: pageUrl,
    }
  ];

  return result;
}

export default scrapeWikipedia;

/* Uncomment the following lines if you want to test the function directly
(async () => {
  const result = await scrapeWikipedia("xss");
  console.log(result);
})();
*/

