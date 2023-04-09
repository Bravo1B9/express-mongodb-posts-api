import express, { Router } from "express";
import * as PostController from "../controller/postController";

const router: Router = express.Router();

router.post('/posts', PostController.addPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/title/:id', PostController.updatePostTitle);
router.put('/posts/body/:id', PostController.updatePostBody);
router.put('/posts/upvote/:id', PostController.upvotePost);
router.put('/posts/downvote/:id', PostController.downvotePost);
router.post('/posts/comments/:id', PostController.addComment);

export default router;
