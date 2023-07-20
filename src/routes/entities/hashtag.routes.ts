import { Router } from "express";
import validator from "../../middleware/validateResource";
import { getHashTagAndLocationSchema } from "../../schema/request.schema";
import {
    getHashTagAllPosts,
    getHashTagDetails,
    getHashTagMoments,
    getHashTagPhotos,
    getHashTagVideos,
} from "../../controller/entities/hashtags.controller";
import methodHandler from "../../middleware/methodHandler";

export const hashtagRouter = Router();

hashtagRouter
    .route("/:name")
    .get(validator(getHashTagAndLocationSchema), getHashTagDetails)
    .all(methodHandler);

hashtagRouter
    .route("/:name/posts")
    .get(validator(getHashTagAndLocationSchema), getHashTagAllPosts)
    .all(methodHandler);

hashtagRouter
    .route("/:name/posts/photos")
    .get(validator(getHashTagAndLocationSchema), getHashTagPhotos)
    .all(methodHandler);

hashtagRouter
    .route("/:name/posts/videos")
    .get(validator(getHashTagAndLocationSchema), getHashTagVideos)
    .all(methodHandler);

hashtagRouter
    .route("/:name/posts/moments")
    .get(validator(getHashTagAndLocationSchema), getHashTagMoments)
    .all(methodHandler);
