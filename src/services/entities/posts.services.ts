import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
    AppError,
    PostRequestQueryParams,
    ResponseBodyParams,
} from "../../types";

export function postUpdateLikesService(
    postId: string
): ResponseBodyParams<never, PostRequestQueryParams> | undefined {
    try {
        // Data base call
        return {
            payload: undefined,
            meta: {
                status: HttpStatusCodes.OK,
                postId: postId,
                timestamp: Date.now(),
            },
        };
    } catch (error) {
        throw {
            code: `${ErrorCodes.SERVER_ERROR}`,
            message: "Internal Server Error",
            cause: "Something went wrong",
        } as AppError;
    }
}
