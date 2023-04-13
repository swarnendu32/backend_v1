import { Router } from "express";
import {
    searchAccountsEntityHandler,
    searchAudiosEntityHandler,
    searchEntityHandler,
    searchHashtagsEntityHandler,
    searchLocationsEntityHandler,
    searchPostsEntityHandler,
} from "../../controller/feeds/search.controller";
import methodHandler from "../../middleware/methodHandler";
import validator from "../../middleware/validateResource";
import { pageSearchSchema, searchSchema } from "../../schema/request.schema";

export const searchRouter = Router();

searchRouter
    .route("/")
    .get(validator(searchSchema), searchEntityHandler)
    .all(methodHandler);

searchRouter
    .route("/posts")
    .get(validator(pageSearchSchema), searchPostsEntityHandler)
    .all(methodHandler);

searchRouter
    .route("/accounts")
    .get(validator(searchSchema), searchAccountsEntityHandler)
    .all(methodHandler);

searchRouter
    .route("/audios")
    .get(validator(searchSchema), searchAudiosEntityHandler)
    .all(methodHandler);

searchRouter
    .route("/hashtags")
    .get(validator(searchSchema), searchHashtagsEntityHandler)
    .all(methodHandler);

searchRouter
    .route("/locations")
    .get(validator(searchSchema), searchLocationsEntityHandler)
    .all(methodHandler);
