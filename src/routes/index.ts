// import { getExploreFeedDataHandler } from "../controller/posts.controller";
// indexRouter.get("/explore", getExploreFeedDataHandler);

import { Router } from "express";
import { feedRouter } from "./feed";
export const indexRouter = Router();

indexRouter.use("/feed", feedRouter);
