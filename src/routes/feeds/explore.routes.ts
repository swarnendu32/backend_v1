import { Router } from "express";
import {
    exploreFeedDataHandler,
    explorePostFeedDataHandler,
} from "../../controller/feeds/explore.controller";
import methodHandler from "../../middleware/methodHandler";
import validator from "../../middleware/validateResource";
import { explorePostSchema, exploreSchema } from "../../schema/request.schema";

export const exploreRouter = Router();

exploreRouter
    .route("/")
    .get(validator(exploreSchema), exploreFeedDataHandler)
    .all(methodHandler);

exploreRouter
    .route("/:postId")
    .get(validator(explorePostSchema), explorePostFeedDataHandler)
    .all(methodHandler);
