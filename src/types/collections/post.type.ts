import { ObjectId } from "mongodb";
import {
    AccountTag,
    GeoLocationInfo,
    LocationTag,
    PostContent,
    TextContent,
} from "../util.type";

export interface Post {
    createdBy: ObjectId;
    createdAt: Date;
    lastUpdatedAt?: Date;
    isPinned: boolean;
    createdFrom?: GeoLocationInfo;
    addedTo?: {
        folder: ObjectId;
        addedAt: Date;
    }[];
    caption?: string;
    taggedLocation?: LocationTag;
    taggedAccounts?: AccountTag[];
    usedAudio?: ObjectId;
    content: PostContent;
    advancedOptions: {
        hideEngagementCount: boolean;
        commentSetting: "disabled" | "following" | "all";
        disableCirculation: boolean;
        disableSharing: boolean;
    };
    engagementSummary: {
        noOfLikes: number;
        noOfViews: number;
        noOfSaves: number;
        noOfShares: number;
        noOfCirculations: number;
        noOfComments: number;
    };
    meta: TextContent;
}

export interface Comment {
    isPinned: boolean;
    postId: ObjectId;
    createdBy: ObjectId;
    createdAt: Date;
    lastUpdatedAt?: Date;
    deletedAt?: Date;
    isApproved: boolean;
    text: string;
    repliedTo?: ObjectId;
    engagementSummary: {
        noOfReplies: number;
        noOfLikes: number;
    };
    meta: {
        sentimentScore: number;
        hashtags?: string[];
        mentions?: string[];
        keywords?: string[];
        emojis?: string[];
    };
}

export interface CommentLike {
    commentId: ObjectId;
    likedBy: ObjectId;
    likedAt: Date;
}

export interface PostLike {
    postId: ObjectId;
    likedBy: ObjectId;
    likedAt: Date;
}

export interface PostSave {
    postId: ObjectId;
    savedBy: ObjectId;
    savedAt: Date;
}

export interface PostView {
    postId: ObjectId;
    viewedBy: ObjectId;
    viewedAt: Date;
}

export interface PostFolder {
    name: string;
    createdBy: ObjectId;
    createdAt: Date;
    noOfPosts: number;
    posterUrl?: string;
    selectedThubnailPostId?: ObjectId;
}
