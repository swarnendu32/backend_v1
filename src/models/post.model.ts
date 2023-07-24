import { ClientSession, ObjectId } from "mongodb";
import {
    isBlocked,
    isPostAvailable,
    postViewStatus,
    privateFollowingStatus,
} from "../utils/dbUtils";
import {
    accountBlocksCollection,
    accountsCollection,
    audioCollection,
    commentLikeCollection,
    commentCollection,
    accountFavouriteCollection,
    accountFollowersCollection,
    hashtagCollection,
    locationCollection,
    memoryCollection,
    memoryViewCollection,
    accountMuteCollection,
    postCollection,
    postFolderCollection,
    postLikeCollection,
    postSaveCollection,
    postViewCollection,
    accountFollowRequestCollection,
} from "./index.model";
import {
    AccountTag,
    Editables,
    GeoLocationInfo,
    LocationTag,
    TextContent,
} from "../types/util.type";
import { Memory } from "../types/collections/memory.type";
import { PostContent } from "../types/util.type";
import { CommentResponse } from "../types/responses/comment.response";
import { PostResponse } from "../types/responses/post.response";
import AppError from "../utils/app-error";
import { StatusCode } from "../types/status-codes";
import { ErrorCode } from "../types/error-codes";

export async function postUpload(
    session: ClientSession,
    accountId: string,
    uploadedFrom: GeoLocationInfo,
    content: PostContent,
    hideEngagementCount: boolean,
    commentSetting: "disabled" | "following" | "all",
    disableCirculation: boolean,
    disableSharing: boolean,
    postMeta: TextContent,
    caption?: string,
    accountTags?: AccountTag[],
    location?: LocationTag,
    audioId?: string
) {
    let account = await accountsCollection.findOne({
        _id: new ObjectId(accountId),
        deletedAt: { $exists: false },
    });
    if (account) {
        await postCollection.insertOne(
            {
                createdBy: new ObjectId(accountId),
                createdAt: new Date(),
                isPinned: false,
                createdFrom: uploadedFrom,
                caption: caption,
                taggedLocation: location,
                taggedAccounts: accountTags,
                usedAudio: new ObjectId(audioId),
                content: content,
                advancedOptions: {
                    hideEngagementCount: hideEngagementCount,
                    commentSetting: commentSetting,
                    disableCirculation: disableCirculation,
                    disableSharing: disableSharing,
                },
                engagementSummary: {
                    noOfLikes: 0,
                    noOfCirculations: 0,
                    noOfComments: 0,
                    noOfSaves: 0,
                    noOfShares: 0,
                    noOfViews: 0,
                },
                meta: postMeta,
            },
            { session }
        );
        if (location) {
            await locationCollection.updateOne(
                { _id: location.id },
                { $inc: { "meta.noOfPostUse": 1 } },
                { session }
            );
        }
        if (caption && postMeta.hashtags) {
            for (let i = 0; i < postMeta.hashtags.length; i++) {
                let hashTagName = postMeta.hashtags[i];
                let hashTag = await hashtagCollection.findOne({
                    name: hashTagName,
                });
                if (hashTag) {
                    await hashtagCollection.updateOne(
                        { name: hashTag },
                        { $inc: { "meta.noOfPostUse": 1 } },
                        { session }
                    );
                } else {
                    await hashtagCollection.insertOne(
                        {
                            name: hashTagName,
                            createdAt: new Date(),
                            meta: {
                                noOfPostUse: 1,
                                noOfMemoryUse: 0,
                                noOfCommentUse: 0,
                                noOfBioUse: 0,
                                noOfMessageUse: 0,
                                noOfVisits: 0,
                                noOfSearches: 0,
                            },
                        },
                        { session }
                    );
                }
            }
        }
        if (audioId) {
            await audioCollection.updateOne(
                { _id: new ObjectId(audioId) },
                { $inc: { "meta.noOfPostUse": 1 } },
                { session }
            );
        }
    }
}

