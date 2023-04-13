import ErrorCodes from "../../constants/ErrorCodes";
import {
    generateAccountResponses,
    generateAudioResponses,
    generateHashTagLocationResponses,
    generatePostResponses,
    generateSearchResponses,
} from "../../mock";
import {
    AccountListSearchResponseBodyParams,
    AppError,
    AudioListSearchResponseBodyParams,
    HashTagAndLocationListSearchResponseBodyParams,
    HttpStatusCodes,
    PostSearchResponseBodyParams,
    SearchResponseBodyParams,
} from "../../types";

export function searchEntityService(
    queryString: string
): SearchResponseBodyParams | undefined {
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
            payload: searchResults,
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
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

export function searchPostsEntityService(
    limit: number,
    offset: number,
    timestamp: number,
    queryString: string
): PostSearchResponseBodyParams | undefined {
    try {
        const postResult = generatePostResponses(
            limit,
            undefined,
            true,
            undefined,
            undefined,
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
            3,
            true,
            undefined,
            undefined,
            undefined,
            true,
            true,
            true,
            true
        );
        return {
            payload: {
                postPage: { data: accountResult, hasMorePages: false },
                postSuggestions: { suggestions: postResult, type: "moments" },
            },
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
                    page: {
                        offset: offset,
                        limit: limit,
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

export function searchAccountsEntityService(
    queryString: string
): AccountListSearchResponseBodyParams | undefined {
    try {
        const accountResults = generateAccountResponses(
            30,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            true,
            true,
            undefined
        );
        return {
            payload: accountResults,
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
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

export function searchAudiosEntityService(
    queryString: string
): AudioListSearchResponseBodyParams {
    try {
        const audioResults = generateAudioResponses(
            30,
            undefined,
            undefined,
            undefined,
            undefined,
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
            payload: audioResults,
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
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

export function searchHashtagEntityService(
    queryString: string
): HashTagAndLocationListSearchResponseBodyParams | undefined {
    try {
        const searchResults = generateHashTagLocationResponses();
        return {
            payload: searchResults,
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
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

export function searchLocationEntityService(
    queryString: string
): HashTagAndLocationListSearchResponseBodyParams | undefined {
    try {
        const searchResults = generateHashTagLocationResponses();
        return {
            payload: searchResults,
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                body: {
                    queryString: queryString,
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
