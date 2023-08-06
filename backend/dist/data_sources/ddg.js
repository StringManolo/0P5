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
function scrapeDDG(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            executablePath: '/usr/bin/chromium',
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
        yield page.goto(url);
        const results = yield page.evaluate(() => {
            const results = document.querySelectorAll('.results_links_deep');
            return Array.from(results).map((result) => {
                var _a, _b, _c, _d, _e;
                const title = (_b = (_a = result.querySelector('.result__title')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                const author = ''; // Since the author information is not provided in the markup, leave it as an empty string
                const date = ''; // Since the date information is not provided in the markup, leave it as an empty string
                const description = (_d = (_c = result.querySelector('.result__snippet')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
                const url = (_e = result.querySelector('.result__url')) === null || _e === void 0 ? void 0 : _e.getAttribute('href');
                let destination = '';
                if (url) {
                    try {
                        const urlObj = new URL(`http:${url}`);
                        const searchParams = urlObj.searchParams;
                        destination = searchParams.get('uddg') || '';
                    }
                    catch (e) {
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
        const pageUrl = yield page.url();
        yield browser.close();
        return results;
    });
}
exports.default = scrapeDDG;
