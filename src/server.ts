import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from '../config.json';
import { postBase } from './app/posting/telegram';
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development' ||
  config.NODE_ENV === 'development'
) {
  app.use(morgan('dev'));
  app.use(cors());
}

// Handle security and origin in production
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
  app.use(helmet());
}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

getFilesWithKeyword('router', __dirname + '/app').forEach((file: string) => {
  const { router } = require(file);
  app.use('/', router);
});
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    return res.status(500).json({
      errorName: err.name,
      message: err.message,
      stack: err.stack || 'no stack defined',
    });
  },
);

app.post('/post', (req, res) => {
  if (!req.query.botToken || !req.query.channelId || !req.query.subRedditName) {
    res.status(400).send({
      message: 'Should have channelId, botToken, subRedditName',
    });
    return;
  }

  postBase(req.query as any);
  res.send('hello world');
});

export default app;
