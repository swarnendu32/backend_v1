import {
    AccountPageResponseBodyParams,
    AppError,
    HomeRouteResponseBodyParams,
    HttpStatusCodes,
    PostPageResponseBodyParams,
} from "./../../types";
import {
    generateAccountResponses,
    generatePostResponses,
    generateSearchResponses,
} from "../../mock";
import ErrorCodes from "../../constants/ErrorCodes";

export function homeFeedService(
    limit: number = 10,
    offset: number = 0,
    timestamp: number = Date.now()
): HomeRouteResponseBodyParams {
    try {
        const accountResult = generateAccountResponses(
            limit,
            undefined,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            true,
            undefined
        );

        const postResult = generatePostResponses(
            limit,
            undefined,
            undefined,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            true,
            undefined,
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

        const searchResult = generateSearchResponses(
            10,
            true,
            undefined,
            undefined,
            undefined,
            undefined
        );

        return {
            payload: {
                activeAccountInfo: accountResult[0],
                followingAccountPage: {
                    data: accountResult,
                    hasMorePages: false,
                },
                postPage: {
                    postPage: {
                        data: accountResult,
                        hasMorePages: false,
                    },
                    postSuggestions: {
                        suggestions: postResult,
                        type: "moments",
                    },
                },
                recentSearches: searchResult,
                suggestedAccountPage: {
                    data: accountResult,
                    hasMorePages: false,
                },
            },
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
            },
        };
    } catch (e: any) {
        throw {
            code: `${ErrorCodes.SERVER_ERROR}`,
            message: "Internal Server Error",
            cause: "Something went wrong",
        } as AppError;
    }
}

export function homeFeedPostsService(
    limit: number,
    offset: number,
    timestamp: number
): PostPageResponseBodyParams | undefined {
    try {
        const postResult = generatePostResponses(
            limit,
            undefined,
            undefined,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            true,
            undefined,
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

        const accountResult = generateAccountResponses(
            limit,
            undefined,
            undefined,
            true,
            undefined,
            undefined,
            undefined,
            true,
            undefined
        );

        return {
            payload: {
                postPage: {
                    data: accountResult,
                    hasMorePages: false,
                },
                postSuggestions: {
                    suggestions: postResult,
                    type: "moments",
                },
            },
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    page: {
                        limit: limit,
                        offset: offset,
                        timestamp: timestamp,
                    },
                },
            },
        };
    } catch (e: any) {
        throw {
            code: `${ErrorCodes.SERVER_ERROR}`,
            message: "Internal Server Error",
            cause: "Something went wrong",
        } as AppError;
    }
}

export function homeFeedMemoriesService(
    limit: number,
    offset: number,
    timestamp: number
): AccountPageResponseBodyParams | undefined {
    try {
        const accountResult = generateAccountResponses(
            limit,
            undefined,
            undefined,
            true,
            true,
            undefined,
            undefined,
            undefined,
            undefined
        );
        return {
            payload: {
                data: accountResult,
                hasMorePages: true,
            },
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    page: {
                        limit: limit,
                        offset: offset,
                        timestamp: timestamp,
                    },
                },
            },
        };
    } catch (e: any) {
        throw {
            code: `${ErrorCodes.SERVER_ERROR}`,
            message: "Internal Server Error",
            cause: "Something went wrong",
        } as AppError;
    }
}
