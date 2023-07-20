import ErrorCodes from "../../constants/ErrorCodes";
import {
  generateAccountResponses,
  generateAudioResponse,
  generatePostResponses,
} from "../../mock";
import { videosData } from "../../mock/data/videos";
import {
  AppError,
  HttpStatusCodes,
  PostPageResponseBodyParams,
} from "../../types";
import randomNumberGenerator from "../../utils/randomNumber";

export function foryouPhotosFeedService(
  limit: number,
  offset: number,
  timestamp: number
): PostPageResponseBodyParams | undefined {
  try {
    const postResult = generatePostResponses(
      limit,
      "photo",
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
      undefined,
      undefined,
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
          type: "photo",
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

export function foryouVideosFeedService(
  limit: number,
  offset: number,
  timestamp: number
): PostPageResponseBodyParams | undefined {
  try {
    const postResult = generatePostResponses(
      limit,
      "video",
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
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
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
          type: "video",
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

export function foryouMomentsFeedService(
  limit: number,
  offset: number,
  timestamp: number
): PostPageResponseBodyParams | undefined {
  try {
    const postResult = generatePostResponses(
      limit,
      "moments",
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
      undefined,
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
          type: "video",
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
