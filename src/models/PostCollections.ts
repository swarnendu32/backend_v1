import { GeoLocationInfo, Photo, TextContent, Video } from "./Utility";

type PhotoPostContent = {
  thumbnailUrl: string;
  accountTags?: {
    accountId: string;
    coordinates: { x: number; y: number };
  }[];
  backgroundAudioUrl: string;
} & Photo;

type VideoPostContent = {
  videoType: "moment" | "clip";
  accountTags?: string[];
} & Video;

type PostContent = {
  type: "photo" | "video";
  data: PhotoPostContent[] | VideoPostContent;
};

export interface Post {
  _id: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
  isPinned: boolean;
  createdFrom?: GeoLocationInfo;
  addedTo?: {
    folderId: string;
    timestamp: number;
  }[];
  caption?: TextContent;
  taggedLocation?: {
    name: string;
    id: string;
  };
  noOfLikes: number;
  noOfViews: number;
  noOfSaves: number;
  noOfShares: number;
  noOfCirculations: number;
  noOfComments: number;
  content: PostContent;
  advancedOptions: {
    hideEngagementCount: boolean;
    commentSetting: "disabled" | "following" | "all";
    disableCirculation: boolean;
    disableSharing: boolean;
  };
}

export interface Comment {
  _id: string;
  isPinned: boolean;
  postId: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
  isApproved: boolean;
  text: TextContent;
  repliedTo?: string;
  noOfReplies: number;
  noOfLikes: number;
  sentimentScore: number;
}

export interface CommentLike {
  _id: string;
  commentId: string;
  likedBy: string;
  likedAt: number;
}

export interface PostLike {
  _id: string;
  postId: string;
  likedBy: string;
  likedAt: number;
}

export interface PostSave {
  _id: string;
  postId: string;
  savedBy: string;
  savedAt: number;
}

export interface PostView {
  _id: string;
  postId: string;
  viewedBy: string;
  viewedAt: number;
}

export interface PostFolder {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  noOfPosts: number;
  posterUrl?: string;
  selectedThubnailPostId?: string;
}
