import express, { Router } from "express";
import { addPost } from "../controller/postController";

const router: Router = express.Router();

router.post('/posts', addPost);

export default router;
