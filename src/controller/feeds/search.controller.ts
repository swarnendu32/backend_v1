import { Request, Response } from "express";
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

export const searchEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response
) => {
    const query = req.body.query;
    try {
        const { data, error } = searchEntityService(query);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const searchPostsEntityHandler = (
    req: Request<{}, {}, SearchRequestPageBodyParams>,
    res: Response
) => {
    const length = req.body.length;
    const offset = req.body.offset;
    const timestamp = req.body.timestamp;
    const query = req.body.query;
    try {
        const { data, error } = searchPostsEntityService(
            length,
            offset,
            timestamp,
            query
        );
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const searchAccountsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response
) => {
    const query = req.body.query;
    try {
        const { data, error } = searchAccountsEntityService(query);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const searchAudiosEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response
) => {
    const query = req.body.query;
    try {
        const { data, error } = searchAudiosEntityService(query);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const searchHashtagsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response
) => {
    const query = req.body.query;
    try {
        const { data, error } = searchHashtagEntityService(query);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const searchLocationsEntityHandler = (
    req: Request<{}, {}, SearchRequestBodyParams>,
    res: Response
) => {
    const query = req.body.query;
    try {
        const { data, error } = searchLocationEntityService(query);
        if (error === undefined)
            return res.status(HttpStatusCodes.OK).json(data);
        throw error;
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
