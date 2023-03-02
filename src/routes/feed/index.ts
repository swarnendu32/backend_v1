import { Router } from "express";
import { discoverRouter } from "./discover.routes";

export const feedRouter = Router();

feedRouter.use("/discover", discoverRouter);
