import { NextFunction, Request, Response, Router } from "express";
import { entityRouter } from "./entities";
import { feedRouter } from "./feeds";
export const indexRouter = Router();

indexRouter.use("/feeds", feedRouter);
indexRouter.use("/entities", entityRouter);
indexRouter.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({ error: { code: "4004" } });
});
