import { z } from "zod";

export const deletePostSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const reportPostSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z
        .object({
            category: z.string(),
            reason: z.string(),
            description: z.string().optional(),
        })
        .strict(),
});

export const postUpdateLikeSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const postGetLikesSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z
        .object({
            queryString: z.string().optional(),
        })
        .strict(),
});

export const postGetFollowingLikesSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z
        .object({
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .optional(),
        })
        .strict(),
});

export const postUploadCommentSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z
        .object({
            content: z.string(),
        })
        .strict(),
});

export const postLikeCommentSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const postPinCommentSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const postReportCommentSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
    }),
    body: z
        .object({
            category: z.string(),
            reason: z.string(),
            description: z.string().optional(),
        })
        .strict(),
});

export const postDeleteCommentSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const postGetCommentsSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z
        .object({
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .optional(),
        })
        .strict(),
});

export const postUploadReplySchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
    }),
    body: z
        .object({
            content: z.string(),
        })
        .strict(),
});

export const postLikeReplySchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
        replyId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const postReportReplySchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
        replyId: z.string(),
    }),
    body: z
        .object({
            category: z.string(),
            reason: z.string(),
            description: z.string().optional(),
        })
        .strict(),
});

export const postDeleteReplySchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        commentId: z.string(),
        replyId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const savePostSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const savePostsCollectionSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
        collectionName: z.string(),
    }),
    body: z.object({}).strict(),
});

export const getPostSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        postId: z.string(),
    }),
    body: z.object({}).strict(),
});
