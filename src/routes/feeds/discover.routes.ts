import { Router } from "express";
import {
    discoverForYouFeedDataHandler,
    discoverNearByFeedDataHandler,
    discoverNewFeedDataHandler,
    discoverPopularFeedDataHandler,
} from "../../controller/feeds/discover.controller";
import methodHandler from "../../middleware/methodHandler";
import { discoverSchema } from "../../schema/request.schema";
import validator from "../../middleware/validateResource";

export const discoverRouter = Router();

discoverRouter
    .route("/foryou")
    .get(validator(discoverSchema), discoverForYouFeedDataHandler)
    .all(methodHandler);

discoverRouter
    .route("/popular")
    .get(validator(discoverSchema), discoverPopularFeedDataHandler)
    .all(methodHandler);
discoverRouter
    .route("/new")
    .get(validator(discoverSchema), discoverNewFeedDataHandler)
    .all(methodHandler);

discoverRouter
    .route("/nearby")
    .get(validator(discoverSchema), discoverNearByFeedDataHandler)
    .all(methodHandler);
