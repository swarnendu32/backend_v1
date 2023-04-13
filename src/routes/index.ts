import { NextFunction, Request, Response, Router } from "express";
import ErrorCodes from "../constants/ErrorCodes";
import { HttpStatusCodes, ResponseBodyParams } from "../types";
import { entityRouter } from "./entities";
import { feedRouter } from "./feeds";
export const indexRouter = Router();

indexRouter.use("/feeds", feedRouter);
indexRouter.use("/entities", entityRouter);
indexRouter.use("*", (req: Request, res: Response, next: NextFunction) => {
    next({
        meta: {
            status: HttpStatusCodes.NOT_FOUND,
            timestamp: Date.now(),
            body: req.body,
            params: req.params as any,
        },
        error: {
            code: `${ErrorCodes.INVALID_ROUTE}`,
            message: "Not Found",
            cause: "Invalid route",
        },
    } as ResponseBodyParams);
});
