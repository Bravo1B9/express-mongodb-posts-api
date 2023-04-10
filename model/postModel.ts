import { postCollection } from "../db";
import { ObjectId } from "mongodb";
import { Comment } from "./commentModel";

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
      { $sort: { upvotes: -1, downvotes: 1 } },
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

export const getTopThreePosts = async () => {
  return await postCollection
    .aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          body: 1,
          upvotes: 1,
          downvotes: 1,
        },
      },
      { $sort: { upvotes: -1 } },
      { $limit: 3 },
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
  if (post.downvotes > 0) {
    post.downvotes--;
  }
  await postCollection.updateOne({ _id: new ObjectId(postId) }, { $set: post });
};

export const downvotePost = async (postId: string) => {
  const post = await postCollection.findOne({ _id: new ObjectId(postId) });
  post.downvotes++;
  if (post.upvotes > 0) {
    post.upvotes--;
  }
  await postCollection.updateOne({ _id: new ObjectId(postId) }, { $set: post });
};

export const deletePost = async (postId: string) => {
  await postCollection.deleteOne({ _id: new ObjectId(postId) });
};

export const addComment = async (postId: string, comment: Comment) => {
  await postCollection.updateOne(
    { _id: new ObjectId(postId) },
    { $push: { comments: comment } }
  );
};

export const getComments = async (postId: string) => {
  return await postCollection
    .aggregate([
      { $match: { _id: new ObjectId(postId) } },
      { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          _comments: {
            $push: {
              _id: '$comments._id',
              body: "$comments.body",
              upvotes: "$comments.upvotes",
              downvotes: "$comments.downvotes",
            }
          },
        },
      },
      {
        $project: {
          _id: 0,
          comments: '$_comments'
        },
      },
    ])
    .toArray();
};

export const upvoteComment = async (postId: string, commentId: string) => {
  return await postCollection.updateOne(
    { _id: new ObjectId(postId), "comments._id": new ObjectId(commentId) },
    {
      $inc: {
        "comments.$.upvotes": 1,
        "comments.$.downvotes": - 1
      }
    }
  );
};

export const downvoteComment = async (postId: string, commentId: string) => {
  return await postCollection.updateOne(
    { _id: new ObjectId(postId), "comments._id": new ObjectId(commentId) },
    {
      $inc: {
        "comments.$.downvotes": 1,
        "comments.$.upvotes": -1
      }
    }
  );
};
