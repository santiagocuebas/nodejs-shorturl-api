import express from 'express';
import multer from 'multer';
import morgan from 'morgan';
import cors from 'cors';
import { ORIGIN } from './config.js';
import { useRoutes } from './routes/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().none());
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept']
}));

useRoutes(app);

export default app;
