/**
 * @name postView
 * @url /entities/posts/{post-id}/views
 * @method PUT
 * @param PostUrlParams
 * @body PostViewRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, PostViewRequestBodyParams>
 * @description add view to the target post
 */

/**
 * @name postLike
 * @url /entities/posts/{post-id}/likes
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description like or unlike the target post
 */

/**
 * @name postComment
 * @url /entities/posts/{post-id}/comments
 * @method POST
 * @param PostUrlParams
 * @body TextRequestBodyParams
 * @response ResponseBodyParams<CommentResponseParams, PostUrlParams, TextRequestBodyParams>
 * @description add a comment to the target post
 */

/**
 * @name commentLike
 * @url /entities/posts/{post-id}/comments/{comment-id}/likes
 * @method PUT
 * @param CommentUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, CommentUrlParams, BooleanRequestBodyParams>
 * @description like or unlike the target comment
 */

/**
 * @name commentPin
 * @url /entities/posts/{post-id}/comments/{comment-id}/pins
 * @method PUT
 * @param CommentUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, CommentUrlParams, BooleanRequestBodyParams>
 * @description pin or unpin the target comment
 */

/**
 * @name commentDelete
 * @url /entities/posts/{post-id}/comments/{comment-id}/delete
 * @method DELETE
 * @param CommentUrlParams
 * @response ResponseBodyParams<undefined, CommentUrlParams>
 * @description delete the target comment
 */

/**
 * @name postReply
 * @url /entities/posts/{post-id}/comments/{comment-id}
 * @method POST
 * @param CommentUrlParams
 * @body TextRequestBodyParams
 * @response ResponseBodyParams<ReplyResponseParams, CommentUrlParams, TextRequestBodyParams>
 * @description add a reply to the target comment
 */

/**
 * @name replyLike
 * @url /entities/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/likes
 * @method PUT
 * @param ReplyUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, ReplyUrlParams, BooleanRequestBodyParams>
 * @description like or unlike the target comment
 */

/**
 * @name replyDelete
 * @url /entities/posts/{post-id}/comments/{comment-id}/replies/{reply-id}/delete
 * @method DELETE
 * @param ReplyUrlParams
 * @response ResponseBodyParams<undefined, ReplyUrlParams>
 * @description delete the target reply
 */

/**
 * @name postDelete
 * @url /entities/posts/{post-id}/delete
 * @method DELETE
 * @param PostUrlParams
 * @response ResponseBodyParams<undefined, PostUrlParams>
 * @description delete the target post
 */

/**
 * @name postPin
 * @url /entities/posts/{post-id}/pin
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description pin or unpin the target post
 */

/**
 * @name postDisableRemix
 * @url /entities/posts/{post-id}/disableremix
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description enable or disable remixing to the target post
 */

/**
 * @name postHideEngagement
 * @url /entities/posts/{post-id}/hideengagement
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description hides or shows likes and views count of the target post
 */

/**
 * @name postDisableComment
 * @url /entities/posts/{post-id}/disablecomment
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description disable comments on the target post
 */

/**
 * @name postDisableMemorySharing
 * @url /entities/posts/{post-id}/disablememorysharing
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description disable memory sharing of the target post
 */

/**
 * @name postDisableLinkSharing
 * @url /entities/posts/{post-id}/disablelinksharing
 * @method PUT
 * @param PostUrlParams
 * @body BooleanRequestBodyParams
 * @response ResponseBodyParams<undefined, PostUrlParams, BooleanRequestBodyParams>
 * @description disable link sharing of the target post
 */

/**
 * @name getPostDetails
 * @url /entities/posts/{post-id}
 * @method GET
 * @param PostUrlParams
 * @body PostRouteRequestBodyParams
 * @response ResponseBodyParams<PostRouteResponseParams, PostUrlParams, PostRouteRequestBodyParams>
 * @description get the details of the target post
 */

/**
 * @name getComments
 * @url /entities/posts/{post-id}/comments
 * @method GET
 * @param PostUrlParams
 * @body PartialPageRequestBodyParams
 * @response ResponseBodyParams<CommentPageResponseParams, PostUrlParams, PartialPageRequestBodyParams>
 * @description get the comments page of the target post
 */

/**
 * @name getReplies
 * @url /entities/posts/{post-id}/comments/{comment-id}/replies
 * @method GET
 * @param CommentUrlParams
 * @body PartialPageRequestBodyParams
 * @response ResponseBodyParams<ReplyPageResponseParams, CommentUrlParams, PartialPageRequestBodyParams>
 * @description get the reply page of the target comment
 */

/**
 * @name getPostLikes
 * @url /entities/posts/{post-id}/likes
 * @method GET
 * @param PostUrlParams
 * @body PartialPageRequestBodyParams
 * @response ResponseBodyParams<AccountPageResponseParams, PostUrlParams, PartialPageRequestBodyParams>
 * @description get the all likes page of the target post
 */

/**
 * @name getPostFollowingLikes
 * @url /entities/posts/{post-id}/likes/followings
 * @method GET
 * @param PostUrlParams
 * @body PartialPageRequestBodyParams
 * @response ResponseBodyParams<AccountPageResponseParams, PostUrlParams, PartialPageRequestBodyParams>
 * @description get the following account likes page of the target post
 */
