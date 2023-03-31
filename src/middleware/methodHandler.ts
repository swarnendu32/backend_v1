import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../constants/ErrorCodes";
import { HttpStatusCodes, ResponseBodyParams } from "../types";

const methodHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = {
        meta: {
            status: HttpStatusCodes.METHOD_NOT_ALLOWED,
            timestamp: Date.now(),
            body: req.body,
            params: req.params as any,
        },
        error: {
            code: `${ErrorCodes.INVALID_METHOD}`,
            message: "Method Not Allowed",
            cause: "Target resource doesnot support this method",
        },
    } as ResponseBodyParams;
    next(error);
};

export default methodHandler;
