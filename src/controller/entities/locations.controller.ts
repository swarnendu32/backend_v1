import { NextFunction, Request, Response } from "express";
import { HashTagAndLocationUrlParams } from "../../types";

/**
 * @name getLocationDetails
 * @url /entities/locations/{name}
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<LocationRouteResponseParams, HashTagAndLocationUrlParams>
 * @description get the details of the target location
 */

export const getLocationDetailsHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getLocationAllPosts
 * @url /entities/locations/{name}/posts
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get all post paginations
 */

export const getLocationAllPostsHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getLocationPhotoPosts
 * @url /entities/locations/{name}/posts/photos
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get photo post paginations
 */

export const getLocationPhotosHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getLocationVideoPosts
 * @url /entities/locations/{name}/posts/videos
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get video post paginations
 */

export const getLocationVideosHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getLocationMomentsPosts
 * @url /entities/locations/{name}/posts/moments
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get moments post paginations
 */

export const getLocationMomentsHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getLocationTaggedAccounts
 * @url /entities/locations/{name}/accounts
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<AccountPageResponseParams, HashTagAndLocationUrlParams>
 * @description get tagged accounts paginations
 */

export const getLocationTaggedAccountsHandler = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};
