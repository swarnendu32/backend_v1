import ErrorCodes from "../../constants/ErrorCodes";
import { generateAccountResponses } from "../../mock";
import {
    AccountPageResponseBodyParams,
    AppError,
    HttpStatusCodes,
} from "../../types";

export function discoverForYouFeedService(
    limit: number,
    offset: number,
    timestamp: number
): AccountPageResponseBodyParams | undefined {
    try {
        const result = generateAccountResponses(
            limit,
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
                data: result,
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

export function discoverPopularFeedService(
    limit: number,
    offset: number,
    timestamp: number
): AccountPageResponseBodyParams | undefined {
    try {
        const result = generateAccountResponses(
            limit,
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
                data: result,
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

export function discoverNewFeedService(
    limit: number,
    offset: number,
    timestamp: number
): AccountPageResponseBodyParams | undefined {
    try {
        const result = generateAccountResponses(
            limit,
            true,
            undefined,
            undefined,
            undefined,
            undefined,
            true,
            true,
            true
        );
        return {
            payload: {
                data: result,
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

export function discoverNearByFeedService(
    limit: number,
    offset: number,
    timestamp: number
): AccountPageResponseBodyParams | undefined {
    try {
        const result = generateAccountResponses(
            limit,
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
                data: result,
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
