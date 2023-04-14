/**
 * @name getAudioDetails
 * @url /entities/audio/{audio-id}
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<AudioRouteResponseParams, AudioUrlParams>
 * @description get the details of the target audio
 */

/**
 * @name getAudioPhotoPosts
 * @url /entities/audios/{audio-id}/posts/photos
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, AudioUrlParams>
 * @description get photo post paginations
 */

/**
 * @name getAudioMomentsPosts
 * @url /entities/audios/{audio-id}/posts/moments
 * @method GET
 * @param AudioUrlParams
 * @response ResponseBodyParams<PostPageResponseParams, AudioUrlParams>
 * @description get moments post paginations
 */

/**
 * @name audioSave
 * @url /entities/audio/{audio-id}/saves
 * @method PUT
 * @param AudioUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, AudioUrlParams, BooleanRequestBodyParams>
 * @description save or unsave the target audio
 */
