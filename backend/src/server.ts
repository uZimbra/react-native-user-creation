import 'reflect-metadata';
import express from 'express';

import './database/index';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});
