import { Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    exploreFeedService,
    exploreMomentsFeedService,
    explorePhotosFeedService,
    exploreVideosFeedService,
} from "../../services/feeds/explore.services";
import { PageRequestBodyParams, PostQueryParams } from "../../types";

export const exploreFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    const length = Object.keys(req.body).length === 0 ? 10 : req.body.length;
    const offset = Object.keys(req.body).length === 0 ? 0 : req.body.offset;
    const timestamp =
        Object.keys(req.body).length === 0 ? Date.now() : req.body.timestamp;
    try {
        const { data, error } = exploreFeedService(length, offset, timestamp);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const explorePhotosFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response
) => {
    const postId = req.params.postId;
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    try {
        const { data, error } = explorePhotosFeedService(
            postId,
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

export const exploreVideosFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response
) => {
    const postId = req.params.postId;
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    try {
        const { data, error } = exploreVideosFeedService(
            postId,
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

export const exploreMomentsFeedDataHandler = (
    req: Request<PostQueryParams, {}, PageRequestBodyParams>,
    res: Response
) => {
    const postId = req.params.postId;
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    try {
        const { data, error } = exploreMomentsFeedService(
            postId,
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
