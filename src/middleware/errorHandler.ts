import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ErrorCodes from "../constants/ErrorCodes";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import AppError from "../util/appError";

const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        console.log("AppError");
        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
            message: error.message,
            reason: error.reason,
            statusCode: error.statusCode,
        });
    }
    if (error.message === "INVALID_ROUTE") {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
            errorCode: ErrorCodes.INVALID_ROUTE,
            message: "Not Found",
            reason: "Invalid path parameter or query parameter",
            statusCode: HttpStatusCodes.NOT_FOUND,
        });
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        errorCode: ErrorCodes.SERVER_ERROR,
        message: "Something went wrong",
        reason: "Server is not working",
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    });
};

export default errorHandler;
