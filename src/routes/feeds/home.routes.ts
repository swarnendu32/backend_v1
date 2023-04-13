import { Router } from "express";
import {
    homeFeedDataHandler,
    homeFeedMemoriesDataHandler,
    homeFeedPostsDataHandler,
} from "../../controller/feeds/home.controller";
import methodHandler from "../../middleware/methodHandler";
import validator from "../../middleware/validateResource";
import { homeFeedSchema, homeSchema } from "../../schema/request.schema";

export const homeRouter = Router();

homeRouter
    .route("/")
    .get(validator(homeSchema), homeFeedDataHandler)
    .all(methodHandler);

homeRouter
    .route("/followingposts")
    .get(validator(homeFeedSchema), homeFeedPostsDataHandler)
    .all(methodHandler);

homeRouter
    .route("/followingmemories")
    .get(validator(homeFeedSchema), homeFeedMemoriesDataHandler)
    .all(methodHandler);
