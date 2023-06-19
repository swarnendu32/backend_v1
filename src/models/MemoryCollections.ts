import { Photo, Video } from "./Utility";

type TransformParams = {
  scale: number;
  rotation: number;
  translation: { x: number; y: number };
};

type PollSticker = {
  question: string;
  color: string;
  options: {
    _id: string;
    text: string;
  }[];
  summary: {
    totalVotes: number;
    optionVotes: {
      optionId: string;
      voteCount: number;
      votePercentage: number;
    }[];
  };
};

type StarRatingSticker = {
  question: string;
  color: string;
  summary: {
    totalRatings: number;
    avgRating: number;
    ratingCounts: { star: number; vote: number }[];
  };
};

type Sticker = TransformParams & {
  zIndex: number;
} & (
    | ({ type: "poll" } & PollSticker)
    | ({ type: "star-rating" } & StarRatingSticker)
  );

type Media = {
  type: "photo" | "video";
  backgroundAudioUrl?: string;
} & Video;

type Caption = {
  text: string;
  color: string;
  presentationStyle: string;
  enteringAnimation: string;
  fontFamily: string;
} & TransformParams;

export interface Memory {
  _id: string;
  createdAt: number;
  deletedAt?: number;
  createdBy: number;
  content: Media;
  usedAfterAffect?: string;
  usedAudio?: string;
  captions?: Caption[];
  sticker?: Sticker;
  location?: {
    name: string;
    color: string;
    presentationStyle: string;
    zIndex: number;
  } & TransformParams;
  link?: {
    url: string;
    title: string;
    color: string;
    presentationStyle: string;
    zIndex: number;
  } & TransformParams;
  noOfViews: number;
  noOfLikes: number;
  noOfReplies: number;
  noOfShares: number;
  noOfCirculations: number;
  addedTo?: {
    highlightId: string;
    timestamp: number;
  }[];
  userCameraTool?: "boomarang" | "layout";
  advancedOptions: {
    disableReply: boolean;
  };
}

export interface MemoryView {
  _id: string;
  memoryId: string;
  viewedBy: string;
  viewedAt: number;
}

export interface MemoryReaction {
  _id: string;
  memoryId: string;
  reactedBy: string;
  reactedAt: number;
  reaction: string;
}

export interface MemoryReply {
  _id: string;
  memoryId: string;
  text: string;
  repliedBy: number;
  repliedAt: number;
}

export interface MemoryStickerInteraction {
  _id: string;
  memoryId: string;
  interactedBy: string;
  interactedAt: number;
  stickerType: "poll" | "star-rating";
  star?: number;
  options?: {
    _id: string;
    text: string;
  };
}

export interface HighLight {
  _id: string;
  name: string;
  poster?: Photo;
  createdBy: string;
  createdAt: number;
  noOfMemories: number;
  selectedThubnailMemoryId?: string;
}
