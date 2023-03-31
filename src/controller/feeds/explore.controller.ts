import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    exploreFeedService,
    exploreMomentsFeedService,
    explorePhotosFeedService,
    exploreVideosFeedService,
} from "../../services/feeds/explore.services";
import { PageRequestBodyParams, PostQueryParams } from "../../types";
import AppError from "../../util/appError";

export const exploreFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = exploreFeedService(limit, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const explorePhotosFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const result = explorePhotosFeedService(
            postId,
            length,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const exploreVideosFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const result = exploreVideosFeedService(
            postId,
            length,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const exploreMomentsFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers["content-type"] !== "application/json") {
            throw new AppError(
                ErrorCodes.INVALID_CONTENT_TYPE,
                "Unsupported Media Type",
                "Invalid Content-Type or Content-Encoding",
                HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE
            );
        }
        if (
            Object.keys(req.body).length ||
            Object.keys(req.body).length === 0
        ) {
            if (
                typeof req.body.length !== "number" ||
                typeof req.body.offset !== "number" ||
                typeof req.body.timestamp !== "number" ||
                typeof req.params.postId !== "string" ||
                Object.keys(req.body).length > 4
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
        const postId = req.params.postId;
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const result = exploreMomentsFeedService(
            postId,
            length,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};
