import express from 'express';

const app = express();
const port = 8443;

import {
  APIDocumentation,
  Search
} from './routes/api';

app.get('/', APIDocumentation);
app.get('/search', Search);


app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
