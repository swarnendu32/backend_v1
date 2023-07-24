import { ObjectId } from "mongodb";
import { Link, Photo, Video } from "../util.type";

type TransformParams = {
  scale: number;
  rotation: number;
  translation: { x: number; y: number };
};

type PollSticker = {
  options: string[];
  responseSummary: {
    totalVotes: number;
    voteCount: {
      option: string;
      voteCount: number;
    }[];
  };
};

type StarRatingSticker = {
  responseSummary: {
    totalRatings: number;
    ratingCounts: { star: number; vote: number }[];
  };
};

type Sticker = {
  transform: TransformParams;
  appearence: AppearenceParams;
  zIndex: number;
  text: string;
} & (
  | ({ type: "star-rating" } & StarRatingSticker)
  | ({ type: "poll" } & PollSticker)
);

type Content = {
  type: "photo" | "video";
  thumbnail: Photo;
  url: string;
  width: number;
  height: number;
  duration: number;
  backgroundAudioUrl?: string;
};

type AppearenceParams = {
  color: string;
  style: string;
};

type Caption = {
  text: string;
  animation: string;
  fontFamily: string;
  transform: TransformParams;
  appearence: AppearenceParams;
};

export interface Memory {
  createdAt: Date;
  deletedAt?: Date;
  createdBy: ObjectId;
  content: Content;
  usedAfterEffect?: ObjectId;
  usedAudio?: ObjectId;
  captions?: Caption[];
  sticker?: Sticker;
  taggedLocation?: {
    id: ObjectId;
    name: string;
    zIndex: number;
    appearence: AppearenceParams;
    transform: TransformParams;
  };
  link?: {
    zIndex: number;
    appearence: AppearenceParams;
    transform: TransformParams;
  } & Link;
  addedTo?: {
    highlight: ObjectId;
    timestamp: Date;
  }[];
  usedCameraTool?: "boomarang" | "layout";
  advancedOptions: {
    replySetting: "disabled" | "following" | "all";
    disableCirculation: boolean;
    disableSharing: boolean;
  };
  engagementSummary: {
    noOfViews: number;
    noOfLikes: number;
    noOfReplies: number;
    noOfShares: number;
    noOfCirculations: number;
  };
  meta: {
    hashtags?: string[];
    mentions?: string[];
    keywords?: string[];
    emojis?: string[];
  };
}

export interface MemoryView {
  memoryId: ObjectId;
  viewedBy: ObjectId;
  viewedAt: Date;
}

export interface MemoryLike {
  memoryId: ObjectId;
  likedBy: ObjectId;
  likedAt: Date;
}

export interface MemoryReply {
  memoryId: ObjectId;
  text: string;
  repliedBy: ObjectId;
  repliedAt: Date;
}

export interface MemoryStickerResponse {
  memoryId: ObjectId;
  respondedBy: ObjectId;
  respondedAt: Date;
  stickerType: "poll" | "star-rating";
  response: number | string;
}

export interface HighLight {
  name: string;
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  createdBy: ObjectId;
  createdAt: Date;
  noOfMemories: number;
  selectedThumbnailMemoryId?: ObjectId;
}
