const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium', 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
    const page = await browser.newPage();

    // Navegar a una página web
    await page.goto('https://www.example.com');

    // Tomar una captura de pantalla
    await page.screenshot({ path: 'example.png' });

    console.log('Captura de pantalla tomada con éxito.');

    await browser.close();
  } catch (error) {
    console.error('Error en Puppeteer:', error);
  }
})();

