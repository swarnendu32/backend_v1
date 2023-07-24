import { ObjectId } from "mongodb";
import { Post } from "../types/collections/post.type";
import {
    accountsCollection,
    accountBlocksCollection,
    accountFavouriteCollection,
    accountFollowersCollection,
    memoryCollection,
    memoryViewCollection,
    accountMuteCollection,
    postCollection,
    postLikeCollection,
    postSaveCollection,
    postViewCollection,
    accountFollowRequestCollection,
} from "./index.model";
import { PostResponse } from "../types/responses/post.response";

export async function getPostsByHashtags(
    accountId: string,
    hashTagName: string,
    pageSize: number = 5,
    offset: number
): Promise<PostResponse[]> {
    const pipeline = [
        {
            $match: {
                "caption.hashtags": hashTagName,
                createdBy: { $ne: new ObjectId(accountId) },
                deletedAt: { $exists: false },
            },
        },
        {
            $lookup: {
                from: accountBlocksCollection,
                let: {
                    authorId: "$createdBy",
                    accountId: new ObjectId(accountId),
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $or: [
                                    {
                                        blockedBy: "$$authorId",
                                        accountId: "$$accountId",
                                    },
                                    {
                                        blockedBy: "$$accountId",
                                        accountId: "$$authorId",
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "blocked",
            },
        },
        {
            $match: {
                blocked: { $size: 0 },
            },
        },
        {
            $unset: ["blocked"],
        },
        {
            $lookup: {
                from: accountsCollection,
                let: { authorId: "$createdBy" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                _id: "$$authorId",
                                deletedAt: { $exists: false },
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: accountFollowersCollection,
                            let: {
                                accountId: new ObjectId(accountId),
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            accountId: "$$authorId",
                                            followedBy: "$$accountId",
                                        },
                                    },
                                },
                            ],
                            as: "following",
                        },
                    },
                    {
                        $set: {
                            isFollowing: {
                                $cond: {
                                    if: {
                                        following: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["following"],
                    },
                    {
                        $match: {
                            $expr: {
                                $or: [
                                    {
                                        $and: [
                                            { isPrivate: true },
                                            { isFollowing: true },
                                        ],
                                    },
                                    {
                                        isPrivate: false,
                                    },
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: accountFavouriteCollection,
                            let: { accountId: new ObjectId(accountId) },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            accountId: "$$authorId",
                                            addedBy: "$$accountId",
                                        },
                                    },
                                },
                            ],
                            as: "favourite",
                        },
                    },
                    {
                        $set: {
                            isFavourite: {
                                $cond: {
                                    if: {
                                        favourite: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["favourite"],
                    },
                    {
                        $lookup: {
                            from: accountMuteCollection,
                            let: { accountId: new ObjectId(accountId) },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            accountId: "$$authorId",
                                            mutedby: "$$accountId",
                                        },
                                    },
                                },
                            ],
                            as: "muted",
                        },
                    },
                    {
                        $set: {
                            isMuted: {
                                $cond: {
                                    if: {
                                        muted: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["muted"],
                    },
                    {
                        $match: {
                            $expr: {
                                isMuted: false,
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: memoryCollection,
                            let: { currentDate: new Date() },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            createdBy: "$$authorId",
                                            expiredAt: { $gt: "$$currentDate" },
                                            deletedAt: { $exists: false },
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: memoryViewCollection,
                                        let: {
                                            memoryId: "$_id",
                                            accountId: new ObjectId(accountId),
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        memoryId: "$$memoryId",
                                                        viewedBy: "$$accountId",
                                                    },
                                                },
                                            },
                                        ],
                                        as: "seenMemory",
                                    },
                                },
                                {
                                    $set: {
                                        isViewed: {
                                            $cond: {
                                                if: {
                                                    seenMemory: {
                                                        $size: 0,
                                                    },
                                                },
                                                then: false,
                                                else: true,
                                            },
                                        },
                                    },
                                    $unset: ["seenMemory"],
                                },
                                {
                                    $match: {
                                        $expr: {
                                            isViewed: false,
                                        },
                                    },
                                },
                            ],
                            as: "memory",
                        },
                    },
                    {
                        $set: {
                            hasUnseenMemory: {
                                $cond: {
                                    if: {
                                        $or: [
                                            { memory: { $size: 0 } },
                                            {
                                                $and: [
                                                    { isPrivate: true },
                                                    { isFollowing: false },
                                                ],
                                            },
                                        ],
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["memory"],
                    },
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullname: 1,
                            profilePictureUrl: 1,
                            hasUnseenMemory: 1,
                            isFollowing: 1,
                            isPrivate: 1,
                        },
                    },
                ],
                as: "author",
            },
        },
        {
            $set: {
                createdBy: {
                    $arrayElemAt: ["$author", 0],
                },
            },
            $unset: ["author"],
        },
        {
            $lookup: {
                from: accountsCollection,
                let: { tagAccountId: "$taggedAccounts.accountId" },
                pipeline: [
                    {
                        $match: {
                            _id: "$$taggedAccountId",
                            deletedAt: { $exists: false },
                        },
                    },
                    {
                        $lookup: {
                            from: accountFollowersCollection,
                            let: { accountId: new ObjectId(accountId) },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    accountId:
                                                        "$$taggedAccountId",
                                                },
                                                { followedBy: "$$accountId" },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "following",
                        },
                    },
                    {
                        $set: {
                            isFollowing: {
                                $cond: {
                                    if: {
                                        following: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["following"],
                    },
                    {
                        $lookup: {
                            from: accountFavouriteCollection,
                            let: { accountId: new ObjectId(accountId) },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    accountId:
                                                        "$$taggedAccountId",
                                                },
                                                { addedBy: "$$accountId" },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "favourites",
                        },
                    },
                    {
                        $set: {
                            isFavourite: {
                                $cond: {
                                    if: {
                                        favourites: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["favourites"],
                    },
                    {
                        $lookup: {
                            from: accountFollowRequestCollection,
                            let: { accountId: new ObjectId(accountId) },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    accountId:
                                                        "$$taggedAccountId",
                                                },
                                                { requestedBy: "$$accountId" },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: "followRequests",
                        },
                    },
                    {
                        $set: {
                            isRequested: {
                                $cond: {
                                    if: {
                                        followRequests: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["followRequests"],
                    },
                    {
                        $lookup: {
                            from: memoryCollection,
                            let: { currentDate: new Date() },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            createdBy: "$$taggedAccountId",
                                            expiredAt: { $gt: "$$currentDate" },
                                            deletedAt: { $exists: false },
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: memoryViewCollection,
                                        let: {
                                            memoryId: "$_id",
                                            accountId: new ObjectId(accountId),
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        memoryId: "$$memoryId",
                                                        viewedBy: "$$accountId",
                                                    },
                                                },
                                            },
                                        ],
                                        as: "seenMemory",
                                    },
                                },
                                {
                                    $set: {
                                        isViewed: {
                                            $cond: {
                                                if: {
                                                    seenMemory: {
                                                        $size: 0,
                                                    },
                                                },
                                                then: false,
                                                else: true,
                                            },
                                        },
                                    },
                                    $unset: ["seenMemory"],
                                },
                                {
                                    $match: {
                                        $expr: {
                                            isViewed: false,
                                        },
                                    },
                                },
                            ],
                            as: "memory",
                        },
                    },
                    {
                        $set: {
                            hasUnseenMemory: {
                                $cond: {
                                    if: {
                                        $or: [
                                            { memory: { $size: 0 } },
                                            {
                                                $and: [
                                                    { isPrivate: true },
                                                    { isFollowing: false },
                                                ],
                                            },
                                        ],
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                    },
                ],
                as: "taggedAccounts",
            },
        },
        {
            $lookup: {
                from: postLikeCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            postId: "$$postId",
                            likedBy: "$$accountId",
                        },
                    },
                ],
                as: "like",
            },
        },
        {
            $set: {
                isLiked: {
                    $cond: {
                        if: {
                            like: { $size: 0 },
                        },
                        then: false,
                        else: true,
                    },
                },
            },
            $unset: ["like"],
        },
        {
            $lookup: {
                from: postViewCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            postId: "$$postId",
                            viewedBy: "$$accountId",
                        },
                    },
                ],
                as: "view",
            },
        },
        {
            $set: {
                isViewed: {
                    $cond: {
                        if: {
                            view: { $size: 0 },
                        },
                        then: false,
                        else: true,
                    },
                },
            },
            $unset: ["view"],
        },
        {
            $lookup: {
                from: postSaveCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            postId: "$$postId",
                            savedBy: "$$accountId",
                        },
                    },
                ],
                as: "save",
            },
        },
        {
            $set: {
                isSaved: {
                    $cond: {
                        if: {
                            save: { $size: 0 },
                        },
                        then: false,
                        else: true,
                    },
                },
            },
            $unset: ["save"],
        },
        {
            $sort: { noOfLikes: -1 },
        },
        {
            $skip: offset,
        },
        {
            $limit: pageSize,
        },
    ];

    let posts = await postCollection
        .aggregate<PostResponse>(pipeline)
        .toArray();
    return posts;
}
