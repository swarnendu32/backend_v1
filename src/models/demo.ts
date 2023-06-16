export interface Comment {
  _id: string;
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

export interface CommentLikes {
  _id: string;
  commentId: string;
  likedBy: string;
  likedAt: number;
}

export interface HashTag {
  _id: string;
  name: string;
  createdAt: number;
  useCounts: {
    post: number;
    memory: number;
    comment: number;
    bio: number;
  };
  noOfVisits: number;
  noOfSearches: number;
}

export interface HashTagVisits {
  _id: string;
  hastagId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface HashtagSearches {
  _id: string;
  hashtagId: string;
  searchedBy: string;
  searchedAt: number;
}

export interface Location {
  _id: string;
  name: string;
  createdAt: number;
  useCounts: {
    post: number;
    memory: number;
  };
  noOfVisits: number;
  noOfSearches: number;
}

export interface LocationVisits {
  _id: string;
  locationId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface LocationSearches {
  _id: string;
  locationId: string;
  searchedBy: string;
  searchedAt: number;
}
export interface Audio {
  _id: string;
  title: string;
  artist?: string;
  poster?: string;
  url: string;
  previewSection: {
    start: number;
    end: number;
  };
  duration: number;
  createdAt: number;
  associatedAccount?: string;
  useCounts: {
    post: number;
    memory: number;
  };
  noOfVisits: number;
  noOfSearches: number;
  noOfShares: number;
  noOfSaves: number;
}

export interface AudioSaves {
  _id: string;
  audioId: string;
  savedBy: string;
  savedAt: number;
}

export interface AudioVisitis {
  _id: string;
  audioId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface AudioSearches {
  _id: string;
  audioId: string;
  searchedBy: string;
  searchedAt: number;
}

export interface Post {
  _id: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
  isPinned: boolean;
  publicFolders: {
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
  content: {};
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemoryCirculation: boolean;
  };
}

export interface PostLikes {
  _id: string;
  postId: string;
  likedBy: string;
  likedAt: number;
}

export interface PostSaves {
  _id: string;
  postId: string;
  savedBy: string;
  savedAt: number;
  savedTo: {
    folderId: string;
    timestamp: number;
  }[];
}

export interface PostViews {
  _id: string;
  postId: string;
  viewedBy: string;
  viewedAt: number;
}

export interface PostFolders {
  _id: string;
  name: string;
  type: "public" | "private";
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  createdBy: string;
  createdAt: number;
  noOfPosts: number;
}

export interface Memory {
  _id: string;
  createdAt: number;
  createdBy: number;
  content: {
    type: "photo" | "video";
    url: string;
    width: number;
    height: number;
  };
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  duration: number;
  captions?: {
    text: string; // Caption text
    scale: number; // Scale of the caption (between 0.3 to 3)
    rotation: number; // Rotation angle of the caption (between 0 to 360)
    translationX: number; // X translation of the caption (between 0 to 100)
    translationY: number; // Y translation of the caption (between 0 to 100)
    color: string; // Color of the caption text
    presentationStyle: string; // Presentation style of the caption
    enteringAnimation: string; // Animation for entering the caption
    fontFamily: string; // Font family of the caption text
  }[];
  sticker?: Sticker;
  noOfViews: number;
  noOfLikes: number;
  noOfReplies: number;
  noOfShares: number;
  noOfCirculations: number;
}

export type Sticker = {
  question: string;
  scale: number;
  rotation: number;
  translationX: number;
  translationY: number;
  color: string;
} & (
  | {
      type: "poll";
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
    }
  | {
      type: "star-rating";
      summary: {
        totalRatings: number;
        avgRating: number;
        ratingCounts: { star: number; vote: number }[];
      };
    }
);

export interface MemoryViews {
  _id: string;
  memoryId: string;
  viewedBy: string;
  viewedAt: number;
}

export interface MemoryLikes {
  _id: string;
  memoryId: string;
  likedBy: string;
  likedAt: number;
}

export interface MemoryReplies {
  _id: string;
  memoryId: string;
  text: string;
  repliedBy: number;
  repliedAt: number;
}

export interface Polls {
  _id: string;
  memoryId: string;
  optionId: string;
  votedBy: string;
  votedAt: number;
}

export interface Ratings {
  _id: string;
  memoryId: string;
  star: number;
  ratedBy: string;
  ratedAt: number;
}

export interface MemoryFolders {
  _id: string;
  name: string;
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  createdBy: string;
  createdAt: number;
  noOfMemories: number;
}

export interface Message {
  _id: string;
  createdBy: string;
  createdAt: number;
  deletedAt?: number;
  repliedTo?: string;
  chatId: string;
  text?: string;
  attachment?: {
    type: "media" | "account" | "audio" | "after-effect" | "post";
    media?: {
      type: "photo" | "video";
      url: string;
      width: number;
      height: number;
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
    }[];
    accountId?: string;
    audioId?: string;
    afterEffectId?: string;
    postId?: string;
  };
}

export interface MessageLikes {
  _id: string;
  messageId: string;
  likedBy: string;
  likedAt: number;
}

export interface MessageStatus {
  _id: string;
  messageId: string;
  accountId: string;
  status: "delivered" | "read";
  deliveredAt: number;
  readAt?: number;
}
