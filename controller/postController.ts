import { Request, Response } from "express";

export const addPost = async (req: Request, res: Response) => {
  res.json({ msg: 'Add post route reached' });
};