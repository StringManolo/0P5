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
function getUrlsAndInnerText(html) {
    const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*?>(.*?)<\/a>/g;
    const urlsAndInnerText = [];
    let match;
    while ((match = anchorRegex.exec(html))) {
        const url = match[1];
        const innerText = match[2];
        urlsAndInnerText.push({ url, innerText });
    }
    return urlsAndInnerText;
}
function removeLastLineBreak(textContent) {
    return textContent.endsWith('\n') ? textContent.slice(0, -1) : textContent;
}
function foro_elhacker_net(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({
                executablePath: '/usr/bin/chromium',
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = yield browser.newPage();
            yield page.goto('https://foro.elhacker.net/search.html');
            console.log(1);
            const searchInput = yield page.$('[name="search"]');
            if (!searchInput) {
                console.log('Search input element not found.');
                yield browser.close();
                return;
            }
            console.log(2);
            yield searchInput.type(query);
            yield page.click('[name="submit"]');
            yield page.waitForNavigation();
            console.log(3);
            let [textContent, htmlContent] = yield page.evaluate(() => {
                return [document.body.innerText, document.body.innerHTML];
            });
            console.log(4);
            const urls = getUrlsAndInnerText(htmlContent);
            textContent = textContent.split('Fecha en que se publicó')[1];
            textContent = textContent.split('Páginas:')[0];
            textContent = textContent.trim();
            textContent = 'dummy\t\t' + textContent;
            const results = [];
            const resultsLines = textContent.split('%\t');
            let obj = { title: '', author: '', date: '', description: '', url: '' };
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
                obj.description = (aux.split('\n...').slice(1).join('\n...') || aux).trim().replace((/\n\t.*$/gm), '').trim();
                const match = urls.find((item) => obj.title === item.innerText);
                if (match) {
                    obj.url = match.url;
                }
                else {
                    obj.url = '';
                }
                results.push(obj);
            }
            console.log(5);
            yield browser.close();
            return results;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = foro_elhacker_net;
/*
(async () => {
  await foro_elhacker_net('dos');
})();
*/
