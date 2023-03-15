import {
    HomeFeedResponseBodyParams,
    PaginatedAccountResponseBodyParams,
    PaginatedPostResponseBodyParams,
} from "./../../types";
import {
    generateAccountResponses,
    generatePostResponses,
    generateSearchResponses,
} from "../../mock";

export function homeFeedService(
    length: number = 10,
    offset: number = 0,
    timestamp: number = Date.now()
): HomeFeedResponseBodyParams {
    const accountData = generateAccountResponses(
        length,
        true,
        undefined,
        true,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        true
    );

    const postData = generatePostResponses(
        length,
        undefined,
        true,
        undefined,
        true,
        true,
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

    const searchData = generateSearchResponses(
        10,
        true,
        undefined,
        undefined,
        undefined,
        undefined
    );

    return {
        data: {
            memoryPage: {
                list: accountData,
                meta: {
                    hasMorePages: true,
                    length: length,
                    offset: offset,
                    timestamp: timestamp,
                },
            },
            postPage: {
                list: postData,
                meta: {
                    hasMorePages: true,
                    length: length,
                    offset: offset,
                    timestamp: timestamp,
                },
            },
            searchHistory: searchData,
        },
        error: undefined,
    };
}

export function homeFeedPostsService(
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
        true,
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

    const accountData = generateAccountResponses(
        10,
        true,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true
    );

    return {
        data: {
            accountSuggestions: {
                type: "foryou",
                suggestions: accountData,
            },
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

export function homeFeedMemoriesService(
    length: number,
    offset: number,
    timestamp: number
): PaginatedAccountResponseBodyParams {
    const accountData = generateAccountResponses(
        length,
        undefined,
        undefined,
        true,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        true
    );
    return {
        data: {
            list: accountData,
            meta: {
                hasMorePages: true,
                length: length,
                offset: offset,
                timestamp: timestamp,
            },
        },
    };
}
