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
exports.scrapeGist = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeGist(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            executablePath: '/usr/bin/chromium',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        const url = `https://gist.github.com/search?q=${encodeURIComponent(searchQuery)}`;
        yield page.goto(url);
        const results = yield page.evaluate(() => {
            function removeArrobaAtStartOfString(str) {
                return str[0] === '@' ? str.substr(1, str.length) : str;
            }
            const results = document.querySelectorAll('.gist-snippet');
            return Array.from(results).map((result) => {
                var _a, _b, _c, _d, _e;
                const titleElement = result.querySelector('.file-box a strong');
                const authorElement = result.querySelector('img.avatar-user');
                const dateElement = result.querySelector('.flex-order-1 .color-fg-muted relative-time');
                const descriptionElement = result.querySelector('.file-box');
                const urlElement = result.querySelector('.link-overlay');
                let originalDescription = descriptionElement ? ((_a = descriptionElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '' : '';
                /* Remove extra line breaks at start to get only the file content */
                const firstNewLineIndex = originalDescription.indexOf('  \n');
                originalDescription = originalDescription.substring(firstNewLineIndex + 4, originalDescription.length);
                const lines = originalDescription.split('\n');
                const startIndex = lines.findIndex(line => line.trim() !== '');
                originalDescription = (_b = lines.slice(startIndex).join('\n')) === null || _b === void 0 ? void 0 : _b.trim();
                const maxLength = 300;
                let truncatedDescription = originalDescription;
                if (truncatedDescription.length > maxLength) {
                    const lastSpaceIndex = truncatedDescription.lastIndexOf(' ', maxLength);
                    truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex) + '...';
                }
                return {
                    title: titleElement ? ((_c = titleElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '' : '',
                    author: authorElement ? removeArrobaAtStartOfString(((_d = authorElement.getAttribute('alt')) === null || _d === void 0 ? void 0 : _d.trim()) || '') : '',
                    date: dateElement ? dateElement.getAttribute('datetime') || '' : '',
                    description: truncatedDescription ? truncatedDescription : descriptionElement ? ((_e = descriptionElement.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || '' : '',
                    url: urlElement ? urlElement.getAttribute('href') || '' : '',
                };
            });
        });
        yield browser.close();
        return results;
    });
}
exports.scrapeGist = scrapeGist;
exports.default = scrapeGist;
