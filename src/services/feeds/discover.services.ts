import { generateAccountResponses } from "../../mock";
import { PaginatedAccountResponseBodyParams } from "../../types";

export function discoverForYouFeedService(
    length: number,
    offset: number,
    timestamp: number
): PaginatedAccountResponseBodyParams {
    const data = generateAccountResponses(
        length,
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
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        },
        error: undefined,
    };
}

export function discoverPopularFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PaginatedAccountResponseBodyParams {
    const data = generateAccountResponses(
        length,
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
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        },
        error: undefined,
    };
}

export function discoverNewFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PaginatedAccountResponseBodyParams {
    const data = generateAccountResponses(
        length,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true
    );
    return {
        data: {
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        },
        error: undefined,
    };
}

export function discoverNearByFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PaginatedAccountResponseBodyParams {
    const data = generateAccountResponses(
        length,
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
            list: data,
            meta: {
                hasMorePages: true,
                timestamp: timestamp,
                offset: offset,
                length: length,
            },
        },
        error: undefined,
    };
}
