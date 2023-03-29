import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import { postUpdateLikesService } from "../../services/entities/posts.services";
import {
    ErrorResponseParams,
    HttpStatusCodes,
    PostRequestQueryParams,
    SearchRequestBodyParams,
} from "../../types";

export const postUpdateLikesHandler = async (
    req: Request<{ postId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers["content-type"] !== "application/json") {
            throw {
                meta: {
                    status: HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: `${ErrorCodes.INVALID_CONTENT_TYPE}`,
                    message: "Unsupported Media Type",
                    cause: "Invalid Content-Type or Content-Encoding",
                },
            } as ErrorResponseParams<PostRequestQueryParams>;
        }
        if (Object.keys(req.body).length !== 0) {
            throw {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: `${ErrorCodes.INVALID_REQUEST_PAYLOAD}`,
                    message: "Bad Request",
                    cause: "Invalid request payload",
                },
            } as ErrorResponseParams<PostRequestQueryParams>;
        }
        const result = await postUpdateLikesService(req.params.postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error: ErrorResponseParams<PostRequestQueryParams>;
        if (e.code === "5000") {
            error = {
                meta: {
                    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: e.code,
                    message: "Internal Server Error",
                    cause: "Something went wrong",
                },
            };
        } else {
            error = {
                meta: e.meta,
                error: e.error,
            };
        }
        return next(error);
    }
};

export const postGetLikesHandler = async (
    req: Request<{ postId: string }, {}, Partial<SearchRequestBodyParams>>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers["content-type"] !== "application/json") {
            throw {
                meta: {
                    status: HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: `${ErrorCodes.INVALID_CONTENT_TYPE}`,
                    message: "Unsupported Media Type",
                    cause: "Invalid Content-Type or Content-Encoding",
                },
            } as ErrorResponseParams<PostRequestQueryParams>;
        }
        if (Object.keys(req.body).length > 1) {
            throw {
                meta: {
                    status: HttpStatusCodes.BAD_REQUEST,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: `${ErrorCodes.INVALID_REQUEST_PAYLOAD}`,
                    message: "Bad Request",
                    cause: "Invalid request payload",
                },
            } as ErrorResponseParams<PostRequestQueryParams>;
        }
        const result = await postUpdateLikesService(req.params.postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error: ErrorResponseParams<PostRequestQueryParams>;
        if (e.code === "5000") {
            error = {
                meta: {
                    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                    postId: req.params.postId,
                    timestamp: Date.now(),
                },
                error: {
                    code: e.code,
                    message: "Internal Server Error",
                    cause: "Something went wrong",
                },
            };
        } else {
            error = {
                meta: e.meta,
                error: e.error,
            };
        }
        return next(error);
    }
};
