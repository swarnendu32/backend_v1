import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpStatusCodes, ResponseBodyParams } from "../types";

const errorHandler: ErrorRequestHandler = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error: any;
    switch (e.code) {
        case 4000:
            error = {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4001:
            error = {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4002:
            error = {
                meta: {
                    status: HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4003:
            error = {
                meta: {
                    status: HttpStatusCodes.NOT_FOUND,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4004:
            error = {
                meta: {
                    status: HttpStatusCodes.NOT_ACCEPTABLE,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4005:
            error = {
                meta: {
                    status: HttpStatusCodes.NOT_FOUND,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4006:
            error = {
                meta: {
                    status: HttpStatusCodes.METHOD_NOT_ALLOWED,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4007:
            error = {
                meta: {
                    status: HttpStatusCodes.REQUEST_TIMEOUT,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4010:
            error = {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
        case 4011:
            error = {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    timestamp: e.timestamp,
                    params: req.params,
                    body: req.body,
                },
                error: {
                    code: e.code,
                    message: e.message,
                    cause: e.cause,
                },
            };
            break;
    }
    return res.status(error.meta.status).json(error);
};

export default errorHandler;