export async function postEdit(
    session: ClientSession,
    postId: string,
    accountId: string,
    items: Editables
) {
    let post = await postCollection.findOne({
        _id: new ObjectId(postId),
        createdby: new ObjectId(accountId),
        deletedAt: { $exists: false },
    });
    if (post) {
        if (items.location !== undefined) {
            if (items.location !== post.taggedLocation) {
                let taggedLocation = await postCollection.updateOne(
                    {
                        _id: new ObjectId(postId),
                        createdBy: new ObjectId(accountId),
                        deletedAt: { $exists: false },
                    },
                    {
                        $set: {
                            taggedLocation: items.location,
                        },
                    }
                );
                if (!taggedLocation.modifiedCount) {
                    console.log("Post has been deleted");
                    return;
                }
                await locationCollection.updateOne(
                    { _id: new ObjectId(items.location.id) },
                    {
                        $inc: {
                            "meta.noOfPostUses": 1,
                        },
                    },
                    { session }
                );
            }
        } else {
            let taggedLocation = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    deletedAt: { $exists: false },
                },
                {
                    $set: {
                        taggedLocation: items.location,
                    },
                }
            );
            if (!taggedLocation.modifiedCount) {
                console.log("Post has been deleted");
                return;
            }
        }
        if (items.caption !== undefined) {
            if (post.caption !== items.caption) {
                let postCaption = await postCollection.updateOne(
                    {
                        _id: new ObjectId(postId),
                        createdBy: new ObjectId(accountId),
                        deletedAt: { $exists: false },
                    },
                    { $set: { caption: items.caption } },
                    { session }
                );
                if (!postCaption.modifiedCount) {
                    console.log("Post has been deleted");
                    return;
                }
                if (items.meta && items.meta.hashtags) {
                    let newHashTags = new Set<string>();
                    for (let i = 0; i < items.meta.hashtags.length; i++) {
                        let hashTag = items.meta.hashtags[i];
                        let flag = 0;
                        if (post.caption && post.meta.hashtags) {
                            for (
                                let j = 0;
                                j < post.meta.hashtags.length;
                                j++
                            ) {
                                if (hashTag === post.meta.hashtags[j]) {
                                    flag = 1;
                                    break;
                                }
                            }
                        }
                        if (!flag) {
                            newHashTags.add(hashTag);
                        }
                    }
                    for (let i in newHashTags) {
                        let hashTagName = i;
                        let hashTag = await hashtagCollection.findOne({
                            name: hashTagName,
                        });
                        if (hashTag) {
                            await hashtagCollection.updateOne(
                                { name: hashTag },
                                { $inc: { "meta.noOfPostUse": 1 } },
                                { session }
                            );
                        } else {
                            await hashtagCollection.insertOne(
                                {
                                    name: hashTagName,
                                    createdAt: new Date(),
                                    meta: {
                                        noOfPostUse: 1,
                                        noOfMemoryUse: 0,
                                        noOfCommentUse: 0,
                                        noOfBioUse: 0,
                                        noOfMessageUse: 0,
                                        noOfVisits: 0,
                                        noOfSearches: 0,
                                    },
                                },
                                { session }
                            );
                        }
                    }
                }
            }
        } else {
            let postCaption = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    deletedAt: { $exists: false },
                },
                { $set: { caption: items.caption } },
                { session }
            );
            if (!postCaption) {
                console.log("Post has been deleted");
                return;
            }
        }
        if (items.tags !== undefined) {
            let postTags = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    deletedAt: { $exists: false },
                },
                { taggedAcounts: items.tags },
                { session }
            );
            if (!postTags.modifiedCount) {
                console.log("Post has been deleted");
                return;
            }
        } else {
            let postTags = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    deletedAt: { $exists: false },
                },
                { taggedAcounts: items.tags },
                { session }
            );
            if (!postTags.modifiedCount) {
                console.log("Post has been deleted");
                return;
            }
        }
    }
}

export async function postLikeOrUnlike(
    session: ClientSession,
    postId: string,
    accountId: string,
    liked: boolean
) {
    const post = await isPostAvailable(postId);
    if (!post) {
        console.log("Post does not exist");
        return;
    }
    if (liked) {
        const viewed = await postViewStatus(postId, accountId);
        if (!viewed) {
            await postViewCollection.insertOne(
                {
                    _id: new ObjectId(),
                    postId: new ObjectId(postId),
                    viewedBy: new ObjectId(accountId),
                    viewedAt: new Date(),
                },
                { session }
            );

            let view = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    deletedAt: { $exists: true },
                },
                { $inc: { noOfViews: 1 } },
                { session }
            );
            if (!view.modifiedCount) {
                console.log("Post does not exist");
                return;
            }
        }

        await postLikeCollection.insertOne(
            {
                _id: new ObjectId(),
                postId: new ObjectId(postId),
                likedBy: new ObjectId(accountId),
                likedAt: new Date(),
            },
            { session }
        );

        let postLikeCount = await postCollection.updateOne(
            {
                _id: new ObjectId(postId),
                deletedAt: { $exists: false },
            },
            { $inc: { noOfLikes: 1 } },
            { session }
        );
        if (!postLikeCount.modifiedCount) {
            console.log("Post does not exist");
            return;
        }
    } else {
        let postLike = await postLikeCollection.findOne(
            {
                postId: new ObjectId(postId),
                likedBy: new ObjectId(accountId),
            },
            { session }
        );
        if (postLike) {
            await postLikeCollection.deleteOne(
                {
                    postId: new ObjectId(postId),
                    likedBy: new ObjectId(accountId),
                },
                { session }
            );

            let postLikeCount = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    deletedAt: { $exists: false },
                },
                { $inc: { "meta.noOfLikes": -1 } },
                { session }
            );
            if (!postLikeCount.modifiedCount) {
                console.log("Post does not exist");
                return;
            }
        } else {
            console.log("Unliking a post that was not liked by the account");
            return;
        }
    }
}

export async function postSaveOrUnsave(
    session: ClientSession,
    postId: string,
    accountId: string,
    saved: boolean
) {
    const post = await isPostAvailable(postId);
    if (!post) {
        console.log("Post does not exist");
        return;
    }
    if (saved) {
        await postSaveCollection.insertOne(
            {
                postId: new ObjectId(postId),
                savedBy: new ObjectId(accountId),
                savedAt: new Date(),
            },
            { session }
        );
        let saveCount = await postCollection.updateOne(
            { _id: new ObjectId(postId), deletedAt: { $exists: false } },
            { $inc: { "meta.noOfSaves": 1 } },
            { session }
        );
        if (!saveCount.modifiedCount) {
            console.log("Post has been deleted");
            return;
        }
    } else {
        let save = await postSaveCollection.findOne(
            {
                postId: new ObjectId(postId),
                savedBy: new ObjectId(accountId),
            },
            { session }
        );
        if (save) {
            await postSaveCollection.deleteOne(
                {
                    postId: new ObjectId(postId),
                    savedBy: new ObjectId(accountId),
                },
                { session }
            );
            let saveCount = await postCollection.updateOne(
                { _id: new ObjectId(postId), deletedAt: { $exists: false } },
                { $inc: { "meta.noOfSaves": -1 } },
                { session }
            );
            if (!saveCount.modifiedCount) {
                console.log("Post has been deleted");
                return;
            }
        } else {
            console.log(
                "Unsaving a post that was not saved by the account is not possible"
            );
            return;
        }
    }
}

