import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
  homeFeedMemoriesService,
  homeFeedPostsService,
  homeFeedService,
} from "../../services/feeds/home.services";
import {
  PageRequestBodyParams,
  PartialPageRequestBodyParams,
} from "../../types";
import AppError from "../../utils/app-error";

export const homeFeedDataHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = homeFeedService();
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

export const homeFeedPostsDataHandler = (
  req: Request<{}, {}, PartialPageRequestBodyParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.body.page === undefined ? 10 : req.body.page.limit;
    const offset = req.body.page === undefined ? 0 : req.body.page.offset;
    const timestamp =
      req.body.page === undefined ? Date.now() : req.body.page.timestamp;
    const result = homeFeedPostsService(limit, offset, timestamp);
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

export const homeFeedMemoriesDataHandler = (
  req: Request<{}, {}, PartialPageRequestBodyParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.body.page === undefined ? 10 : req.body.page.limit;
    const offset = req.body.page === undefined ? 0 : req.body.page.offset;
    const timestamp =
      req.body.page === undefined ? Date.now() : req.body.page.timestamp;
    const result = homeFeedMemoriesService(limit, offset, timestamp);
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
