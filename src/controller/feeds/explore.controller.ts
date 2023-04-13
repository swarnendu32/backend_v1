import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    exploreFeedService,
    explorePostFeedService,
} from "../../services/feeds/explore.services";
import {
    PartialPageRequestBodyParams,
    PostRequestQueryParams,
} from "../../types";

export const exploreFeedDataHandler = (
    req: Request<{}, {}, PartialPageRequestBodyParams>,
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

export const explorePostFeedDataHandler = (
    req: Request<PostRequestQueryParams, {}, PartialPageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = explorePostFeedService(postId, limit, offset, timestamp);
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
