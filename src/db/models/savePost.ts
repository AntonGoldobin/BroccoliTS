import { IPost } from '../../app/posting/reddit';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { sPost } from '../schemas/sPost';

dotenv.config();

export const savePost = async (post: IPost, channelName: string) => {
  if (!post) {
    return;
  }

  const SavePostModel = mongoose.model(
    'model',
    sPost,
    // eslint-disable-next-line no-undef
    `${process.env.NODE_ENV}-${channelName}`,
  );

  const postModel = new SavePostModel({
    postId: post.id,
    url: post.url,
    createdAt: post.createdAt,
  });
  postModel.markModified('model');

  await postModel.save();
};
