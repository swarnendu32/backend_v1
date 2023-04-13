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
    PageSearchRequestBodyParams,
    SearchRequestBodyParams,
} from "../../types";
import AppError from "../../util/appError";

export const searchEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = req.body.queryString;
        const result = searchEntityService(queryString);
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

export const searchPostsEntityHandler = (
    req: Request<{}, {}, PageSearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const queryString = req.body.queryString;
        const result = searchPostsEntityService(
            limit,
            offset,
            timestamp,
            queryString
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

export const searchAccountsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = req.body.queryString;
        const result = searchAccountsEntityService(queryString);
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

export const searchAudiosEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = req.body.queryString;
        const result = searchAudiosEntityService(queryString);
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

export const searchHashtagsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = req.body.queryString;
        const result = searchHashtagEntityService(queryString);
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

export const searchLocationsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const queryString = req.body.queryString;
        const result = searchLocationEntityService(queryString);
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
