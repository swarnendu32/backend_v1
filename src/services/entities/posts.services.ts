import ErrorCodes from "../../constants/ErrorCodes";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import {
  generateAccountResponses,
  generateCommentResponse,
  generateCommentResponses,
  generatePostResponse,
  generateReplyResponse,
} from "../../mock";
import {
  AccountListResponseBodyParams,
  AccountPagePayload,
  AccountPageResponseBodyParams,
  AppError,
  CollectionRequestQueryParams,
  CommentPageResponseBodyParams,
  CommentRequestQueryParams,
  CommentResponseParams,
  PageRequestBodyParams,
  PartialSearchRequestBodyParams,
  PostRequestQueryParams,
  PostRouteResponseBodyParams,
  ReplyRequestQueryParams,
  ReplyResponseParams,
  ReportRequestBodyParams,
  ResponseBodyParams,
  TextRequestBodyParams,
} from "../../types";
import randomNumberGenerator from "../../utils/randomNumber";

export function deletePostService(
  postId: string
): ResponseBodyParams<never, PostRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function reportPostService(
  postId: string,
  category: string,
  reason: string,
  description?: string
):
  | ResponseBodyParams<never, PostRequestQueryParams, ReportRequestBodyParams>
  | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
        body: {
          category: category,
          reason: reason,
          description: description,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postUpdateLikeService(
  postId: string
): ResponseBodyParams<never, PostRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postGetLikesService(
  postId: string,
  queryString?: string
):
  | AccountListResponseBodyParams<
      PostRequestQueryParams,
      PartialSearchRequestBodyParams
    >
  | undefined {
  try {
    // Data base call

    const result = generateAccountResponses(
      randomNumberGenerator(10, 30),
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      true,
      true,
      undefined
    );
    return {
      payload: result,
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
        body: { queryString: queryString },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postGetFollowingLikesService(
  postId: string,
  limit: number,
  offset: number,
  timestamp: number
): AccountPageResponseBodyParams<PostRequestQueryParams> | undefined {
  try {
    // Data base call

    const result = generateAccountResponses(
      randomNumberGenerator(10, 30),
      true,
      true,
      undefined,
      undefined,
      undefined,
      true,
      true,
      undefined
    );
    return {
      payload: { hasMorePages: true, data: result },
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
        body: {
          page: {
            limit: limit,
            offset: offset,
            timestamp: timestamp,
          },
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postUploadCommentService(
  postId: string,
  content: string
):
  | ResponseBodyParams<
      CommentResponseParams,
      PostRequestQueryParams,
      TextRequestBodyParams
    >
  | undefined {
  try {
    // Data base call

    const result = generateCommentResponse(
      undefined,
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
      payload: result,
      meta: {
        status: HttpStatusCodes.CREATED,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
        body: { content: content },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postLikeCommentService(
  postId: string,
  commentId: string
): ResponseBodyParams<never, CommentRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postPinCommentService(
  postId: string,
  commentId: string
): ResponseBodyParams<never, CommentRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postReportCommentService(
  postId: string,
  commentId: string,
  category: string,
  reason: string,
  description?: string
):
  | ResponseBodyParams<
      never,
      CommentRequestQueryParams,
      ReportRequestBodyParams
    >
  | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
        },
        body: {
          category: category,
          reason: reason,
          description: description,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postDeleteCommentService(
  postId: string,
  commentId: string
): ResponseBodyParams<never, CommentRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postGetCommentsService(
  postId: string,
  limit: number,
  offset: number,
  timestamp: number
): CommentPageResponseBodyParams | undefined {
  try {
    // Data base call

    const result = generateCommentResponses(
      limit,
      undefined,
      true,
      true,
      undefined,
      undefined,
      undefined,
      true,
      true,
      undefined
    );
    return {
      payload: { data: result, hasMorePages: true },
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
        body: {
          page: {
            limit: limit,
            offset: offset,
            timestamp: timestamp,
          },
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postUploadReplyService(
  postId: string,
  commentId: string,
  content: string
):
  | ResponseBodyParams<
      ReplyResponseParams,
      CommentRequestQueryParams,
      TextRequestBodyParams
    >
  | undefined {
  try {
    // Data base call

    const result = generateReplyResponse(
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
      payload: result,
      meta: {
        status: HttpStatusCodes.CREATED,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
        },
        body: {
          content: content,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postLikeReplyService(
  postId: string,
  commentId: string,
  replyId: string
): ResponseBodyParams<never, ReplyRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
          replyId: replyId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postReportReplyService(
  postId: string,
  commentId: string,
  replyId: string,
  category: string,
  reason: string,
  description?: string
):
  | ResponseBodyParams<never, ReplyRequestQueryParams, ReportRequestBodyParams>
  | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
          replyId: replyId,
        },
        body: {
          category: category,
          reason: reason,
          description: description,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function postDeleteReplyService(
  postId: string,
  commentId: string,
  replyId: string
): ResponseBodyParams<never, ReplyRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          commentId: commentId,
          replyId: replyId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function savePostService(
  postId: string
): ResponseBodyParams<never, PostRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function savePostsCollectionService(
  postId: string,
  collectionName: string
): ResponseBodyParams<never, CollectionRequestQueryParams> | undefined {
  try {
    // Data base call

    return {
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
          collectionName: collectionName,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}

export function getPostService(
  postId: string
): PostRouteResponseBodyParams | undefined {
  try {
    // Data base call

    const comments = generateCommentResponses(
      30,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      true,
      undefined
    );
    const post = generatePostResponse(
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    return {
      payload: {
        comments: { data: comments, hasMorePages: true },
        post: post,
      },
      meta: {
        status: HttpStatusCodes.OK,
        timestamp: Date.now(),
        params: {
          postId: postId,
        },
      },
    };
  } catch (error: any) {
    throw {
      code: `${ErrorCodes.SERVER_ERROR}`,
      message: "Internal Server Error",
      cause: "Something went wrong",
    } as AppError;
  }
}
