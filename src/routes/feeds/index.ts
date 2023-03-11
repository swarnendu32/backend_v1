import { Router } from "express";
import { discoverRouter } from "./discover.routes";
import { foryouRouter } from "./foryou.routes";
import { homeRouter } from "./home.routes";
import { searchRouter } from "./search.routes";

export const feedRouter = Router();

feedRouter.use("/discover", discoverRouter);
feedRouter.use("/foryou", foryouRouter);
feedRouter.use("/search", searchRouter);
feedRouter.use("/following", homeRouter);
