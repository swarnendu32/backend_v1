import { generatePostResponses } from "../../mock";
import { PaginatedPostResponseBodyParams } from "../../types";

export function exploreFeedService(
    length: number,
    offset: number,
    timestamp: number
): PaginatedPostResponseBodyParams {
    const postData = generatePostResponses(
        length,
        undefined,
        true,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        true,
        true,
        undefined,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    );

    return {
        data: {
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
            },
        },
        error: undefined,
    };
}

export function explorePhotosFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): PaginatedPostResponseBodyParams<{ postId: string }> {
    const postData = generatePostResponses(
        length,
        "photo",
        true,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        true,
        true,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        true
    );

    return {
        data: {
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        },
        error: undefined,
    };
}

export function exploreVideosFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): PaginatedPostResponseBodyParams<{ postId: string }> {
    const postData = generatePostResponses(
        length,
        "video",
        true,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        true,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    );

    return {
        data: {
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        },
        error: undefined,
    };
}

export function exploreMomentsFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): PaginatedPostResponseBodyParams<{ postId: string }> {
    const postData = generatePostResponses(
        length,
        "moments",
        true,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        true,
        true,
        undefined,
        true,
        true,
        undefined,
        true,
        true,
        true,
        true
    );

    return {
        data: {
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        },
        error: undefined,
    };
}
