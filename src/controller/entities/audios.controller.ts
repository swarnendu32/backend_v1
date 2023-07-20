import { NextFunction, Request, Response } from "express";
import { AudioUrlParams } from "../../types";

/**
 * @name getAudioDetails
 * @url /entities/audio/{audio-id}
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<AudioRouteResponseParams, AudioUrlParams>
 * @description get the details of the target audio
 */

export const getAudioDetailsHandler = (
    req: Request<AudioUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getAudioPhotoPosts
 * @url /entities/audios/{audio-id}/posts/photos
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, AudioUrlParams>
 * @description get photo post paginations
 */

export const getAudioPhotosHandler = (
    req: Request<AudioUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name getAudioMomentsPosts
 * @url /entities/audios/{audio-id}/posts/moments
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, AudioUrlParams>
 * @description get moments post paginations
 */

export const getAudioMomentsHandler = (
    req: Request<AudioUrlParams>,
    res: Response,
    next: NextFunction
) => {};

/**
 * @name audioSave
 * @url /entities/audio/{audio-id}/saves
 * @method PUT
 * @param AudioUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, AudioUrlParams, BooleanRequestBodyParams>
 * @description save or unsave the target audio
 */

export const getSaveAudioHandler = (
    req: Request<AudioUrlParams>,
    res: Response,
    next: NextFunction
) => {};
