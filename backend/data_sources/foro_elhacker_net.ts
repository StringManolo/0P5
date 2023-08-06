import puppeteer from 'puppeteer';

function getUrlsAndInnerText(html: string) {
  const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*?>(.*?)<\/a>/g;
  const urlsAndInnerText: { url: string; innerText: string }[] = [];
  let match;
  while ((match = anchorRegex.exec(html))) {
    const url = match[1];
    const innerText = match[2];
    urlsAndInnerText.push({ url, innerText });
  }
  return urlsAndInnerText;
}

function removeLastLineBreak(textContent: string) {
  return textContent.endsWith('\n') ? textContent.slice(0, -1) : textContent;
}

async function foro_elhacker_net(query: string) {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://foro.elhacker.net/search.html');

    const searchInput = await page.$('[name="search"]');
    if (!searchInput) {
      console.log('Search input element not found.');
      await browser.close();
      return;
    }

    await searchInput.type(query);
    await page.click('[name="submit"]');
console.log(`Adding a timeout to wait for the results.`);
    // await page.waitForNavigation();
    await page.waitForTimeout(1500);
console.log(`Navigating to results.`);

    let [textContent, htmlContent] = await page.evaluate(() => {
      return [document.body.innerText, document.body.innerHTML];
    });

    const urls = getUrlsAndInnerText(htmlContent);

    textContent = textContent.split('Fecha en que se publicó')[1];
    textContent = textContent.split('Páginas:')[0];
    textContent = textContent.trim();
    textContent = 'dummy\t\t' + textContent;
    const results: {
      title: string;
      author: string;
      date: string;
      description: string;
      url: string;
    }[] = [];

    const resultsLines = textContent.split('%\t');

    let obj: {
      title: string;
      author: string;
      date: string;
      description: string;
      url: string;
    } = { title: '', author: '', date: '', description: '', url: '' };

    let aux = '';
    for (let i = 1; i < resultsLines.length; i++) {
      let titleAndDescription = resultsLines[i - 1];
      let authorAndDate = resultsLines[i];
      obj = {
        title: (titleAndDescription.split('\t\t').slice(1).join('\t\t')).split('\nen ')[0],
        author: authorAndDate.split('\t')[0],
        date: removeLastLineBreak(authorAndDate.split('\t')[1]),
        description: '',
        url: '',
      };

      aux = titleAndDescription.split(obj.title)[2];
      try {
        obj.description = ((aux.split('\n...').slice(1).join('\n...') || aux).trim() as string).replace(
          (/\n\t.*$/gm),
          '',
        ).trim();
      } catch (error) {
        obj.description = '';
      }

      if (obj.description.length > 300) {
         obj.description = `${obj.description.substring(0, 300)}...`;
      }

      const match = urls.find((item) => obj.title === item.innerText);
      if (match) {
        obj.url = match.url;
      } else {
        obj.url = '';
      }
      results.push(obj);
    }

    await browser.close();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default foro_elhacker_net;

/*
(async () => {
  await foro_elhacker_net('dos');
})();
*/
