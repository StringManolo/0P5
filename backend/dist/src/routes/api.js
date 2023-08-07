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
exports.Search = exports.APIDocumentation = void 0;
const cache_1 = require("../cache/cache"); //sqlite3
const foro_elhacker_net_1 = __importDefault(require("../../data_sources/foro_elhacker_net"));
const wikipedia_1 = __importDefault(require("../../data_sources/wikipedia"));
const ddg_1 = __importDefault(require("../../data_sources/ddg"));
const gist_1 = __importDefault(require("../../data_sources/gist"));
function APIDocumentation(request, response) {
    response.status(200).json({
        message: 'API Documentation',
        version: '1.0.0',
        routes: {
            '/': 'API Documentation',
            '/search/:query': 'Search the query'
        },
        links: {
            'api': 'http://localhost:8443/api',
            'search': 'http://localhost:8443/search/:query'
        },
    });
}
exports.APIDocumentation = APIDocumentation;
function Search(request, response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function* () {
        // const searchPattern = request?.params?.q;            // uses /search/xss
        const searchPattern = (_a = request === null || request === void 0 ? void 0 : request.query) === null || _a === void 0 ? void 0 : _a.q; // uses /search?q=xss
        let searchString = '';
        if (!searchPattern) {
            response.status(401).send({ error: "Missing search argument" });
            return;
        }
        else {
            searchString = searchPattern.toString();
        }
        let ehnSearchResults = [];
        let wikipediaSearchResults = [];
        let ddgSearchResults = [];
        let gistSearchResults = [];
        if ((_b = request === null || request === void 0 ? void 0 : request.query) === null || _b === void 0 ? void 0 : _b.ehn) {
            try {
                const ehnCache = yield (0, cache_1.getFromCache)(searchString, 'ehn', 60 * 60 * 24 * 7); // 1 week
                if (ehnCache) {
                    ehnSearchResults = ehnCache;
                    console.log(`ehn results extracted from cache`);
                }
                else {
                    ehnSearchResults = (_c = yield (0, foro_elhacker_net_1.default)(searchString)) !== null && _c !== void 0 ? _c : [];
                    if (ehnSearchResults.length > 0) {
                        yield (0, cache_1.addToCache)(searchString, 'ehn', ehnSearchResults, 60 * 60 * 24 * 7);
                    }
                }
            }
            catch (error) {
                ehnSearchResults = [];
            }
        }
        if ((_d = request === null || request === void 0 ? void 0 : request.query) === null || _d === void 0 ? void 0 : _d.wikipedia) {
            try {
                const wikipediaCache = yield (0, cache_1.getFromCache)(searchString, 'wikipedia', 60 * 60 * 24 * 7); // 1 week
                if (wikipediaCache) {
                    wikipediaSearchResults = wikipediaCache;
                    console.log(`wikipedia results extracted from cache`);
                }
                else {
                    wikipediaSearchResults = (_e = yield (0, wikipedia_1.default)(searchString)) !== null && _e !== void 0 ? _e : [];
                    if (wikipediaSearchResults.length > 0) {
                        yield (0, cache_1.addToCache)(searchString, 'wikipedia', wikipediaSearchResults, 60 * 60 * 24 * 7);
                    }
                }
            }
            catch (error) {
                wikipediaSearchResults = [];
            }
        }
        if ((_f = request === null || request === void 0 ? void 0 : request.query) === null || _f === void 0 ? void 0 : _f.ddg) {
            try {
                const ddgCache = yield (0, cache_1.getFromCache)(searchString, 'ddg', 60 * 60 * 24 * 7); // 1 week
                if (ddgCache) {
                    ddgSearchResults = ddgCache;
                    console.log(`ddg results extracted from cache`);
                }
                else {
                    ddgSearchResults = (_g = yield (0, ddg_1.default)(searchString)) !== null && _g !== void 0 ? _g : [];
                    if (ddgSearchResults.length > 0) {
                        yield (0, cache_1.addToCache)(searchString, 'ddg', ddgSearchResults, 60 * 60 * 24 * 7);
                    }
                }
            }
            catch (error) {
                ddgSearchResults = [];
            }
        }
        if ((_h = request === null || request === void 0 ? void 0 : request.query) === null || _h === void 0 ? void 0 : _h.gist) {
            try {
                const gistCache = yield (0, cache_1.getFromCache)(searchString, 'gist', 60 * 60 * 24 * 7); // 1 week
                if (gistCache) {
                    gistSearchResults = gistCache;
                    console.log(`gist results extracted from cache`);
                }
                else {
                    gistSearchResults = (_j = yield (0, gist_1.default)(searchString)) !== null && _j !== void 0 ? _j : [];
                    if (gistSearchResults.length > 0) {
                        yield (0, cache_1.addToCache)(searchString, 'gist', gistSearchResults, 60 * 60 * 24 * 7);
                    }
                }
            }
            catch (error) {
                gistSearchResults = [];
            }
        }
        const results = ehnSearchResults.concat(wikipediaSearchResults)
            .concat(ddgSearchResults)
            .concat(gistSearchResults);
        response.status(200).json(results);
        return;
    });
}
exports.Search = Search;
