import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    foryouMomentsFeedService,
    foryouPhotosFeedService,
    foryouVideosFeedService,
} from "../../services/feeds/foryou.services";
import { PageRequestBodyParams } from "../../types";
import AppError from "../../util/appError";

export const foryouPhotosFeedDataHandler = (
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
        let length: number =
            Object.keys(req.body).length === 0 ? 10 : req.body.length;
        let offset: number =
            Object.keys(req.body).length === 0 ? 0 : req.body.offset;
        let timestamp: number =
            Object.keys(req.body).length === 0
                ? Date.now()
                : req.body.timestamp;
        const result = foryouPhotosFeedService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const foryouVideosFeedDataHandler = (
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
        let length: number =
            Object.keys(req.body).length === 0 ? 10 : req.body.length;
        let offset: number =
            Object.keys(req.body).length === 0 ? 0 : req.body.offset;
        let timestamp: number =
            Object.keys(req.body).length === 0
                ? Date.now()
                : req.body.timestamp;
        const result = foryouVideosFeedService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const foryouMomenstFeedDataHandler = (
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
        let length: number =
            Object.keys(req.body).length === 0 ? 10 : req.body.length;
        let offset: number =
            Object.keys(req.body).length === 0 ? 0 : req.body.offset;
        let timestamp: number =
            Object.keys(req.body).length === 0
                ? Date.now()
                : req.body.timestamp;
        const result = foryouMomentsFeedService(length, offset, timestamp);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};
