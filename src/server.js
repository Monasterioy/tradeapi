import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { urlencoded, raw, json } from 'body-parser';
import routerv1 from './routes/v1/index';
import swaggerDocument from '../swagger.json';

dotenv.config();

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(raw({ type: 'application/vnd.custom-type' }));
app.use(json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routerv1(app);

const port = process.env.API_PORT || 9000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('Server is running in port 9000 ');
  });
}

export default app;