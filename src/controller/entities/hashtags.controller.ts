import { NextFunction, Request, Response } from "express";
import { HashTagAndLocationUrlParams } from "../../types";

/**
 * @name getHashTagDetails
 * @url /entities/hashtags/{name}
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<HashTagRouteResponseParams, HashTagAndLocationUrlParams>
 * @description get the details of the target hashtag
 */

export const getHashTagDetails = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const name = req.params.name;
    } catch (e: any) {}
};

/**
 * @name getHashTagAllPosts
 * @url /entities/hashtags/{name}/posts
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get all post paginations
 */

export const getHashTagAllPosts = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getHashTagPhotoPosts
 * @url /entities/hashtags/{name}/posts/photos
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get photo post paginations
 */

export const getHashTagPhotos = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getHashTagVideoPosts
 * @url /entities/hashtags/{name}/posts/videos
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get video post paginations
 */

export const getHashTagVideos = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getHashTagMomentsPosts
 * @url /entities/hashtags/{name}/posts/moments
 * @method GET
 * @param HashTagAndLocationUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, HashTagAndLocationUrlParams>
 * @description get moments post paginations
 */

export const getHashTagMoments = (
    req: Request<HashTagAndLocationUrlParams>,
    res: Response,
    next: NextFunction
) => {};
