import {
    generateAccountResponses,
    generateAudioResponse,
    generatePostResponses,
} from "../../mock";
import { videosData } from "../../mock/data/videos";
import { FeedResponseParams } from "../../types";
import randomNumberGenerator from "../../util/randomNumber";

export function foryouPhotosFeedService(
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams | undefined {
    try {
        const data = generatePostResponses(
            length,
            "photo",
            true,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            false,
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
            undefined
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
                type: "foryou",
                suggestions: accountData,
            },
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function foryouVideosFeedService(
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams | undefined {
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
            false,
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
                type: "foryou",
                suggestions: accountData,
            },
            list: postData,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function foryouMomentsFeedService(
    length: number,
    offset: number,
    timestamp: number
): FeedResponseParams | undefined {
    try {
        const data = generatePostResponses(
            length,
            "moments",
            true,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            false,
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
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}
