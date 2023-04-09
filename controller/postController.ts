import { Request, Response } from "express";
import * as PostModel from "../model/postModel";
import { Post } from "../model/postModel";

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
  const post = await PostModel.getPostById(req.params.id);
  res.status(200).json({ post });
};

export const updatePostTitle = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const newTitle = req.body.newTitle;
  await PostModel.updatePostTitle(postId, newTitle);
  res
    .status(200)
    .json({ msg: `Post ${postId} updated with the new title of: ${newTitle}` });
};
