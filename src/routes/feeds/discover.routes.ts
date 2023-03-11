import { Router } from "express";
import {
    discoverForYouFeedDataHandler,
    discoverNearByFeedDataHandler,
    discoverNewFeedDataHandler,
    discoverPopularFeedDataHandler,
} from "../../controller/feeds/discover.controller";

export const discoverRouter = Router();

discoverRouter.get("/foryou", discoverForYouFeedDataHandler);

discoverRouter.get("/popular", discoverPopularFeedDataHandler);

discoverRouter.get("/new", discoverNewFeedDataHandler);

discoverRouter.get("/nearby", discoverNearByFeedDataHandler);
