import { Router } from "express";
import { postsRouter } from "./posts.routes";

export const entityRouter = Router();

entityRouter.use("/posts", postsRouter);
