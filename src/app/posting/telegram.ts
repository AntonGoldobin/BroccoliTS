import dotenv from 'dotenv';
import _ from 'lodash';
import mongoose from 'mongoose';
import Telegraf from 'telegraf';
import { IDBPost, getPosts } from '../../db/models/getPosts';
import { savePost } from '../../db/models/savePost';
import { IPost, getImagesBySubredditName } from './reddit';

export interface IConfig {
  botToken: string;
  channelId: string;
  subRedditName: string;
}

dotenv.config();

export const postBase = async (config: IConfig) => {
  await mongoose.connect(
    // eslint-disable-next-line no-undef
    `mongodb+srv://${process.env.MONGODB_AUTH}@cluster0.0rv5an5.mongodb.net/?retryWrites=true&w=majority`,
  );

  const bot = new Telegraf(config.botToken);

  const posts: IPost[] = await getImagesBySubredditName(config.subRedditName);

  const dbSavedPosts: IDBPost[] = await getPosts(config.channelId);

  const uniqPosts = _.differenceWith(
    posts,
    dbSavedPosts,
    (post, record) => post.id === record?.postId,
  );

  if (!uniqPosts[0]) {
    return;
  }

  const text = '';

  // POSTING FOR CHANNELS WITH GIF AND IMG TYPES
  bot.telegram
    .sendPhoto(config.channelId, uniqPosts[0].url, {
      caption: text,
      parse_mode: 'Markdown',
    })
    .catch((err) => 'Bot Telegram post: ' + err);

  savePost(uniqPosts[0], config.channelId);
};