export async function postFolderAddOrRemove(
    session: ClientSession,
    postId: string,
    accountId: string,
    folderName: string,
    added: boolean
) {
    const post = await isPostAvailable(postId);
    if (!post) {
        console.log("Post does not exist");
        return;
    }
    let folder = await postFolderCollection.findOne({
        name: folderName,
        createdBy: new ObjectId(accountId),
    });
    if (folder) {
        if (added) {
            let postFolder = await postCollection.updateOne(
                { _id: new ObjectId(postId), deletedAt: { $exists: false } },
                {
                    $push: {
                        addedTo: {
                            folder: folder._id,
                            addedAt: new Date(),
                        },
                    },
                },
                { session }
            );
            if (!postFolder.modifiedCount) {
                console.log("The post has been deleted");
                return;
            }
            await postFolderCollection.updateOne(
                { name: folderName, createdBy: new ObjectId(accountId) },
                { $inc: { noOfPosts: 1 } },
                { session }
            );
        } else {
            let postFolder = await postCollection.updateOne(
                { _id: new ObjectId(postId), deletedAt: { $exists: false } },
                {
                    $pull: {
                        addedTo: { folderId: folder._id },
                    },
                },
                { session }
            );
            if (!postFolder.modifiedCount) {
                console.log("The post has been deleted");
                return;
            }
            await postFolderCollection.updateOne(
                { _id: folder._id },
                { $inc: { noOfPosts: -1 } },
                { session }
            );
        }
    }
}

export async function postComment(
    session: ClientSession,
    postId: string,
    accountId: string,
    sentimentScore: number,
    text: string,
    hashTags?: string[],
    mentions?: string[],
    keywords?: string[],
    emojis?: string[]
) {
    const post = await postCollection.findOne({
        _id: new ObjectId(postId),
        deletedAt: { $exists: false },
        "advancedOptions.commentSetting": { $ne: "disabled" },
    });
    if (post) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne({
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    });
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            const viewed = await postViewStatus(postId, accountId);
            if (!viewed) {
                await postViewCollection.insertOne(
                    {
                        _id: new ObjectId(),
                        postId: new ObjectId(postId),
                        viewedBy: new ObjectId(accountId),
                        viewedAt: new Date(),
                    },
                    { session }
                );

                let view = await postCollection.updateOne(
                    {
                        _id: new ObjectId(postId),
                        deletedAt: { $exists: false },
                    },
                    { $inc: { "meta.noOfViews": 1 } },
                    { session }
                );
                if (!view.modifiedCount) {
                    console.log("Post does not exist");
                    return;
                }
            }
            await commentCollection.insertOne(
                {
                    isPinned: false,
                    postId: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    createdAt: new Date(),
                    isApproved: true,
                    text: text,
                    engagementSummary: {
                        noOfReplies: 0,
                        noOfLikes: 0,
                    },
                    meta: {
                        sentimentScore: sentimentScore,
                        hashtags: hashTags,
                        mentions: mentions,
                        keywords: keywords,
                        emojis: emojis,
                    },
                },
                { session }
            );
            let commentCount = await postCollection.updateOne(
                {
                    _id: new ObjectId(postId),
                    deletedAt: { $exists: false },
                },
                {
                    $inc: { "meta.noOfComments": 1 },
                },
                { session }
            );
            if (!commentCount.modifiedCount) {
                console.log("This post has been deleted");
                return;
            }
            if (hashTags) {
                for (let i = 0; i < hashTags.length; i++) {
                    let hashTagName = hashTags[i];
                    let hashTag = await hashtagCollection.findOne({
                        name: hashTagName,
                    });
                    if (hashTag) {
                        await hashtagCollection.updateOne(
                            { name: hashTag },
                            { $inc: { "meta.noOfCommentUse": 1 } },
                            { session }
                        );
                    } else {
                        await hashtagCollection.insertOne(
                            {
                                name: hashTagName,
                                createdAt: new Date(),
                                meta: {
                                    noOfPostUse: 0,
                                    noOfMemoryUse: 0,
                                    noOfCommentUse: 1,
                                    noOfBioUse: 0,
                                    noOfMessageUse: 0,
                                    noOfVisits: 0,
                                    noOfSearches: 0,
                                },
                            },
                            { session }
                        );
                    }
                }
            }
        }
    }
}

