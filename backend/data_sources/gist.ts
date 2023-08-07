import puppeteer from 'puppeteer';

interface GistResult {
  title: string;
  author: string;
  date: string;
  description: string;
  url: string;
}

export async function scrapeGist(searchQuery: string): Promise<GistResult[]> {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const url = `https://gist.github.com/search?q=${encodeURIComponent(searchQuery)}`;
  await page.goto(url);

  const results = await page.evaluate(() => {
    function removeArrobaAtStartOfString(str: string) {
      return str[0] === '@' ? str.substr(1, str.length) : str;
    }

    const results = document.querySelectorAll('.gist-snippet');
    return Array.from(results).map((result) => {
      const titleElement = result.querySelector('.file-box a strong');
      const authorElement = result.querySelector('img.avatar-user');
      const dateElement = result.querySelector('.flex-order-1 .color-fg-muted relative-time');
      const descriptionElement = result.querySelector('.file-box');
      const urlElement = result.querySelector('.link-overlay');


      let originalDescription = descriptionElement ? descriptionElement.textContent?.trim() || '' : '';
      

      /* Remove extra line breaks at start to get only the file content */
      const firstNewLineIndex = originalDescription.indexOf('  \n');
      originalDescription = originalDescription.substring(firstNewLineIndex + 4, originalDescription.length);

      const lines = originalDescription.split('\n');
      const startIndex = lines.findIndex(line => line.trim() !== '');
      originalDescription = lines.slice(startIndex).join('\n')?.trim();

      const maxLength = 300;
      let truncatedDescription = originalDescription;
      if (truncatedDescription.length > maxLength) {
        const lastSpaceIndex = truncatedDescription.lastIndexOf(' ', maxLength);
        truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex) + '...';
      }

      return {
        title: titleElement ? titleElement.textContent?.trim() || '' : '',
        author: authorElement ? removeArrobaAtStartOfString(authorElement.getAttribute('alt')?.trim() || '') : '',
        date: dateElement ? dateElement.getAttribute('datetime') || '' : '',
        description: truncatedDescription ? truncatedDescription : descriptionElement ? descriptionElement.textContent?.trim() || '' : '',
        url: urlElement ? urlElement.getAttribute('href') || '' : '',
      };
    });
  });

  await browser.close();

  return results;
}

export default scrapeGist;

