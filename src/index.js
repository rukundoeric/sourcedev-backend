/* eslint-disable linebreak-style */
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import globalMiddleware from './middleware/globalMiddleware';
import db from './sequelize/models/index';
import api from './api/routes';

dotenv.config();
const port = process.env.PORT || 6000;
const app = express();
globalMiddleware(app);
const { sequelize } = db;

app.get('/', (req, res) => {
  res.redirect('/docs');
});
app.use('/', api);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: {
      message: 'Page Not found',
    },
  });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Database succesfully connected\nPID: ${process.pid} Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
  });
});
