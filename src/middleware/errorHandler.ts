import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ErrorCodes from "../constants/ErrorCodes";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { AppError, ErrorResponseParams } from "../types";

const errorHandler: ErrorRequestHandler = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (e.error.code === "4004") {
        const error: AppError = {
            code: `${ErrorCodes.INVALID_ROUTE}`,
            message: "Not Found",
            cause: "Invalid path parameter or query parameter",
        };
        return res.status(HttpStatusCodes.NOT_FOUND).json(error);
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        meta: e.meta,
        error: e.error,
    } as ErrorResponseParams);
};

export default errorHandler;
