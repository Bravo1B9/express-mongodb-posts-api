import express, { Router } from "express";
import * as PostController from "../controller/postController";

const router: Router = express.Router();

router.post('/posts', PostController.addPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);

export default router;
