import {
    generateAccountResponses,
    generatePostResponses,
    generateSearchResponses,
} from "../../mock";
import {
    FeedResponseParams,
    PaginatedPostSearchResponseBodyParams,
    SearchRequestBodyParams,
    SearchResponseBodyParams,
    SearchResultParams,
} from "../../types";

export function searchEntityService(
    query: string
): SearchResultParams | undefined {
    try {
        const searchResults = generateSearchResponses(
            30,
            true,
            true,
            true,
            true,
            true
        );
        return {
            query: query,
            results: searchResults,
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function searchPostsEntityService(
    length: number,
    offset: number,
    timestamp: number,
    query: string
): FeedResponseParams<SearchRequestBodyParams> | undefined {
    try {
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
                query: query,
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function searchAccountsEntityService(
    query: string
): SearchResultParams | undefined {
    try {
        const searchResults = generateSearchResponses(
            30,
            undefined,
            undefined,
            undefined,
            undefined,
            true
        );
        return {
            query: query,
            results: searchResults,
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function searchAudiosEntityService(
    query: string
): SearchResponseBodyParams {
    const searchResults = generateSearchResponses(
        30,
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
): SearchResultParams | undefined {
    try {
        const searchResults = generateSearchResponses(
            30,
            undefined,
            true,
            undefined,
            undefined,
            undefined
        );
        return {
            query: query,
            results: searchResults,
        };
    } catch (e: unknown) {
        throw e;
    }
}

export function searchLocationEntityService(
    query: string
): SearchResultParams | undefined {
    try {
        const searchResults = generateSearchResponses(
            10,
            undefined,
            undefined,
            true,
            undefined,
            undefined
        );
        return {
            query: query,
            results: searchResults,
        };
    } catch (e: unknown) {
        throw e;
    }
}
