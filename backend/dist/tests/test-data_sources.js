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
const ddg_1 = __importDefault(require("../data_sources/ddg"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = 'xss';
    /*
    try {
      const wikipediaResult = await scrapeWikipedia(searchTerm);
      console.log(wikipediaResult);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  
    try {
      const foroElhackerNetResult = await foro_elhacker_net(searchTerm);
      console.log(foroElhackerNetResult);
    } catch (error) {
      console.error('Error occurred:', error);
    }
    */
    try {
        const ddgResult = yield (0, ddg_1.default)(searchTerm);
        console.log(ddgResult);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}))();
