import { NextFunction, Request, Response, Router } from "express";
import {
    searchAccountsEntityHandler,
    searchAudiosEntityHandler,
    searchEntityHandler,
    searchHashtagsEntityHandler,
    searchLocationsEntityHandler,
    searchPostsEntityHandler,
} from "../../controller/feeds/search.controller";

export const searchRouter = Router();

searchRouter.get("/", searchEntityHandler);

searchRouter.get("/posts", searchPostsEntityHandler);

searchRouter.get("/accounts", searchAccountsEntityHandler);

searchRouter.get("/audios", searchAudiosEntityHandler);

searchRouter.get("/hashtags", searchHashtagsEntityHandler);

searchRouter.get("/locations", searchLocationsEntityHandler);

searchRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
