import { generateAccountResponses } from "../../mock";
import {
    AccountResponseParams,
    PaginatedAccountResponseBodyParams,
} from "../../types";

export function discoverForYouService(
    length: number = 30,
    offset: number = 0,
    timestamp: number = Date.now()
): any {
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
    };
}
