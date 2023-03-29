import { Router } from "express";
import {
    postGetLikesHandler,
    postUpdateLikesHandler,
} from "../../controller/entities/posts.controller";

export const postsRouter = Router();

postsRouter.put("/:postId/likes", postUpdateLikesHandler);
postsRouter.get("/:postId/likes", postGetLikesHandler);
