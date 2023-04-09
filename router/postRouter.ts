import express, { Router } from "express";
import * as PostController from "../controller/postController";

const router: Router = express.Router();

router.post('/posts', PostController.addPost);
router.get('/posts', PostController.getAllPosts);

export default router;
