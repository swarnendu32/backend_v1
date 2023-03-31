import { NextFunction, Request, Response } from "express";
import {
    deletePostService,
    getPostService,
    postDeleteCommentService,
    postDeleteReplyService,
    postGetCommentsService,
    postGetFollowingLikesService,
    postGetLikesService,
    postLikeCommentService,
    postLikeReplyService,
    postPinCommentService,
    postReportCommentService,
    postReportReplyService,
    postUpdateLikeService,
    postUploadCommentService,
    postUploadReplyService,
    reportPostService,
    savePostsCollectionService,
    savePostService,
} from "../../services/entities/posts.services";
import {
    CollectionRequestQueryParams,
    CommentRequestQueryParams,
    HttpStatusCodes,
    PageRequestBodyParams,
    PartialSearchRequestBodyParams,
    PostRequestQueryParams,
    ReplyRequestQueryParams,
    ReportRequestBodyParams,
    TextRequestBodyParams,
} from "../../types";

export const deletePostHandler = async (
    req: Request<PostRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const result = await deletePostService(postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params as any,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const reportPostHandler = async (
    req: Request<PostRequestQueryParams, {}, ReportRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const category = req.body.category;
        const reason = req.body.reason;
        const description = req.body.description;
        const result = await reportPostService(
            postId,
            category,
            reason,
            description
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params as any,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postUpdateLikeHandler = async (
    req: Request<PostRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const result = await postUpdateLikeService(postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params as any,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postGetLikesHandler = async (
    req: Request<PostRequestQueryParams, {}, PartialSearchRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const queryString = req.body.queryString;
        const result = await postGetLikesService(postId, queryString);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postGetFollowingLikesHandler = async (
    req: Request<PostRequestQueryParams, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const postId = req.params.postId;
        const result = await postGetFollowingLikesService(
            postId,
            limit,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postUploadCommentHandler = async (
    req: Request<PostRequestQueryParams, {}, TextRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = req.body.content;
        const postId = req.params.postId;
        const result = await postUploadCommentService(postId, content);
        return res.status(HttpStatusCodes.CREATED).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postLikeCommentHandler = async (
    req: Request<CommentRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comentId = req.params.commentId;
        const postId = req.params.postId;
        const result = await postLikeCommentService(postId, comentId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postPinCommentHandler = async (
    req: Request<CommentRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comentId = req.params.commentId;
        const postId = req.params.postId;
        const result = await postPinCommentService(postId, comentId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postReportCommentHandler = async (
    req: Request<CommentRequestQueryParams, {}, ReportRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comentId = req.params.commentId;
        const postId = req.params.postId;
        const reason = req.body.reason;
        const description = req.body.description;
        const category = req.body.category;
        const result = await postReportCommentService(
            postId,
            comentId,
            category,
            reason,
            description
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postDeleteCommentHandler = async (
    req: Request<CommentRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const comentId = req.params.commentId;
        const postId = req.params.postId;
        const result = await postDeleteCommentService(postId, comentId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postGetCommentsHandler = async (
    req: Request<PostRequestQueryParams, {}, PageRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const limit = req.body.page === undefined ? 10 : req.body.page.limit;
        const offset = req.body.page === undefined ? 0 : req.body.page.offset;
        const timestamp =
            req.body.page === undefined ? Date.now() : req.body.page.timestamp;
        const result = await postGetCommentsService(
            postId,
            limit,
            offset,
            timestamp
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postUploadReplyHandler = async (
    req: Request<CommentRequestQueryParams, {}, TextRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const content = req.body.content;
        const result = await postUploadReplyService(postId, commentId, content);
        return res.status(HttpStatusCodes.CREATED).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postLikeReplyHandler = async (
    req: Request<ReplyRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const replyId = req.params.replyId;
        const result = await postLikeReplyService(postId, commentId, replyId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postReportReplyHandler = async (
    req: Request<ReplyRequestQueryParams, {}, ReportRequestBodyParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const replyId = req.params.replyId;
        const category = req.body.category;
        const reason = req.body.reason;
        const description = req.body.description;
        const result = await postReportReplyService(
            postId,
            commentId,
            replyId,
            category,
            reason,
            description
        );
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const postDeleteReplyHandler = async (
    req: Request<ReplyRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const replyId = req.params.replyId;
        const result = await postDeleteReplyService(postId, commentId, replyId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const savePostHandler = async (
    req: Request<PostRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const result = await savePostService(postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const savePostsCollectionHandler = async (
    req: Request<CollectionRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const collectionName = req.params.collectionName;
        const result = await savePostsCollectionService(postId, collectionName);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};

export const getPostHandler = async (
    req: Request<PostRequestQueryParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.postId;
        const result = await getPostService(postId);
        return res.status(HttpStatusCodes.OK).json(result);
    } catch (e: any) {
        let error = {
            meta: {
                status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                timestamp: Date.now(),
                body: req.body,
                params: req.params,
            },
            error: {
                code: e.code,
                message: e.message,
                cause: e.cause,
            },
        };
        return next(error);
    }
};
