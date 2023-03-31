import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ErrorCodes from "../constants/ErrorCodes";
import { HttpStatusCodes, ResponseBodyParams } from "../types";

const validator =
    (schema: z.AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            header: req.headers,
            params: req.params,
            body: req.body,
        });
        if (!result.success) {
            const issue = result.error.issues[0];
            const errorOrigin = issue.path[issue.path.length - 1];
            let error: any;
            switch (errorOrigin) {
                case "content-type":
                    error = {
                        meta: {
                            status: HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE,
                            timestamp: Date.now(),
                            body: req.body,
                            params: req.params as any,
                        },
                        error: {
                            code: `${ErrorCodes.INVALID_CONTENT_TYPE}`,
                            message: "Unsupported Media Type",
                            cause: "Invalid Content-type or Content-encoding",
                        },
                    } as ResponseBodyParams;
                    break;
                case "postId":
                case "commentId":
                case "replyId":
                    error = {
                        meta: {
                            status: HttpStatusCodes.NOT_FOUND,
                            timestamp: Date.now(),
                            body: req.body,
                            params: req.params as any,
                        },
                        error: {
                            code: `${ErrorCodes.RESOURCE_NOT_FOUND}`,
                            message: "Not Found",
                            cause: "No such resource found",
                        },
                    } as ResponseBodyParams;
                    break;
                case "queryString":
                case "limit":
                case "offset":
                case "timestamp":
                case "content":
                case "category":
                case "reason":
                case "description":
                case "page":
                    error = {
                        meta: {
                            status: HttpStatusCodes.BAD_REQUEST,
                            timestamp: Date.now(),
                            body: req.body,
                            params: req.params as any,
                        },
                        error: {
                            code: `${ErrorCodes.INVALID_REQUEST_PAYLOAD}`,
                            message: "Bad Request",
                            cause: "Invalid request payload",
                        },
                    } as ResponseBodyParams;
                    break;
                default:
                    error = {
                        meta: {
                            status: HttpStatusCodes.NOT_ACCEPTABLE,
                            timestamp: Date.now(),
                            body: req.body,
                            params: req.params as any,
                        },
                        error: {
                            code: ErrorCodes.UNACCEPTABLE,
                            message: "Not Acceptable",
                            reason: "Got unacceptable values",
                        },
                    };
                    break;
            }
            return next(error);
        }
        next();
    };

export default validator;
