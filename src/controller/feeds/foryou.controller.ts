import { Request, Response } from "express";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    foryouMomentsFeedService,
    foryouPhotosFeedService,
    foryouVideosFeedService,
} from "../../services/feeds/foryou.services";
import { PageRequestBodyParams } from "../../types";

export const foryouPhotosFeedDataHandler = (
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
        const { data, error } = foryouPhotosFeedService(
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

export const foryouVideosFeedDataHandler = (
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
        const { data, error } = foryouVideosFeedService(
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

export const foryouMomenstFeedDataHandler = (
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
        const { data, error } = foryouMomentsFeedService(
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
