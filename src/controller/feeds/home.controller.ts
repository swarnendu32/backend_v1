import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    homeFeedMemoriesService,
    homeFeedPostsService,
    homeFeedService,
} from "../../services/feeds/home.services";
import { PageRequestBodyParams } from "../../types";
import AppError from "../../util/appError";

export const homeFeedDataHandler = (
    req: Request,
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
            throw new AppError(
                ErrorCodes.INVALID_REQUEST_PAYLOAD,
                "Bad Request",
                "Invalid request payload",
                HttpStatusCodes.BAD_REQUEST
            );
        }
        const result = homeFeedService();
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const homeFeedPostsDataHandler = (
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
        if (
            Object.keys(req.body).length ||
            Object.keys(req.body).length === 0
        ) {
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
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const result = homeFeedPostsService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const homeFeedMemoriesDataHandler = (
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
        if (
            Object.keys(req.body).length ||
            Object.keys(req.body).length === 0
        ) {
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
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const result = homeFeedMemoriesService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};
