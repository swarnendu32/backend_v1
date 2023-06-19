import { Photo, Video } from "./Utility";

type PhotoPostContent = {
  thumbnail: Photo;
  accountTags: {
    accountId: string;
    coordinates: { x: number; y: number };
  }[];
  backgroundAudioUrl: string;
} & Photo;

type VideoPostContent = {
  videoType: "moment" | "clip";
  accountTags: string[];
} & Video;

type PostContent = {
  contentType: "photo" | "video";
  photos?: PhotoPostContent[];
  video?: VideoPostContent;
};

export interface Post {
  _id: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
  isPinned: boolean;
  addedTo?: {
    folderId: string;
    timestamp: number;
  }[];
  caption?: string;
  taggedLocation?: string;
  noOfLikes: number;
  noOfViews: number;
  noOfSaves: number;
  noOfShares: number;
  noOfCirculations: number;
  noOfComments: number;
  content: PostContent;
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemoryCirculation: boolean;
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
  text: string;
  repliedTo?: string;
  noOfReplies: number;
  noOfLikes: number;
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
  savedTo: {
    collectionId: string;
    timestamp: number;
  }[];
}

export interface PostView {
  _id: string;
  postId: string;
  viewedBy: string;
  viewedAt: number;
}

export interface BookmarkCollection {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  noOfPosts: number;
}

export interface PostFolder {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  noOfPosts: number;
  poster?: Photo;
  selectedThubnailPostId?: string;
}
