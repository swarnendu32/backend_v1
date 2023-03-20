import { NextFunction, Request, Response, Router } from "express";
import {
    homeFeedDataHandler,
    homeFeedMemoriesDataHandler,
    homeFeedPostsDataHandler,
} from "../../controller/feeds/home.controller";

export const homeRouter = Router();

homeRouter.get("/", homeFeedDataHandler);

homeRouter.get("/posts", homeFeedPostsDataHandler);

homeRouter.get("/memories", homeFeedMemoriesDataHandler);

homeRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
