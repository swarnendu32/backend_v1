import { Router } from "express";
import { feedRouter } from "./feeds";
export const indexRouter = Router();

indexRouter.use("/feeds", feedRouter);
