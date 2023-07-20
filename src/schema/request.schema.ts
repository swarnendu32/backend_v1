import { z } from "zod";

export const discoverSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z
        .object({
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .strict()
                .optional(),
        })
        .strict(),
});

export const exploreSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z
        .object({
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .strict()
                .optional(),
        })
        .strict(),
});

export const explorePostSchema = z.object({
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
                .strict()
                .optional(),
        })
        .strict(),
});

export const foryouSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z.object({}).strict(),
});

export const homeSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z.object({}).strict(),
});

export const homeFeedSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z
        .object({
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .strict()
                .optional(),
        })
        .strict(),
});

export const searchSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z
        .object({
            queryString: z.string(),
        })
        .strict(),
});

export const pageSearchSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    body: z
        .object({
            queryString: z.string(),
            page: z
                .object({
                    limit: z.number(),
                    offset: z.number(),
                    timestamp: z.number(),
                })
                .strict()
                .optional(),
        })
        .strict(),
});

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
                .strict()
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
                .strict()
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

export const getAudioSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        audioId: z.string(),
    }),
    body: z.object({}).strict(),
});

export const getHashTagAndLocationSchema = z.object({
    header: z.object({
        "content-type": z.literal("application/json"),
    }),
    params: z.object({
        name: z.string(),
    }),
    body: z.object({}).strict(),
});