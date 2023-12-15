import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { sPost } from '../schemas/sPost';

dotenv.config();

export interface IDBPost {
  postId: string;
  url: string;
  createdAt: number;
}

export const getPosts = async (channelName: string): Promise<IDBPost[]> => {
  const GetPostModel = mongoose.model(
    'model',
    sPost,
    // eslint-disable-next-line no-undef
    `${process.env.NODE_ENV}-${channelName}`,
  );
  const posts: any[] = await GetPostModel.find({}).exec();
  return (posts as IDBPost[]) || [];
};
