import { Router } from "express";
import {
    postGetFollowingLikesHandler,
    postGetLikesHandler,
    postGetCommentsHandler,
    postLikeReplyHandler,
    postReportReplyHandler,
    postDeleteReplyHandler,
    savePostHandler,
    savePostsCollectionHandler,
    getPostHandler,
    deletePostHandler,
    reportPostHandler,
    postUpdateLikeHandler,
    postUploadCommentHandler,
    postLikeCommentHandler,
    postPinCommentHandler,
    postReportCommentHandler,
    postDeleteCommentHandler,
    postUploadReplyHandler,
} from "../../controller/entities/posts.controller";
import methodHandler from "../../middleware/methodHandler";
import validator from "../../middleware/validateResource";
import {
    postGetFollowingLikesSchema,
    postUpdateLikeSchema,
    postLikeReplySchema,
    postReportReplySchema,
    postDeleteReplySchema,
    savePostSchema,
    savePostsCollectionSchema,
    getPostSchema,
    deletePostSchema,
    reportPostSchema,
    postGetLikesSchema,
    postUploadCommentSchema,
    postLikeCommentSchema,
    postPinCommentSchema,
    postReportCommentSchema,
    postDeleteCommentSchema,
    postGetCommentsSchema,
    postUploadReplySchema,
} from "../../schema/request.schema";

export const postsRouter = Router();

postsRouter
    .route("/:postId/delete")
    .delete(validator(deletePostSchema), deletePostHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/report")
    .put(validator(reportPostSchema), reportPostHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/likes")
    .put(validator(postUpdateLikeSchema), postUpdateLikeHandler)
    .get(validator(postGetLikesSchema), postGetLikesHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/likes/followings")
    .get(validator(postGetFollowingLikesSchema), postGetFollowingLikesHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments")
    .post(validator(postUploadCommentSchema), postUploadCommentHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/likes")
    .put(validator(postLikeCommentSchema), postLikeCommentHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/pin")
    .put(validator(postPinCommentSchema), postPinCommentHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/report")
    .put(validator(postReportCommentSchema), postReportCommentHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/delete")
    .delete(validator(postDeleteCommentSchema), postDeleteCommentHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments")
    .get(validator(postGetCommentsSchema), postGetCommentsHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/replies")
    .post(validator(postUploadReplySchema), postUploadReplyHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/replies/:replyId/likes")
    .put(validator(postLikeReplySchema), postLikeReplyHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/replies/:replyId/report")
    .post(validator(postReportReplySchema), postReportReplyHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/comments/:commentId/replies/:replyId/delete")
    .delete(validator(postDeleteReplySchema), postDeleteReplyHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/save")
    .put(validator(savePostSchema), savePostHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId/save/:collectionName")
    .put(validator(savePostsCollectionSchema), savePostsCollectionHandler)
    .all(methodHandler);

postsRouter
    .route("/:postId")
    .get(validator(getPostSchema), getPostHandler)
    .all(methodHandler);
