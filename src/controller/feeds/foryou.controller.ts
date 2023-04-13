import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    foryouMomentsFeedService,
    foryouPhotosFeedService,
    foryouVideosFeedService,
} from "../../services/feeds/foryou.services";

export const foryouPhotosFeedDataHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = foryouPhotosFeedService(limit, offset, timestamp);
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

export const foryouVideosFeedDataHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = foryouVideosFeedService(limit, offset, timestamp);
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

export const foryouMomentsFeedDataHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = foryouMomentsFeedService(limit, offset, timestamp);
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
