"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import https from 'https';
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const api_1 = require("./routes/api");
app.get('/', api_1.APIDocumentation);
app.get('/search', api_1.Search);
const port = 8443;
app.listen(port, () => {
    console.log(`HTTP listening on port ${port}`);
});
/*
const privKey = fs.readFileSync('certs/server.key', 'utf8');
const cert = fs.readFileSync('certs/server.cert', 'utf8');


const credentials = {
  key: privKey,
  cert: cert
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`HTTPS listening on port ${port}`);
});
*/
