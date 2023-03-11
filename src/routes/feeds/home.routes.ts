import { Router } from "express";
import {
    homeFeedDataHandler,
    homeMemoriesFeedDataHandler,
    homePostsFeedDataHandler,
} from "../../controller/feeds/home.controller";

export const homeRouter = Router();

homeRouter.get("/", homeFeedDataHandler);

homeRouter.get("/posts", homePostsFeedDataHandler);

homeRouter.get("/memories", homeMemoriesFeedDataHandler);
