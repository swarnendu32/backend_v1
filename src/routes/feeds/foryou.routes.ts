import { NextFunction, Request, Response, Router } from "express";
import {
    foryouMomenstFeedDataHandler,
    foryouPhotosFeedDataHandler,
    foryouVideosFeedDataHandler,
} from "../../controller/feeds/foryou.controller";

export const foryouRouter = Router();

foryouRouter.get("/photos", foryouPhotosFeedDataHandler);

foryouRouter.get("/videos", foryouVideosFeedDataHandler);

foryouRouter.get("/moments", foryouMomenstFeedDataHandler);

foryouRouter.get("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
