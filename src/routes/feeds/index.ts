import { NextFunction, Request, Response, Router } from "express";
import { discoverRouter } from "./discover.routes";
import { exploreRouter } from "./explore.routes";
import { foryouRouter } from "./foryou.routes";
import { homeRouter } from "./home.routes";
import { searchRouter } from "./search.routes";

export const feedRouter = Router();

feedRouter.use("/discover", discoverRouter);
feedRouter.use("/foryou", foryouRouter);
feedRouter.use("/search", searchRouter);
feedRouter.use("/following", homeRouter);
feedRouter.use("/explore", exploreRouter);
feedRouter.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
