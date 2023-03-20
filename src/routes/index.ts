import { NextFunction, Request, Response, Router } from "express";
import { feedRouter } from "./feeds";
export const indexRouter = Router();

indexRouter.use("/feeds", feedRouter);
indexRouter.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({ message: "INVALID_ROUTE" });
});
