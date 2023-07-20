import { ObjectId } from "mongodb";
import { GeoLocationInfo, Photo, Video } from "../util.type";

type PhotoPostContent = {
  thumbnail: Photo;
  backgroundAudioUrl?: string;
} & Photo;

type VideoPostContent = {
  videoType: "moment" | "clip";
  isMuted: boolean;
  thumbnail: Photo;
} & Video;

export type PostContent = {
  type: "photo" | "video";
  data: PhotoPostContent[] | VideoPostContent;
};

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
  taggedLocation?: {
    name: string;
    _id: ObjectId;
  };
  taggedAccounts?: string[];
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
  meta: {
    hashtags?: string[];
    mentions?: string[];
    keywords?: string[];
    emajis?: string[];
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
    emajis?: string[];
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