export async function postCommentLikeOrUnlike(
    session: ClientSession,
    postId: string,
    accountId: string,
    commentId: string,
    liked: boolean
) {
    const post = await postCollection.findOne({
        _id: new ObjectId(postId),
        deletedAt: { $exists: false },
        "advancedOptions.commentSetting": { $ne: "disabled" },
    });
    const comment = await commentCollection.findOne({
        _id: new ObjectId(commentId),
        deletedAt: { $exists: false },
    });
    if (post && comment) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne({
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    });
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            if (liked) {
                await commentLikeCollection.insertOne(
                    {
                        commentId: new ObjectId(commentId),
                        likedBy: new ObjectId(accountId),
                        likedAt: new Date(),
                    },
                    { session }
                );
                let commentLikeCount = await commentCollection.updateOne(
                    {
                        _id: new ObjectId(commentId),
                        deletedAt: { $exists: false },
                    },
                    {
                        $inc: {
                            "meta.noOfLikes": 1,
                        },
                    },
                    { session }
                );
                if (!commentLikeCount.modifiedCount) {
                    console.log("Comment has been deleted");
                    return;
                }
            } else {
                let commentLike = await commentLikeCollection.findOne(
                    {
                        commentId: new ObjectId(commentId),
                        likedBy: new ObjectId(accountId),
                    },
                    { session }
                );
                if (commentLike) {
                    await commentLikeCollection.deleteOne(
                        {
                            commentId: new ObjectId(commentId),
                            likedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    let commentLikeCount = await commentCollection.updateOne(
                        {
                            _id: new ObjectId(commentId),
                            deletedAt: { $exists: false },
                        },
                        { $inc: { "meta.noOfLikes": -1 } },
                        { session }
                    );
                    if (!commentLikeCount.modifiedCount) {
                        console.log("Comment has been deleted");
                        return;
                    }
                } else {
                    console.log(
                        "Unliking a comment that was not already liked"
                    );
                    return;
                }
            }
        }
    }
}

export async function postCommentPinOrUnpin(
    session: ClientSession,
    postId: string,
    commentId: string,
    accountId: string,
    pinned: boolean
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            createdBy: new ObjectId(accountId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne({
        _id: new ObjectId(commentId),
        deletedAt: { $exists: false },
    });
    if (post && comment) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne({
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    });
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            if (pinned) {
                let pin = await commentCollection.updateOne(
                    {
                        _id: new ObjectId(commentId),
                        deletedAt: { $exists: false },
                        isPinned: false,
                    },
                    { $set: { isPinned: true } },
                    { session }
                );
                if (!pin.modifiedCount) {
                    console.log("Pinning an already pinned comment");
                    return;
                }
            } else {
                let pin = await commentCollection.updateOne(
                    {
                        _id: new ObjectId(commentId),
                        deletedAt: { $exists: false },
                        isPinned: true,
                    },
                    { $set: { isPinned: false } },
                    { session }
                );
                if (!pin.modifiedCount) {
                    console.log("Unpinning an already unpinned comment");
                    return;
                }
            }
        }
    }
}

export async function postCommentDelete(
    session: ClientSession,
    postId: string,
    commentId: string,
    accountId: string
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );

    if (
        post &&
        comment &&
        (post.createdBy === new ObjectId(accountId) ||
            comment.createdBy === new ObjectId(accountId))
    ) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne({
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    });
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            let commentDelete = await commentCollection.updateOne(
                {
                    _id: new ObjectId(commentId),
                    deletedAt: { $exists: false },
                },
                {
                    $set: {
                        deletedAt: new Date(),
                    },
                },
                { session }
            );
            if (!commentDelete.modifiedCount) {
                console.log("Deleting an already deleted comment");
                return;
            }
            let commentCount = await postCollection.updateOne(
                { _id: new ObjectId(postId), deletedAt: { $exists: false } },
                { $inc: { "meta.noOfComments": -1 } },
                { session }
            );
            if (!commentCount.modifiedCount) {
                console.log("The post has been deleted");
            }
        }
    }
}

export async function postCommentEdit(
    session: ClientSession,
    postId: string,
    commentId: string,
    accountId: string,
    text: string,
    hashTags?: string[],
    mentions?: string[],
    keywords?: string[]
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    if (post && comment && comment.createdBy.toString() === accountId) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                let following = await accountFollowersCollection.findOne(
                    {
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    },
                    { session }
                );
                if (!following) {
                    console.log(
                        "The requesting account is not authorised to proceed with the operation"
                    );
                    return;
                }
            }
            let commentUpdate = await commentCollection.updateOne(
                {
                    _id: new ObjectId(commentId),
                    deletedAt: { $exists: false },
                },
                {
                    $set: {
                        updatedAt: new Date(),
                        content: {
                            text: text,
                            hashtags: hashTags,
                            keywords: keywords,
                            mentions: mentions,
                        },
                    },
                },
                { session }
            );
            if (!commentUpdate.modifiedCount) {
                throw new Error("Comment was deleted");
            }
            if (hashTags) {
                let newHashTags = new Set<string>();
                for (let i = 0; i < hashTags.length; i++) {
                    let hashTag = hashTags[i];
                    let flag = 0;
                    if (comment.meta.hashtags) {
                        for (let j = 0; j < comment.meta.hashtags.length; i++) {
                            if (hashTag === comment.meta.hashtags[j]) {
                                flag = 1;
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        newHashTags.add(hashTag);
                    }
                }
                for (let item in newHashTags) {
                    let hashTag = await hashtagCollection.findOne(
                        {
                            name: item,
                        },
                        { session }
                    );
                    if (!hashTag) {
                        await hashtagCollection.insertOne(
                            {
                                name: item,
                                createdAt: new Date(),
                                meta: {
                                    noOfBioUse: 0,
                                    noOfCommentUse: 1,
                                    noOfMemoryUse: 0,
                                    noOfMessageUse: 0,
                                    noOfPostUse: 0,
                                    noOfSearches: 0,
                                    noOfVisits: 0,
                                },
                            },
                            { session }
                        );
                    } else {
                        await hashtagCollection.updateOne(
                            { name: item },
                            { $inc: { "meta.noOfCommentUse": 1 } },
                            { session }
                        );
                    }
                }
            }
        }
    }
}

