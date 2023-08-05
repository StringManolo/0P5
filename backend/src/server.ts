import express from 'express';
import cors from 'cors';

const app = express();
const port = 8443;

app.use(cors());

import {
  APIDocumentation,
  Search
} from './routes/api';

app.get('/', APIDocumentation);
app.get('/search', Search);


app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
