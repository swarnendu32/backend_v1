import { Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    homeFeedMemoriesService,
    homeFeedPostsService,
    homeFeedService,
} from "../../services/feeds/home.services";
import { PageRequestBodyParams } from "../../types";

export const homeFeedDataHandler = (req: Request, res: Response) => {
    try {
        const { data, error } = homeFeedService();
        if (error === undefined) {
            return res.status(HttpStatusCodes.OK).json(data);
        }
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const homeFeedPostsDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    try {
        const { data, error } = homeFeedPostsService(length, offset, timestamp);
        if (error === undefined) {
            return res.status(HttpStatusCodes.OK).json(data);
        }
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const homeFeedMemoriesDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    try {
        const { data, error } = homeFeedMemoriesService(
            length,
            offset,
            timestamp
        );
        if (error === undefined) {
            return res.status(HttpStatusCodes.OK).json(data);
        }
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
