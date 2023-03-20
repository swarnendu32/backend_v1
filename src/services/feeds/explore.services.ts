import {
    generateAccountResponses,
    generateAudioResponse,
    generatePostResponses,
} from "../../mock";
import { videosData } from "../../mock/data/videos";
import { FeedResponseParams } from "../../types";
import randomNumberGenerator from "../../util/randomNumber";

export function exploreFeedService(
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams | undefined {
    try {
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
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function explorePhotosFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams<{ postId: string }> {
    try {
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
        const accountData = generateAccountResponses(
            3,
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
            accountSuggestions: {
                suggestions: accountData,
                type: "foryou",
            },
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function exploreVideosFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams<{ postId: string }> {
    try {
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
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function exploreMomentsFeedService(
    postId: string,
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams<{ postId: string }> {
    try {
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
        const audioData = generateAudioResponse(
            undefined,
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
            undefined,
            undefined,
            undefined
        );
        return {
            audioSuggestion: {
                audio: audioData,
                mediaUri:
                    videosData[randomNumberGenerator(0, videosData.length - 1)]
                        .url,
            },
            list: postData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
                postId: postId,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}
