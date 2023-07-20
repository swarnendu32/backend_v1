import { ClientSession, ObjectId } from "mongodb";
import {
    isBlocked,
    isPostAvailable,
    postViewStatus,
    privateFollowingStatus,
} from "../util/dbUtils";
import {
    accountCollection,
    audioCollection,
    blockedAccountsCollection,
    commentLikesCollection,
    commentsCollection,
    favouriteAccountsCollection,
    followedAccountsCollection,
    hashtagCollection,
    locationCollection,
    memoryCollection,
    memoryViewsCollection,
    mutedAccountsCollection,
    postCollection,
    postFoldersCollection,
    postLikesCollection,
    postSavesCollection,
    postViewsCollection,
} from "./index.model";
import {
    AccountTag,
    Editables,
    GeoLocationInfo,
    LocationTag,
    PostContent,
    TextContent,
} from "../types/util.type";
import { Post } from "../types/post.type";
import { Memory } from "../types/memory.type";

export async function postUpload(
    session: ClientSession,
    accountId: string,
    uploadedFrom: GeoLocationInfo,
    content: PostContent,
    hideEngagementCount: boolean,
    commentSetting: "disabled" | "following" | "all",
    disableCirculation: boolean,
    disableSharing: boolean,
    caption?: TextContent,
    accountTags?: AccountTag,
    location?: LocationTag,
    audioId?: string
) {
    let account = await accountCollection.findOne({
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
                content: content,
                audioId: new ObjectId(audioId),
                advancedOptions: {
                    hideEngagementCount: hideEngagementCount,
                    commentSetting: commentSetting,
                    disableCirculation: disableCirculation,
                    disableSharing: disableSharing,
                },
                meta: {
                    noOfLikes: 0,
                    noOfComments: 0,
                    noOfViews: 0,
                    noOfSaves: 0,
                    noOfCirculations: 0,
                    noOfShares: 0,
                },
            },
            { session }
        );
        if (location) {
            await locationCollection.updateOne(
                { _id: new ObjectId(location.id) },
                {
                    $inc: {
                        "meta.noOfPostUses": 1,
                    },
                },
                { session }
            );
        }
        if (caption && caption.hashtags) {
            for (let i = 0; i < caption.hashtags.length; i++) {
                let hashTagName = caption.hashtags[i];
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
                if (items.caption.hashtags) {
                    let newHashTags = new Set<string>();
                    for (let i = 0; i < items.caption.hashtags.length; i++) {
                        let hashTag = items.caption.hashtags[i];
                        let flag = 0;
                        if (post.caption && post.caption.hashtags) {
                            for (
                                let j = 0;
                                j < post.caption.hashtags.length;
                                j++
                            ) {
                                if (hashTag === post.caption.hashtags[j]) {
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
            await postViewsCollection.insertOne(
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

        await postLikesCollection.insertOne(
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
        let postLike = await postLikesCollection.findOne(
            {
                postId: new ObjectId(postId),
                likedBy: new ObjectId(accountId),
            },
            { session }
        );
        if (postLike) {
            await postLikesCollection.deleteOne(
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
        await postSavesCollection.insertOne(
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
        let save = await postSavesCollection.findOne(
            {
                postId: new ObjectId(postId),
                savedBy: new ObjectId(accountId),
            },
            { session }
        );
        if (save) {
            await postSavesCollection.deleteOne(
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
    let folder = await postFoldersCollection.findOne({
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
                            folderId: folder._id,
                            timestamp: new Date(),
                        },
                    },
                },
                { session }
            );
            if (!postFolder.modifiedCount) {
                console.log("The post has been deleted");
                return;
            }
            await postFoldersCollection.updateOne(
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
            await postFoldersCollection.updateOne(
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
    keywords?: string[]
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
                    let following = await followedAccountsCollection.findOne({
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
                await postViewsCollection.insertOne(
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
            await commentsCollection.insertOne(
                {
                    isPinned: false,
                    postId: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    createdAt: new Date(),
                    isApproved: true,
                    content: {
                        text: text,
                        keywords: keywords,
                        hashtags: hashTags,
                        mentions: mentions,
                    },
                    sentimentScore: sentimentScore,
                    meta: {
                        noOfReplies: 0,
                        noOfLikes: 0,
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
    const comment = await commentsCollection.findOne({
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
                    let following = await followedAccountsCollection.findOne({
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
                await commentLikesCollection.insertOne(
                    {
                        commentId: new ObjectId(commentId),
                        likedBy: new ObjectId(accountId),
                        likedAt: new Date(),
                    },
                    { session }
                );
                let commentLikeCount = await commentsCollection.updateOne(
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
                let commentLike = await commentLikesCollection.findOne(
                    {
                        commentId: new ObjectId(commentId),
                        likedBy: new ObjectId(accountId),
                    },
                    { session }
                );
                if (commentLike) {
                    await commentLikesCollection.deleteOne(
                        {
                            commentId: new ObjectId(commentId),
                            likedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    let commentLikeCount = await commentsCollection.updateOne(
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
    let comment = await commentsCollection.findOne({
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
                    let following = await followedAccountsCollection.findOne({
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
                let pin = await commentsCollection.updateOne(
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
                let pin = await commentsCollection.updateOne(
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
    let comment = await commentsCollection.findOne(
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
                    let following = await followedAccountsCollection.findOne({
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
            let commentDelete = await commentsCollection.updateOne(
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
    let comment = await commentsCollection.findOne(
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
                let following = await followedAccountsCollection.findOne(
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
            let commentUpdate = await commentsCollection.updateOne(
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
                    if (comment.content.hashtags) {
                        for (
                            let j = 0;
                            j < comment.content.hashtags.length;
                            i++
                        ) {
                            if (hashTag === comment.content.hashtags[j]) {
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
    mentions?: string[]
) {
    let post = await postCollection.findOne(
        {
            _id: new ObjectId(postId),
            deletedAt: { $exists: false },
            "advancedOptions.commentSetting": { $ne: "disabled" },
        },
        { session }
    );
    let comment = await commentsCollection.findOne({
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
                    let following = await followedAccountsCollection.findOne(
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
            await commentsCollection.insertOne(
                {
                    isPinned: false,
                    postId: new ObjectId(postId),
                    createdBy: new ObjectId(accountId),
                    createdAt: new Date(),
                    isApproved: true,
                    content: {
                        text: text,
                        hashtags: hashtags,
                        keywords: keywords,
                        mentions: mentions,
                    },
                    repliedTo: new ObjectId(commentId),
                    sentimentScore: sentimentScore,
                    meta: {
                        noOfLikes: 0,
                        noOfReplies: 0,
                    },
                },
                { session }
            );
            let replyCount = await commentsCollection.updateOne(
                {
                    _id: new ObjectId(commentId),
                    deletedAt: { $exists: false },
                },
                {
                    $inc: {
                        "meta.noOfReplies": 1,
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
    let comment = await commentsCollection.findOne({
        _id: new ObjectId(commentId),
        deletedAt: { $exists: false },
    });
    let reply = await commentsCollection.countDocuments({
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
                    const following = await followedAccountsCollection.findOne(
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
                await commentLikesCollection.insertOne(
                    {
                        commentId: new ObjectId(replyId),
                        likedBy: new ObjectId(accountId),
                        likedAt: new Date(),
                    },
                    { session }
                );
                let replyLikeCount = await commentsCollection.updateOne(
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
                let replyLike = await commentLikesCollection.findOne(
                    {
                        commentId: new ObjectId(replyId),
                        likedBy: new ObjectId(accountId),
                    },
                    { session }
                );
                if (replyLike) {
                    await commentLikesCollection.deleteOne(
                        {
                            commentId: new ObjectId(replyId),
                            likedBy: new ObjectId(accountId),
                        },
                        { session }
                    );
                    let replyLikeCount = await commentsCollection.updateOne(
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
    let comment = await commentsCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    let reply = await commentsCollection.findOne(
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
                    let following = await followedAccountsCollection.findOne(
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
            let replyUpdate = await commentsCollection.updateOne(
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
                    if (reply.content.hashtags) {
                        for (
                            let j = 0;
                            j < reply.content.hashtags.length;
                            i++
                        ) {
                            if (hashTag === reply.content.hashtags[j]) {
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
    let comment = await commentsCollection.findOne(
        {
            _id: new ObjectId(commentId),
            deletedAt: { $exists: false },
        },
        { session }
    );
    let reply = await commentsCollection.findOne(
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
                    let following = await followedAccountsCollection.findOne({
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
            let replyDelete = await commentsCollection.updateOne(
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
            let replyCount = await commentsCollection.updateOne(
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
        let postFolder = await postFoldersCollection.findOne(
            {
                name: folderName,
                createdBy: accountId,
            },
            { session }
        );
        if (!postFolder) {
            await postFoldersCollection.insertOne(
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
        let postFolder = await postFoldersCollection.findOne(
            {
                name: folderName,
                createdBy: accountId,
            },
            { session }
        );
        if (postFolder) {
            await postFoldersCollection.deleteOne(
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

export async function getPostById(
    postId: string,
    accountId: string,
    pageSize: number,
    offset: number
) {
    let post = await postCollection.findOne({
        _id: new ObjectId(postId),
        deletedAt: { $exists: false },
    });
    if (!post) {
        console.log("Post not found");
        return;
    }
    let author = await accountCollection.findOne({
        _id: post.createdBy,
        deletedAt: { $exists: false },
    });

    if (!author) {
        console.log("Author not found");
        return;
    }

    let blocked = await blockedAccountsCollection.findOne({
        $or: [
            { accountId: new ObjectId(accountId), blockedBy: author._id },
            { accountId: author._id, blockedBy: new ObjectId(accountId) },
        ],
    });

    if (blocked) {
        console.log("Post not found");
        return;
    }

    let following = await followedAccountsCollection.findOne({
        accountId: author._id,
        followedBy: new ObjectId(accountId),
    });
    if (author.isPrivate && !following) {
        console.log("Post not found");
        return;
    }
    let hasUnseenMemory = false;
    let unseenMemories: Memory[] = [];
    let memories = await memoryCollection
        .find({
            createdBy: author._id,
            deletedAt: { $exists: false },
            expireAt: { $gt: new Date() },
        })
        .toArray();
    for (let i = 0; i < memories.length; i++) {
        let memory = memories[i];
        let unseenMemory = await memoryViewsCollection.findOne({
            memoryId: memory._id,
            viewedBy: new ObjectId(accountId),
        });
        if (unseenMemory) {
            unseenMemories.push(memory);
        }
    }
    if (unseenMemories.length) {
        hasUnseenMemory = true;
    }
    // let comments = getPaginatedComments()
    return post;
}

export async function getPostComments(postId: string, accountId: string) {
    let pipeline = [
        {
            $match: {
                _id: new ObjectId(postId),
            },
        },
    ];
}
