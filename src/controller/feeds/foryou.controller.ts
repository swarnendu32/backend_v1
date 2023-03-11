import { Request, Response } from "express";
import { PageRequestBodyParams } from "../../types";

export const foryouPhotosFeedDataHandler = (
    req: Request<{}, {}, PageRequestBodyParams>,
    res: Response
) => {
    req.body;
    try {
    } catch {}
};

export const foryouVideosFeedDataHandler = (req: Request, res: Response) => {};

export const foryouMomenstFeedDataHandler = (req: Request, res: Response) => {};
