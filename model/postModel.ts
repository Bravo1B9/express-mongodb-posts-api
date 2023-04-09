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

export const getAllPosts = async () => {
  return await postCollection.aggregate([
    { $project: { "title": 1, "body": 1, "upvotes": 1, "downvotes": 1, "createdAt": 1 } },
    { $sort: { "createdAt": - 1 } },
    { $limit: 3 }
  ]).toArray();
};