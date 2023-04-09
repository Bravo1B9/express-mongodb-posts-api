import express, { Router } from "express";
import { addPost, getAllPosts } from "../controller/postController";

const router: Router = express.Router();

router.post('/posts', addPost);
router.get('/posts', getAllPosts)

export default router;
