import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ErrorCodes from "../constants/ErrorCodes";

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
                        code: `${ErrorCodes.INVALID_CONTENT_TYPE}`,
                        message: "Unsupported Media Type",
                        cause: "Invalid Content-type or Content-encoding",
                        timestamp: Date.now(),
                    };
                    break;
                case "postId":
                case "commentId":
                case "replyId":
                    error = {
                        code: `${ErrorCodes.INAVLID_REQUEST_PARAMETER}`,
                        message: "Bad Request",
                        cause: "Invaild request parameter",
                        timestamp: Date.now(),
                    };
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
                        code: `${ErrorCodes.INVALID_REQUEST_PAYLOAD}`,
                        message: "Bad Request",
                        cause: "Invalid request payload",
                        timestamp: Date.now(),
                    };
                    break;
                default:
                    error = {
                        code: ErrorCodes.REQUEST_UNACCEPTABLE,
                        message: "Not Acceptable",
                        reason: "Got unacceptable values",
                        timestamp: Date.now(),
                    };
                    break;
            }
            return next(error);
        }
        next();
    };

export default validator;
