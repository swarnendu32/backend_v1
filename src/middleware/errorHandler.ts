import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ResponseBodyParams } from "../types";

const errorHandler: ErrorRequestHandler = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(e.meta.status).json({
        meta: e.meta,
        error: e.error,
    } as ResponseBodyParams);
};

export default errorHandler;
