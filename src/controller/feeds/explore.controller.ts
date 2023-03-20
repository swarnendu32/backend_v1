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
        if (req.headers["content-type"] !== "application/json") {
            throw new AppError(
                ErrorCodes.INVALID_CONTENT_TYPE,
                "Unsupported Media Type",
                "Invalid Content-Type or Content-Encoding",
                HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE
            );
        }
        if (Object.keys(req.body).length) {
            if (
                typeof req.body.length !== "number" ||
                typeof req.body.offset !== "number" ||
                typeof req.body.timestamp !== "number" ||
                Object.keys(req.body).length > 3
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
        const length =
            Object.keys(req.body).length === 0 ? 10 : req.body.length;
        const offset = Object.keys(req.body).length === 0 ? 0 : req.body.offset;
        const timestamp =
            Object.keys(req.body).length === 0
                ? Date.now()
                : req.body.timestamp;
        const result = exploreFeedService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const explorePhotosFeedDataHandler = (
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
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
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
    } catch (e: unknown) {
        return next(e);
    }
};

export const exploreVideosFeedDataHandler = (
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
        const result = exploreVideosFeedService(
            postId,
            length,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
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
    } catch (e: unknown) {
        return next(e);
    }
};
