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
    updatedAt: new Date()
  };
  await PostModel.addPost(post);
  res.status(201).json({ msg: 'Post added' });
};