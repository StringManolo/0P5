"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeWikipedia(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            executablePath: '/usr/bin/chromium',
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
        yield page.goto(url);
        const title = yield page.evaluate(() => {
            const titleElement = document.querySelector('h1#firstHeading');
            return (titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) || '';
        });
        const author = yield page.evaluate(() => {
            const authorElement = document.querySelector('meta[name="citation_author"]');
            return authorElement ? authorElement.getAttribute('content') || '' : '';
        });
        const date = yield page.evaluate(() => {
            const dateElement = document.querySelector('div#mw-content-text span.date');
            return dateElement ? dateElement.textContent || '' : '';
        });
        const description = yield page.evaluate(() => {
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
        const pageUrl = yield page.url();
        yield browser.close();
        const result = [
            {
                title: title,
                author: author,
                date: date,
                description: description,
                url: pageUrl,
            }
        ];
        return result;
    });
}
exports.default = scrapeWikipedia;
/* Uncomment the following lines if you want to test the function directly
(async () => {
  const result = await scrapeWikipedia("xss");
  console.log(result);
})();
*/
