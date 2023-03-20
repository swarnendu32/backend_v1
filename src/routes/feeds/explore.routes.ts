import { NextFunction, Request, Response, Router } from "express";
import {
    exploreFeedDataHandler,
    exploreMomentsFeedDataHandler,
    explorePhotosFeedDataHandler,
    exploreVideosFeedDataHandler,
} from "../../controller/feeds/explore.controller";

export const exploreRouter = Router();

exploreRouter.get("/", exploreFeedDataHandler);

exploreRouter.get("/:postId/photos", explorePhotosFeedDataHandler);

exploreRouter.get("/:postId/videos", exploreVideosFeedDataHandler);

exploreRouter.get("/:postId/moments", exploreMomentsFeedDataHandler);

exploreRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