export async function postCommentReply(
    session: ClientSession,
    postId: string,
    accountId: string,
    commentId: string,
    sentimentScore: number,
    text: string,
    keywords?: string[],
    hashtags?: string[],
    mentions?: string[],
    emojis?: string[]
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne({
        _id: new ObjectId(commentId),
        deletedAt: { $exists: false },
    });
    if (post && comment) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne(
                        {
                            accountId: post.createdBy,
                            followedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            await commentCollection.insertOne(
                {
                    isPinned: false,
                    postId: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    createdAt: new Date(),
                    isApproved: true,
                    text: text,
                    repliedTo: new ObjectId(commentId),
                    engagementSummary: {
                        noOfLikes: 0,
                        noOfReplies: 0,
                    },
                    meta: {
                        hashtags: hashtags,
                        keywords: keywords,
                        mentions: mentions,
                        emojis: emojis,
                        sentimentScore: sentimentScore,
                    },
                },
                { session }
            );
            let replyCount = await commentCollection.updateOne(
                {
                    _id: new ObjectId(commentId),
                    deletedAt: { $exists: false },
                },
                {
                    $inc: {
                        "engagementSummary.noOfReplies": 1,
                    },
                },
                { session }
            );
            if (!replyCount.modifiedCount) {
                console.log("Comment has been deleted");
            }
        }
    }
}

