import { Request, Response } from "express";
import { date } from "zod";
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
    res: Response
) => {
    let length: number =
        Object.keys(req.body).length === 0 ? 10 : req.body.length;
    let offset: number =
        Object.keys(req.body).length === 0 ? 0 : req.body.offset;
    let timestamp: number =
        Object.keys(req.body).length === 0 ? Date.now() : req.body.timestamp;
    try {
        const { data, error } = discoverForYouFeedService(
            length,
            offset,
            timestamp
        );
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const discoverPopularFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    let length: number =
        Object.keys(req.body).length === 0 ? 10 : req.body.length;
    let offset: number =
        Object.keys(req.body).length === 0 ? 0 : req.body.offset;
    let timestamp: number =
        Object.keys(req.body).length === 0 ? Date.now() : req.body.timestamp;
    try {
        const { data, error } = discoverPopularFeedService(
            length,
            offset,
            timestamp
        );
        if (error === undefined) return res.json(data);
        throw error;
    } catch (error) {
        res.status(500).send(error);
    }
};

export const discoverNewFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    let length: number =
        Object.keys(req.body).length === 0 ? 10 : req.body.length;
    let offset: number =
        Object.keys(req.body).length === 0 ? 0 : req.body.offset;
    let timestamp: number =
        Object.keys(req.body).length === 0 ? Date.now() : req.body.timestamp;
    try {
        const { data, error } = discoverNewFeedService(
            length,
            offset,
            timestamp
        );
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const discoverNearByFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    let length: number =
        Object.keys(req.body).length === 0 ? 10 : req.body.length;
    let offset: number =
        Object.keys(req.body).length === 0 ? 0 : req.body.offset;
    let timestamp: number =
        Object.keys(req.body).length === 0 ? Date.now() : req.body.timestamp;
    try {
        const { data, error } = discoverNearByFeedService(
            length,
            offset,
            timestamp
        );
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
