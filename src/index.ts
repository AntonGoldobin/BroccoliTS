import dotenv from 'dotenv';
import config from '../config.json';
import { IConfig } from './app/posting/telegram';
import app from './server';

dotenv.config();

// Start the application by listening to specific port
// eslint-disable-next-line no-undef
const port = Number(process.env.PORT || config.PORT || 3000);

const postingConfig: IConfig = {
  botToken: '1468459552:AAFnsEzvzpDownbJEcvCLhfR_LZjOknfvTc',
  channelId: '-1001213663169',
  subRedditName: 'gonewild',
};

app.listen(port, () => {
  //postBase(postingConfig);
  //scrapper()
  console.info('Express application started on port: ' + port);
});
