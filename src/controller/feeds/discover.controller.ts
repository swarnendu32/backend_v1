import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    discoverForYouFeedService,
    discoverNearByFeedService,
    discoverNewFeedService,
    discoverPopularFeedService,
} from "../../services/feeds/discover.services";
import { PageRequestBodyParams } from "../../types";

export const discoverForYouFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = discoverForYouFeedService(limit, offset, timestamp);
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

export const discoverPopularFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;

        const result = discoverPopularFeedService(limit, offset, timestamp);
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

export const discoverNewFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = discoverNewFeedService(limit, offset, timestamp);
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

export const discoverNearByFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = discoverNearByFeedService(limit, offset, timestamp);
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
