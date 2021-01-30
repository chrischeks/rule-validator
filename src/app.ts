import express, { Request, Response, Application, NextFunction } from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
// import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import logger from './util/logger/logger';
import dotenv from 'dotenv';

// import routes
import { ruleRouter } from './api/rule/rule.route';

dotenv.config();

// set up error handler
process.on('uncaughtException', (e: any) => {
  logger.log('error', e);
  process.exit(1);
});

process.on('unhandledRejection', (e: any) => {
  logger.log('error', e);
  process.exit(1);
});

// Create Express server
const app: Application = express();

app.set('port', process.env.PORT || 6111);
app.use(cors());
app.use(compression());
// app.use(bodyParser.json({
//   limit: '50mb'
// }));
app.use((req: Request, res: Response, next: NextFunction) => {
  bodyParser.json({
    limit: '10mb'
  })(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: 'Invalid JSON payload passed.',
        status: 'error',
        data: null
      }); // Bad request
    } else {
      next();
    }
  });
});
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
  })
);
app.use(helmet());

// add route
app.use('/', ruleRouter);

export default app;
