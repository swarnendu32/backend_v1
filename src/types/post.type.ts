import { ObjectId } from "mongodb";
import {
    AccountTag,
    GeoLocationInfo,
    LocationTag,
    Photo,
    TextContent,
    Video,
} from "./util.type";
import { Account } from "./account.type";

type PhotoPostContent = {
    thumbnailUrl: string;
    backgroundAudioUrl: string;
} & Photo;

type VideoPostContent = {
    videoType: "moment" | "clip";
} & Video;

type PostContent = {
    type: "photo" | "video";
    data: PhotoPostContent[] | VideoPostContent;
};

export interface Post {
    createdBy: ObjectId;
    createdAt: Date;
    lastUpdatedAt?: Date;
    deletedAt?: Date;
    isPinned: boolean;
    createdFrom?: GeoLocationInfo;
    addedTo?: {
        folderId: ObjectId;
        timestamp: Date;
    }[];
    caption?: TextContent;
    taggedLocation?: LocationTag;
    taggedAccounts?: AccountTag;
    content: PostContent;
    audioId?: ObjectId;
    advancedOptions: {
        hideEngagementCount: boolean;
        commentSetting: "disabled" | "following" | "all";
        disableCirculation: boolean;
        disableSharing: boolean;
    };
    meta: {
        noOfLikes: number;
        noOfViews: number;
        noOfSaves: number;
        noOfShares: number;
        noOfCirculations: number;
        noOfComments: number;
    };
}

export interface Comment {
    isPinned: boolean;
    postId: ObjectId;
    createdBy: ObjectId;
    createdAt: Date;
    lastUpdatedAt?: Date;
    deletedAt?: Date;
    isApproved: boolean;
    content: TextContent;
    repliedTo?: ObjectId;
    sentimentScore: number;
    meta: {
        noOfReplies: number;
        noOfLikes: number;
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
