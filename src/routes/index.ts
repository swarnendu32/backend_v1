import { Router } from "express";
import { getExploreFeedDataHandler } from "../controller/posts.controller";

export const indexRouter = Router();

indexRouter.get("/explore", getExploreFeedDataHandler);