export async function postCommentReplyLikeOrUnlike(
    session: ClientSession,
    postId: string,
    commentId: string,
    replyId: string,
    accountId: string,
    liked: boolean
) {
    let post = await postCollection.findOne({
        _id: new ObjectId(postId),
        deletedAt: { $exists: false },
        "advancedOptions.disableComment": false,
    });
    let comment = await commentCollection.findOne({
        _id: new ObjectId(commentId),
        deletedAt: { $exists: false },
    });
    let reply = await commentCollection.countDocuments({
        _id: new ObjectId(replyId),
        deletedAt: { $exists: false },
    });
    if (post && comment && reply) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    const following = await accountFollowersCollection.findOne(
                        {
                            accountId: post.createdBy,
                            followedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            if (liked) {
                await commentLikeCollection.insertOne(
                    {
                        commentId: new ObjectId(replyId),
                        likedBy: new ObjectId(accountId),
                        likedAt: new Date(),
                    },
                    { session }
                );
                let replyLikeCount = await commentCollection.updateOne(
                    {
                        _id: new ObjectId(replyId),
                        deletedAt: { $exists: false },
                    },
                    {
                        $inc: {
                            "meta.noOfLikes": 1,
                        },
                    },
                    { session }
                );
                if (!replyLikeCount.modifiedCount) {
                    console.log("Comment has been deleted");
                    return;
                }
            } else {
                let replyLike = await commentLikeCollection.findOne(
                    {
                        commentId: new ObjectId(replyId),
                        likedBy: new ObjectId(accountId),
                    },
                    { session }
                );
                if (replyLike) {
                    await commentLikeCollection.deleteOne(
                        {
                            commentId: new ObjectId(replyId),
                            likedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    let replyLikeCount = await commentCollection.updateOne(
                        {
                            _id: new ObjectId(replyId),
                            deletedAt: { $exists: false },
                        },
                        { $inc: { "meta.noOfLikes": -1 } },
                        { session }
                    );
                    if (!replyLikeCount.modifiedCount) {
                        console.log("Comment has been deleted");
                    }
                } else {
                    console.log(
                        "Unliking a comment that was not already liked"
                    );
                    return;
                }
            }
        }
    }
}

export async function postCommentReplyEdit(
    session: ClientSession,
    postId: string,
    commentId: string,
    accountId: string,
    replyId: string,
    text: string,
    hashTags?: string[],
    mentions?: string[],
    keywords?: string[]
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    let reply = await commentCollection.findOne(
        {
            _id: new ObjectId(replyId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    if (post && comment && reply && reply.createdBy.toString() === accountId) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne(
                        {
                            accountId: post.createdBy,
                            followedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            let replyUpdate = await commentCollection.updateOne(
                { _id: new ObjectId(replyId), deletedAt: { $exists: false } },
                {
                    $set: {
                        updatedAt: new Date(),
                        content: {
                            text: text,
                            hashtags: hashTags,
                            keywords: keywords,
                            mentions: mentions,
                        },
                    },
                },
                { session }
            );
            if (!replyUpdate.modifiedCount) {
                console.log("Comment was deleted");
                return;
            }
            if (hashTags) {
                let newHashTags = new Set<string>();
                for (let i = 0; i < hashTags.length; i++) {
                    let hashTag = hashTags[i];
                    let flag = 0;
                    if (reply.meta.hashtags) {
                        for (let j = 0; j < reply.meta.hashtags.length; i++) {
                            if (hashTag === reply.meta.hashtags[j]) {
                                flag = 1;
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        newHashTags.add(hashTag);
                    }
                }
                for (let item in newHashTags) {
                    let hashTag = await hashtagCollection.findOne(
                        {
                            name: item,
                        },
                        { session }
                    );
                    if (!hashTag) {
                        await hashtagCollection.insertOne(
                            {
                                name: item,
                                createdAt: new Date(),
                                meta: {
                                    noOfBioUse: 0,
                                    noOfCommentUse: 1,
                                    noOfMemoryUse: 0,
                                    noOfMessageUse: 0,
                                    noOfPostUse: 0,
                                    noOfSearches: 0,
                                    noOfVisits: 0,
                                },
                            },
                            { session }
                        );
                    } else {
                        await hashtagCollection.updateOne(
                            { name: item },
                            { $inc: { "meta.noOfCommentUse": 1 } },
                            { session }
                        );
                    }
                }
            }
        }
    }
}

export async function postCommentReplyDelete(
    session: ClientSession,
    postId: string,
    commentId: string,
    replyId: string,
    accountId: string
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    let reply = await commentCollection.findOne(
        {
            _id: new ObjectId(replyId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    if (
        post &&
        comment &&
        reply &&
        (post.createdBy === new ObjectId(accountId) ||
            reply.createdBy === new ObjectId(accountId))
    ) {
        if (
            post.advancedOptions.commentSetting !== "disabled" &&
            (post.advancedOptions.commentSetting === "following" ||
                post.advancedOptions.commentSetting === "all")
        ) {
            if (post.advancedOptions.commentSetting === "following") {
                if (post.createdBy.toString() !== accountId) {
                    let following = await accountFollowersCollection.findOne({
                        accountId: post.createdBy,
                        followedBy: new ObjectId(accountId),
                    });
                    if (!following) {
                        console.log(
                            "The requesting account is not authorised to proceed with the operation"
                        );
                        return;
                    }
                }
            }
            let replyDelete = await commentCollection.updateOne(
                {
                    _id: new ObjectId(replyId),
                    deletedAt: { $exists: false },
                },
                {
                    $set: {
                        deletedAt: new Date(),
                    },
                },
                { session }
            );
            if (!replyDelete.modifiedCount) {
                console.log("Deleting an already deleted comment");
                return;
            }
            let replyCount = await commentCollection.updateOne(
                { _id: new ObjectId(commentId), deletedAt: { $exists: false } },
                { $inc: { "meta.noOfreplies": -1 } },
                { session }
            );
            if (!replyCount.modifiedCount) {
                console.log("The post has been deleted");
                return;
            }
        }
    }
}

export async function postFolderCreateOrDelete(
    session: ClientSession,
    accountId: ObjectId,
    folderName: string,
    deleted: boolean,
    posterURL?: string,
    selectedThumbnailPostId?: ObjectId
) {
    if (!deleted) {
        let postFolder = await postFolderCollection.findOne(
            {
                name: folderName,
                createdBy: accountId,
            },
            { session }
        );
        if (!postFolder) {
            await postFolderCollection.insertOne(
                {
                    name: folderName,
                    createdBy: accountId,
                    createdAt: new Date(),
                    noOfPosts: 0,
                    posterUrl: posterURL,
                    selectedThubnailPostId: selectedThumbnailPostId,
                },
                { session }
            );
        } else {
            console.log("Folder with same name already exists");
            return;
        }
    } else {
        let postFolder = await postFolderCollection.findOne(
            {
                name: folderName,
                createdBy: accountId,
            },
            { session }
        );
        if (postFolder) {
            await postFolderCollection.deleteOne(
                {
                    name: folderName,
                    createdBy: accountId,
                    createdAt: new Date(),
                    noOfPosts: 0,
                    posterUrl: posterURL,
                    selectedThubnailPostId: selectedThumbnailPostId,
                },
                { session }
            );
        } else {
            console.log("Folder does not exist");
            return;
        }
    }
}
// : Promise<PostResponse & CommentResponse>
export async function getPostById(
    postId: string,
    accountId: string,
    pageSize: number,
    offset: number
) {
    // let post = await postCollection.findOne({
    //     _id: new ObjectId(postId),
    //     deletedAt: { $exists: false },
    // });
    // if (!post) {
    //     console.log("Post not found");
    //     throw new AppError(
    //         "Post not found",
    //         StatusCode.NOT_FOUND,
    //         ErrorCode.ACCOUNT_UPDATE_ACKNOLEDGEMENT_ERROR
    //     );
    // }
    // let author = await accountsCollection.findOne({
    //     _id: post.createdBy,
    //     deletedAt: { $exists: false },
    // });

    // if (!author) {
    //     console.log("Author not found");
    //     throw new AppError(
    //         "Post not found",
    //         StatusCode.NOT_FOUND,
    //         ErrorCode.ACCOUNT_UPDATE_ACKNOLEDGEMENT_ERROR
    //     );
    // }

    // let blocked = await accountBlocksCollection.findOne({
    //     $or: [
    //         { accountId: new ObjectId(accountId), blockedBy: author._id },
    //         { accountId: author._id, blockedBy: new ObjectId(accountId) },
    //     ],
    // });

    // if (blocked) {
    //     console.log("Post not found");
    //     throw new AppError(
    //         "Post not found",
    //         StatusCode.NOT_FOUND,
    //         ErrorCode.ACCOUNT_UPDATE_ACKNOLEDGEMENT_ERROR
    //     );
    // }

    // let following = await accountFollowersCollection.findOne({
    //     accountId: author._id,
    //     followedBy: new ObjectId(accountId),
    // });
    // if (author.isPrivate && !following) {
    //     console.log("Post not found");
    //     throw new AppError(
    //         "Post not found",
    //         StatusCode.NOT_FOUND,
    //         ErrorCode.ACCOUNT_UPDATE_ACKNOLEDGEMENT_ERROR
    //     );
    // }
    // let hasUnseenMemory = false;
    // let unseenMemories: Memory[] = [];
    // let memories = await memoryCollection
    //     .find({
    //         createdBy: author._id,
    //         deletedAt: { $exists: false },
    //         expireAt: { $gt: new Date() },
    //     })
    //     .toArray();
    // for (let i = 0; i < memories.length; i++) {
    //     let memory = memories[i];
    //     let unseenMemory = await memoryViewCollection.findOne({
    //         memoryId: memory._id,
    //         viewedBy: new ObjectId(accountId),
    //     });
    //     if (unseenMemory) {
    //         unseenMemories.push(memory);
    //     }
    // }
    // if (unseenMemories.length) {
    //     hasUnseenMemory = true;
    // }
    // let comments = getPostComments(postId, accountId, pageSize, offset);

    // return { post, comments };
}

export async function getPostComments(
    postId: string,
    accountId: string,
    pageSize: number = 5,
    offset: number
) {
    // let pipeline = [
    //     {
    //         $match: {
    //             postId: new ObjectId(postId),
    //             deletedAt: { $exists: false },
    //             isApproved: true,
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: accountBlocksCollection,
    //             let: {
    //                 accountId: new ObjectId(accountId),
    //                 authorId: "$createdBy",
    //             },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $or: [
    //                                 {
    //                                     acountId: "$$accountId",
    //                                     blockedBy: "$$authorId",
    //                                 },
    //                                 {
    //                                     acountId: "$$authorId",
    //                                     blockedBy: "$$accountId",
    //                                 },
    //                             ],
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "blocked",
    //         },
    //     },
    //     {
    //         $match: {
    //             blocked: { $size: 0 },
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: accountsCollection,
    //             let: { authorId: "$createdBy" },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             _id: "$$authorId",
    //                         },
    //                     },
    //                 },
    //                 {
    //                     $project: {
    //                         _id: 0,
    //                         username: 1,
    //                         profilePictureUrl: 1,
    //                         isPrivate: 1,
    //                     },
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: accountFollowersCollection,
    //                         let: { accountId: new ObjectId(accountId) },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         accountId: "$$authorId",
    //                                         followedby: "$$accountId",
    //                                     },
    //                                 },
    //                             },
    //                         ],
    //                         as: "following",
    //                     },
    //                 },
    //                 {
    //                     $set: {
    //                         isFollowing: {
    //                             $cond: {
    //                                 if: { following: { $size: 0 } },
    //                                 then: false,
    //                                 else: true,
    //                             },
    //                         },
    //                     },
    //                     $unset: ["following"],
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: memoryCollection,
    //                         let: { currentDate: new Date() },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         createdBy: "$$authorId",
    //                                         expiredAt: { $gt: "$$currentDate" },
    //                                         deletedAt: { $exists: false },
    //                                     },
    //                                 },
    //                             },
    //                             {
    //                                 $lookup: {
    //                                     from: memoryViewCollection,
    //                                     let: {
    //                                         memoryId: "$_id",
    //                                         accountId: new ObjectId(accountId),
    //                                     },
    //                                     pipeline: [
    //                                         {
    //                                             $match: {
    //                                                 $expr: {
    //                                                     memoryId: "$$memoryId",
    //                                                     viewedBy: "$$accountId",
    //                                                 },
    //                                             },
    //                                         },
    //                                     ],
    //                                     as: "seenMemory",
    //                                 },
    //                             },
    //                             {
    //                                 $set: {
    //                                     isViewed: {
    //                                         $cond: {
    //                                             if: {
    //                                                 seenMemory: {
    //                                                     $size: 0,
    //                                                 },
    //                                             },
    //                                             then: false,
    //                                             else: true,
    //                                         },
    //                                     },
    //                                 },
    //                                 $unset: ["seenMemory"],
    //                             },
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         isViewed: false,
    //                                     },
    //                                 },
    //                             },
    //                         ],
    //                         as: "memory",
    //                     },
    //                 },
    //                 {
    //                     $set: {
    //                         hasUnseenMemory: {
    //                             $cond: {
    //                                 if: {
    //                                     $or: [
    //                                         { memory: { $size: 0 } },
    //                                         {
    //                                             $and: [
    //                                                 { isPrivate: true },
    //                                                 { isFollowing: false },
    //                                             ],
    //                                         },
    //                                     ],
    //                                 },
    //                                 then: false,
    //                                 else: true,
    //                             },
    //                         },
    //                     },
    //                     $unset: ["memory", "isFollowing"],
    //                 },
    //             ],
    //             as: "author",
    //         },
    //     },
    //     {
    //         $set: { createdBy: { $arrayElemAt: ["author", 0] } },
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             createdAt: 1,
    //             createdBy: 1,
    //             text: 1,
    //             isPinned: 1,
    //             noOfLikes: "$engagementSummary.noOfLikes",
    //             noOfReplies: "$engagementSummary.noOfReplies",
    //         },
    //     },
    //     {
    //         $skip: offset,
    //     },
    //     {
    //         $limit: pageSize,
    //     },
    // ];
    // let comments = await commentCollection
    //     .aggregate<CommentResponse>(pipeline)
    //     .toArray();
    // return comments;
}

export async function getPostLikes(
    postId: string,
    accountId: string,
    pageSize: number,
    offset: number
) {
    // let pipeline = [
    //     {
    //         $match: {
    //             postId: new ObjectId(postId),
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: accountBlocksCollection,
    //             let: {
    //                 accountId: new ObjectId(accountId),
    //                 likedByAccount: "$likedBy",
    //             },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $or: [
    //                                 {
    //                                     blockedBy: "$$likedByAccount",
    //                                     accountId: "$$accountId",
    //                                 },
    //                                 {
    //                                     blockedBy: "$$accountId",
    //                                     accountId: "$$likedByAccount",
    //                                 },
    //                             ],
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "blocked",
    //         },
    //     },
    //     {
    //         $match: {
    //             blocked: { $size: 0 },
    //         },
    //     },
    //     {
    //         $unset: ["blocked"],
    //     },
    //     {
    //         $lookup: {
    //             from: accountsCollection,
    //             let: { accountId: "$likedBy" },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             _id: "$$accountId",
    //                         },
    //                     },
    //                 },
    //                 {
    //                     $project: {
    //                         _id: 1,
    //                         username: 1,
    //                         profilePictureUrl: 1,
    //                         isPrivate: 1,
    //                     },
    //                 },
    //             ],
    //             as: "accountInfo",
    //         },
    //     },
    //     {
    //         $set: {
    //             _id: { $arrayElemAt: ["accountInfo", 0] },
    //             username: { $arrayElemAt: ["accountInfo", 1] },
    //             profilePictureUrl: { $arrayElemAt: ["accountInfo", 2] },
    //             isPrivate: { $arrayElemAt: ["accountInfo", 3] },
    //         },
    //         $unset: ["accountInfo", "postId"],
    //     },
    //     {
    //         $lookup: {
    //             from: accountFollowersCollection,
    //             let: {
    //                 accountId: "$likedBy",
    //                 requestingAccount: new ObjectId(accountId),
    //             },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             accountId: "$$authorId",
    //                             followedBy: "$$requestingAccount",
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "following",
    //         },
    //     },
    //     {
    //         $set: {
    //             isFollowing: {
    //                 $cond: {
    //                     if: {
    //                         following: { $size: 0 },
    //                     },
    //                     then: false,
    //                     else: true,
    //                 },
    //             },
    //         },
    //         $unset: ["following"],
    //     },
    //     {
    //         $lookup: {
    //             from: accountFollowRequestCollection,
    //             let: {
    //                 accountId: "$likedBy",
    //                 requestingAccount: new ObjectId(accountId),
    //             },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             accountId: "$$accountId",
    //                             requestedBy: "$$requestingAccount",
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "followRequests",
    //         },
    //     },
    //     {
    //         $set: {
    //             isRequested: {
    //                 $cond: {
    //                     if: {
    //                         followRequests: { $size: 0 },
    //                     },
    //                     then: false,
    //                     else: true,
    //                 },
    //             },
    //         },
    //         $unset: ["followRequests"],
    //     },
    //     {
    //         $lookup: {
    //             from: memoryCollection,
    //             let: { currentDate: new Date(), accountId: "$likedBy" },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             createdBy: "$$accountId",
    //                             expiredAt: { $gt: "$$currentDate" },
    //                             deletedAt: { $exists: false },
    //                         },
    //                     },
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: memoryViewCollection,
    //                         let: {
    //                             memoryId: "$_id",
    //                             requestingAccount: new ObjectId(accountId),
    //                         },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         memoryId: "$$memoryId",
    //                                         viewedBy: "$$requestingAccount",
    //                                     },
    //                                 },
    //                             },
    //                         ],
    //                         as: "seenMemory",
    //                     },
    //                 },
    //                 {
    //                     $set: {
    //                         isViewed: {
    //                             $cond: {
    //                                 if: {
    //                                     seenMemory: {
    //                                         $size: 0,
    //                                     },
    //                                 },
    //                                 then: false,
    //                                 else: true,
    //                             },
    //                         },
    //                     },
    //                     $unset: ["seenMemory"],
    //                 },
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             isViewed: false,
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "memory",
    //         },
    //     },
    //     {
    //         $set: {
    //             hasUnseenMemory: {
    //                 $cond: {
    //                     if: {
    //                         $or: [
    //                             { memory: { $size: 0 } },
    //                             {
    //                                 $and: [
    //                                     { isPrivate: true },
    //                                     { isFollowing: false },
    //                                 ],
    //                             },
    //                         ],
    //                     },
    //                     then: false,
    //                     else: true,
    //                 },
    //             },
    //         },
    //         $unset: ["memory"],
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             username: 1,
    //             profilePictureUrl: 1,
    //             hasUnseenMemory: 1,
    //             isFollowing: 1,
    //             isPrivate: 1,
    //             isRequested: 1,
    //             createdAt: 1,
    //         },
    //     },
    //     {
    //         sort: { createdAt: -1 },
    //     },
    //     {
    //         $skip: offset,
    //     },
    //     {
    //         $limit: pageSize,
    //     },
    // ];
    // let postLikes = await postLikeCollection.aggregate(pipeline).toArray();
    // return postLikes;
}
