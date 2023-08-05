"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8443;
app.use((0, cors_1.default)());
const api_1 = require("./routes/api");
app.get('/', api_1.APIDocumentation);
app.get('/search', api_1.Search);
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
