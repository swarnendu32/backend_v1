import { generatePostResponse, generatePostResponses } from "../../mock";
import {
    PaginatedPostResponseBodyParams,
    PostResponseParams,
} from "../../types";

export function foryouPhotosService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): any {
    const data = generatePostResponses(
        length,
        "photo",
        true,
        false,
        true,
        false,
        undefined,
        undefined,
        undefined,
        undefined
    );
    return { data: { list: data, meta: { hasMorePages: true } } };
}
