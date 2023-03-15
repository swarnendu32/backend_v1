import { generatePostResponses, generateSearchResponses } from "../../mock";
import {
    PaginatedPostSearchResponseBodyParams,
    SearchResponseBodyParams,
} from "../../types";

export function searchEntityService(query: string): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        10,
        true,
        true,
        true,
        true,
        true
    );
    return {
        data: {
            query: query,
            results: searchResults,
        },
        error: undefined,
    };
}

export function searchPostsEntityService(
    length: number,
    offset: number,
    timestamp: number,
    query: string
): PaginatedPostSearchResponseBodyParams {
    const postData = generatePostResponses(
        length,
        undefined,
        true,
        true,
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
                query: query,
            },
        },
        error: undefined,
    };
}

export function searchAccountsEntityService(
    query: string
): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        true
    );
    return {
        data: {
            query: query,
            results: searchResults,
        },
        error: undefined,
    };
}

export function searchAudiosEntityService(
    query: string
): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        10,
        undefined,
        undefined,
        undefined,
        true,
        undefined
    );
    return {
        data: {
            query: query,
            results: searchResults,
        },
        error: undefined,
    };
}

export function searchHashtagEntityService(
    query: string
): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        10,
        undefined,
        true,
        undefined,
        undefined,
        undefined
    );
    return {
        data: {
            query: query,
            results: searchResults,
        },
        error: undefined,
    };
}

export function searchLocationEntityService(
    query: string
): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        10,
        undefined,
        undefined,
        true,
        undefined,
        undefined
    );
    return {
        data: {
            query: query,
            results: searchResults,
        },
        error: undefined,
    };
}
