import { postCollection } from "../db";
import { ObjectId } from "mongodb";

export interface Post {
  title: string;
  body: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export const addPost = async (post: Post) => {
  await postCollection.insertOne(post);
};

export const getAllPosts = async () => {
  return await postCollection
    .aggregate([
      {
        $project: { title: 1, body: 1, upvotes: 1, downvotes: 1 },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ])
    .toArray();
};

export const getPostById = async (postId: string) => {
  return await postCollection
    .aggregate([
      { $match: { _id: new ObjectId(postId) } },
      {
        $project: {
          _id: 0,
          title: 1,
          body: 1,
          upvotes: 1,
          downvotes: 1,
        },
      },
    ])
    .toArray();
};

export const updatePostTitle = async (postId: string, newTitle: string) => {
  await postCollection.updateOne(
    { _id: new ObjectId(postId) },
    { $set: { title: newTitle } }
  );
};

export const updatePostBody = async (postId: string, newBody: string) => {
  await postCollection.updateOne(
    { _id: new ObjectId(postId) },
    { $set: { body: newBody } }
  );
};

export const upvotePost = async (postId: string) => {
  const post = await postCollection.findOne({ _id: new ObjectId(postId) });
  post.upvotes++;
  if(post.downvotes > 0) {
    post.downvotes--;
  }
  await postCollection.updateOne({ _id: new ObjectId(postId) }, { $set: post });
};

export const downvotePost = async (postId: string) => {
  const post = await postCollection.findOne({ _id: new ObjectId(postId) });
  post.downvotes++;
  if(post.upvotes > 0) {
    post.upvotes--;
  };
  await postCollection.updateOne({ _id: new ObjectId(postId) }, { $set: post });
};
