import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { sPost } from '../schemas/sPost';

dotenv.config();

export const removeAllPosts = async (channelName: string) => {
  // eslint-disable-next-line no-undef
  const RemovePostIdModel = mongoose.model(
    'model',
    sPost,
    // eslint-disable-next-line no-undef
    `${process.env.NODE_ENV}-${channelName}`,
  );
  await RemovePostIdModel.deleteMany({}).exec();
  return 'deleted';
};
