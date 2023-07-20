import { Router } from "express";
import {
    getAudioDetailsHandler,
    getAudioMomentsHandler,
    getAudioPhotosHandler,
    getSaveAudioHandler,
} from "../../controller/entities/audios.controller";
import validator from "../../middleware/validateResource";
import { getAudioSchema } from "../../schema/request.schema";
import methodHandler from "../../middleware/methodHandler";

export const audiosRouter = Router();

audiosRouter
    .route("/:audioId")
    .get(validator(getAudioSchema), getAudioDetailsHandler)
    .all(methodHandler);

audiosRouter
    .route("/:audioId/posts/photos")
    .get(validator(getAudioSchema), getAudioPhotosHandler)
    .all(methodHandler);

audiosRouter
    .route("/:audioId/posts/moments")
    .get(validator(getAudioSchema), getAudioMomentsHandler)
    .all(methodHandler);

audiosRouter
    .route("/:audioId/saves")
    .put(validator(getAudioSchema), getSaveAudioHandler)
    .all(methodHandler);
