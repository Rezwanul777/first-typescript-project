/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

// global error
app.use(globalErrorHandler)

// notfound
app.use(notFound)

export default app;
