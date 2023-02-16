import {
  AccountResponseParams,
  AudioResponseParams,
  CommentResponseParams,
  MediaType,
  PostResponseParams,
  ReplyResponseParams,
} from "../types";

/**
 * @description generates a fake account response on the fly
 * @returns an account response object
 */
export function generateAccountResponse(): AccountResponseParams {
  return {} as AccountResponseParams;
}

/**
 * @description generates a list of fake account response
 * @argument count: number of account to return
 * @returns an array of account response object of the specified length
 */
export function generateAccountResponses(
  count: number
): AccountResponseParams[] {
  return [];
}

/**
 * @description generates a fake post response on the fly
 * @argument type : to specify the media type of the post, it will be randomly choosen if not provided
 * @argument isMoment: to specify if the video if choosen is a moment or normal, choosen randomly in case not provided and media type is video
 * @returns a post response object
 */
export function generatePostResponse(
  type?: MediaType,
  isMoment?: boolean
): PostResponseParams {
  return {} as PostResponseParams;
}

/**
 * @description generates a list of fake post data
 * @argument count: number of post to return
 * @argument type : to specify the media type of the post, it will be randomly choosen if not provided
 * @argument isMoment: to specify if the video if choosen is a moment or normal, choosen randomly in case not provided and media type is video
 * @returns an array of post response object of the specified length
 */
export function generatePostResponses(
  count: number,
  type?: MediaType,
  isMoment?: boolean
) {
  return [];
}

/**
 * @description generates a fake reply response on the fly
 * @returns a reply response object
 */
export function generateReplyResponse(): ReplyResponseParams {
  return {} as ReplyResponseParams;
}

/**
 * @description generates a list of fake reply response
 * @argument count: number of reply to return
 * @returns an array of reply response object of the specified length
 */
export function generateReplyResponses(count: number): ReplyResponseParams[] {
  return [];
}

/**
 * @description generates a fake comment response on the fly
 * @returns a comment response object
 */
export function generateCommentResponse(): CommentResponseParams {
  return {} as CommentResponseParams;
}

/**
 * @description generates a list of fake comment response
 * @argument count: number of comments to return
 * @returns an array of comment response object of the specified length
 */
export function generateCommentResponses(
  count: number
): CommentResponseParams[] {
  return [];
}

/**
 * @description generates a fake audio response on the fly
 * @returns an audio response object
 */
export function generateAudioResponse(): AudioResponseParams {
  return {} as AudioResponseParams;
}

/**
 * @description generates a list of fake audio response
 * @argument count: number of audio to return
 * @returns an array of audio response object of the specified length
 */
export function generateAudioResponses(count: number): AudioResponseParams[] {
  return [];
}
