import { AccountShortResponseParams } from "../../types";
import {
    HashTagAndLocationUrlParams,
    HashTagRouteResponseParams,
    PostResponseParams,
    ResponseBodyParams,
} from "../../types";

export async function getHashtagDetailsService(
    name: string
): Promise<HashTagRouteResponseParams> {
    try {
        return {
            allPosts: {
                suggestedAccount: {
                    data: {} as AccountShortResponseParams[],
                    type: "foryou",
                },
                data: {} as PostResponseParams[],
                hasMorePages: true,
                limit: 30,
                offset: 0,
                timestampUpperLimit: 1,
            },
            name: name,
            noOfPosts: 1,
        };
    } catch (e: any) {
        throw Error();
    }
}
