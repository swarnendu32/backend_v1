import { Router } from "express";
import { postsRouter } from "./posts.routes";
import { audiosRouter } from "./audios.routes";
import { locationsRouter } from "./locations.routes";
import { hashtagRouter } from "./hashtag.routes";

export const entityRouter = Router();

entityRouter.use("/posts", postsRouter);
entityRouter.use("/audio", audiosRouter);
entityRouter.use("/locations", locationsRouter);
entityRouter.use("/hashtags", hashtagRouter);