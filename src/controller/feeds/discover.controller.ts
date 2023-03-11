import { Request, Response } from "express";
import {
    PageRequestBodyParams,
    PageRequestParams,
    PageResponseParams,
} from "../../types";

export const discoverForYouFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    const length = req.body;
    const offset = req.body;
    const timestamp = req.body;
    try {
    } catch {}
};

export const discoverPopularFeedDataHandler = (
    req: Request,
    res: Response
) => {};

export const discoverNewFeedDataHandler = (req: Request, res: Response) => {};

export const discoverNearByFeedDataHandler = (
    req: Request,
    res: Response
) => {};
