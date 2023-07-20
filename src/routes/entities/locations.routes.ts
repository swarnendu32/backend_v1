import { Router } from "express";
import {
    getLocationAllPostsHandler,
    getLocationDetailsHandler,
    getLocationMomentsHandler,
    getLocationPhotosHandler,
    getLocationVideosHandler,
} from "../../controller/entities/locations.controller";
import validator from "../../middleware/validateResource";
import { getHashTagAndLocationSchema } from "../../schema/request.schema";
import methodHandler from "../../middleware/methodHandler";

export const locationsRouter = Router();

locationsRouter
    .route("/:name")
    .get(validator(getHashTagAndLocationSchema), getLocationDetailsHandler)
    .all(methodHandler);

locationsRouter
    .route("/:name/posts")
    .get(validator(getHashTagAndLocationSchema), getLocationAllPostsHandler)
    .all(methodHandler);

locationsRouter
    .route("/:name/posts/photos")
    .get(validator(getHashTagAndLocationSchema), getLocationPhotosHandler)
    .all(methodHandler);

locationsRouter
    .route("/:name/posts/videos")
    .get(validator(getHashTagAndLocationSchema), getLocationVideosHandler)
    .all(methodHandler);

locationsRouter
    .route("/:name/posts/moments")
    .get(validator(getHashTagAndLocationSchema), getLocationMomentsHandler)
    .all(methodHandler);
