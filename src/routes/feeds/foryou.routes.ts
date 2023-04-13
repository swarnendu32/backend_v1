import { Router } from "express";
import {
    foryouMomentsFeedDataHandler,
    foryouPhotosFeedDataHandler,
    foryouVideosFeedDataHandler,
} from "../../controller/feeds/foryou.controller";
import methodHandler from "../../middleware/methodHandler";
import { foryouSchema } from "../../schema/request.schema";
import validator from "../../middleware/validateResource";

export const foryouRouter = Router();

foryouRouter
    .route("/photos")
    .get(validator(foryouSchema), foryouPhotosFeedDataHandler)
    .all(methodHandler);

foryouRouter
    .route("/videos")
    .get(validator(foryouSchema), foryouVideosFeedDataHandler)
    .all(methodHandler);

foryouRouter
    .route("/moments")
    .get(validator(foryouSchema), foryouMomentsFeedDataHandler)
    .all(methodHandler);
