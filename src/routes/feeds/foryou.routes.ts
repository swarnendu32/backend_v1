import { Router } from "express";
import {
    foryouMomenstFeedDataHandler,
    foryouPhotosFeedDataHandler,
    foryouVideosFeedDataHandler,
} from "../../controller/feeds/foryou.controller";

export const foryouRouter = Router();

foryouRouter.get("/photos", foryouPhotosFeedDataHandler);

foryouRouter.get("/videos", foryouVideosFeedDataHandler);

foryouRouter.get("/moments", foryouMomenstFeedDataHandler);
