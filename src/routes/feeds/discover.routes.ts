import { NextFunction, Request, Response, Router } from "express";
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

discoverRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
