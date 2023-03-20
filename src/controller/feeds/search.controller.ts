import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    searchAccountsEntityService,
    searchAudiosEntityService,
    searchEntityService,
    searchHashtagEntityService,
    searchLocationEntityService,
    searchPostsEntityService,
} from "../../services/feeds/search.services";
import {
    SearchRequestBodyParams,
    SearchRequestPageBodyParams,
} from "../../types";
import AppError from "../../util/appError";

export const searchEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
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
                typeof req.body.query !== "string" ||
                Object.keys(req.body).length > 1
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
        const query = req.body.query;
        const result = searchEntityService(query);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const searchPostsEntityHandler = (
    req: Request<{}, {}, SearchRequestPageBodyParams>,
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
                typeof req.body.query !== "string" ||
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
        const length = req.body.length;
        const offset = req.body.offset;
        const timestamp = req.body.timestamp;
        const query = req.body.query;
        const result = searchPostsEntityService(
            length,
            offset,
            timestamp,
            query
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const searchAccountsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
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
                typeof req.body.query !== "string" ||
                Object.keys(req.body).length > 1
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
        const query = req.body.query;
        const result = searchAccountsEntityService(query);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const searchAudiosEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    if (req.headers["content-type"] !== "application/json") {
        throw new AppError(
            ErrorCodes.INVALID_CONTENT_TYPE,
            "Unsupported Media Type",
            "Invalid Content-Type or Content-Encoding",
            HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE
        );
    }
    if (Object.keys(req.body).length || Object.keys(req.body).length === 0) {
        if (
            typeof req.body.query !== "string" ||
            Object.keys(req.body).length > 1
        ) {
            throw new AppError(
                ErrorCodes.INVALID_REQUEST_PAYLOAD,
                "Bad Request",
                "Invalid request payload",
                HttpStatusCodes.BAD_REQUEST
            );
        }
    }
    const query = req.body.query;
    try {
        const result = searchAudiosEntityService(query);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const searchHashtagsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
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
                typeof req.body.query !== "string" ||
                Object.keys(req.body).length > 1
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
        const query = req.body.query;
        const result = searchHashtagEntityService(query);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};

export const searchLocationsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
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
                typeof req.body.query !== "string" ||
                Object.keys(req.body).length > 1
            ) {
                throw new AppError(
                    ErrorCodes.INVALID_REQUEST_PAYLOAD,
                    "Bad Request",
                    "Invalid request payload",
                    HttpStatusCodes.BAD_REQUEST
                );
            }
        }
        const query = req.body.query;
        const result = searchLocationEntityService(query);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: unknown) {
        return next(e);
    }
};
