import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ErrorHandler from '../middlewares/error.js';
import routes from '../routes/index.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../docs/swagger-option.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//static files
app.use('/uploads', express.static('src/services/uploads/files/images'));

//routes
app.use('/', routes);

//test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//middlewares
app.use(ErrorHandler);

export default app;
