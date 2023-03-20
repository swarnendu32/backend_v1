import { generateAccountResponses } from "../../mock";
import { AccountResponseParams, PageResponseParams } from "../../types";

export function discoverForYouFeedService(
    length: number,
    offset: number,
    timestamp: number
): PageResponseParams<AccountResponseParams> | undefined {
    try {
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

export function discoverPopularFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PageResponseParams<AccountResponseParams> | undefined {
    try {
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

export function discoverNewFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PageResponseParams<AccountResponseParams> | undefined {
    try {
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

export function discoverNearByFeedService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): PageResponseParams<AccountResponseParams> | undefined {
    try {
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
