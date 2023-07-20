import { ObjectId } from "mongodb";
import { Post } from "../types/post.type";
import {
    accountCollection,
    blockedAccountsCollection,
    favouriteAccountsCollection,
    followedAccountsCollection,
    memoryCollection,
    memoryViewsCollection,
    mutedAccountsCollection,
    postCollection,
    postLikesCollection,
    postSavesCollection,
    postViewsCollection,
} from "./index.model";

export async function getPostsByHashtags(
    accountId: string,
    hashTagName: string,
    pageSize: number = 5,
    offset: number
) {
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
                from: blockedAccountsCollection,
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
            $lookup: {
                from: accountCollection,
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
                            from: followedAccountsCollection,
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
                            notification: {
                                $cond: {
                                    if: {
                                        following: { $size: 0 },
                                    },
                                    then: undefined,
                                    else: "$following.0.notify",
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
                            from: favouriteAccountsCollection,
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
                            from: mutedAccountsCollection,
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
                                        from: memoryViewsCollection,
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
                                        memory: { $size: 0 },
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                        $unset: ["memory"],
                    },
                    {
                        $unset: [
                            "createdFrom",
                            "createdAt",
                            "broadcastTopic",
                            "lastDeactivatedAt",
                            "_id",
                        ],
                    },
                ],
                as: "author",
            },
        },
        {
            $set: {
                author: {
                    $arrayElemAt: ["$author", 0],
                },
            },
            $unset: ["author"],
        },
        {
            $lookup: {
                from: postLikesCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                postId: "$$postId",
                                likedBy: "$$accountId",
                            },
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
                from: postViewsCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                postId: "$$postId",
                                viewedBy: "$$accountId",
                            },
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
                from: postSavesCollection,
                let: { accountId: new ObjectId(accountId), postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                postId: "$$postId",
                                savedBy: "$$accountId",
                            },
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

    let posts = await postCollection.aggregate(pipeline).toArray();
    return posts;
}
