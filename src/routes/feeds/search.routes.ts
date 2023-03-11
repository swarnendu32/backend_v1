import { Router } from "express";
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

searchRouter.get("/audio", searchAudiosEntityHandler);

searchRouter.get("/hashtags", searchHashtagsEntityHandler);

searchRouter.get("/locations", searchLocationsEntityHandler);
