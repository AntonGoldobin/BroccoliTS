import { Schema } from 'mongoose';

export const sPost = new Schema({
  postId: String,
  url: String,
  createdAt: Number,
});
