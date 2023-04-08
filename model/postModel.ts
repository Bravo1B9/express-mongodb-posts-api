import { postCollection } from "../db";

export interface Post {
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
};

export const addPost = async (post: Post) => {
  await postCollection.insertOne(post);
};