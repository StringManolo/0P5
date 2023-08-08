import express from 'express';
// import https from 'https';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(cors());
import {                                                                                 APIDocumentation,
  Search
} from './routes/api';

app.get('/', APIDocumentation);
app.get('/search', Search);


const port = 8443;
app.listen(port, () => {
  console.log(`HTTP listening on port ${port}`);
})

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


