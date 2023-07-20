import { NextFunction, Request, Response, Router } from "express";
import ErrorCodes from "../constants/ErrorCodes";
import { ResponseBodyParams } from "../types";
import { entityRouter } from "./entities";
import { feedRouter } from "./feeds";
import HttpStatusCodes from "../constants/HttpStatusCodes";
export const indexRouter = Router();

indexRouter.use("/feeds", feedRouter);
indexRouter.use("/entities", entityRouter);
indexRouter.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({
        error: {
            code: `${ErrorCodes.INVALID_ROUTE}`,
            message: "Not Found",
            cause: "Invalid route",
            timestamp: Date.now(),
        },
    });
});
