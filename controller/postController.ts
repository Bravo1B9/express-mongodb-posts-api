import { Request, Response } from "express";
import * as PostModel from "../model/postModel";
import { Post } from "../model/postModel";
import { Comment } from "../model/commentModel";

export const addPost = async (req: Request, res: Response) => {
  const post: Post = {
    title: req.body.title,
    body: req.body.body,
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await PostModel.addPost(post);
  res.status(201).json({ msg: "Post added" });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.getAllPosts();
  res.status(200).json({ posts });
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.getPostById(req.params.id);
    if(!post) {
      res.status(404).json({ error: `Post with ID: ${req.params.id} not found` });
    } else {
      res.status(200).json({ post });
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching the post." });
  }
};

export const getTopThreePosts = async (req: Request, res: Response) => {
  const posts = await PostModel.getTopThreePosts();
  res.status(200).json({ posts });
};

export const updatePostTitle = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const newTitle = req.body.newTitle;
  await PostModel.updatePostTitle(postId, newTitle);
  res
    .status(200)
    .json({ msg: `Post ${postId} updated with the new title of: ${newTitle}` });
};

export const updatePostBody = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const newBody = req.body.newBody;
  await PostModel.updatePostBody(postId, newBody);
  res.status(200).json({ msg: `Post ${postId} updated with new body of: ${newBody}` });
};

export const upvotePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  await PostModel.upvotePost(postId);
  res.status(200).json({ msg: `Post ${postId} upvoted` });
};

export const downvotePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  await PostModel.downvotePost(postId);
  res.status(200).json({ msg: `Post ${postId} downvoted` });
};

export const addComment = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const comment: Comment = {
    body: req.body.body,
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await PostModel.addComment(postId, comment);
  res.status(201).json({ msg: `Comment added to post: ${postId}` });
};

export const getComments = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const comments = await PostModel.getComments(postId);
  res.status(200).json({ comments });
};
