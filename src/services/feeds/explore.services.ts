import ErrorCodes from "../../constants/ErrorCodes";
import { generateAccountResponses, generatePostResponses } from "../../mock";
import {
    AppError,
    HttpStatusCodes,
    PostPageResponseBodyParams,
    PostRequestQueryParams,
} from "../../types";

export function exploreFeedService(
    limit: number,
    offset: number,
    timestamp: number
): PostPageResponseBodyParams | undefined {
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
            undefined,
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

export function explorePostFeedService(
    postId: string,
    limit: number,
    offset: number,
    timestamp: number
): PostPageResponseBodyParams<PostRequestQueryParams> {
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
            undefined,
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
                postSuggestions: {
                    suggestions: postResult,
                    type: "moments",
                },
            },
            meta: {
                status: HttpStatusCodes.OK,
                timestamp: Date.now(),
                params: { postId: postId },
                body: {
                    page: {
                        limit: limit,
                        offset: offset,
                        timestamp: timestamp,
                    },
                },
            },
        };
    } catch (e: unknown) {
        throw e;
    }
}
