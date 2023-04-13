import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../constants/ErrorCodes";

const methodHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = {
        code: `${ErrorCodes.INVALID_REQUEST_METHOD}`,
        message: "Method Not Allowed",
        cause: "Target route doesnot support this method",
        timestamp: Date.now(),
    };
    next(error);
};

export default methodHandler;
