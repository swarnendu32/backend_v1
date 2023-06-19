export interface Message {
  _id: string;
  createdBy: string;
  createdAt: number;
  deletedAt?: number;
  repliedTo?: string;
  chatId: string;
  text?: string;
  removedBy: string[];
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
    memoryId?: string;
  };
}

export interface MessageLikes {
  _id: string;
  messageId: string;
  likedBy: string;
  likedAt: number;
}

export interface MessageDeliveries {
  _id: string;
  messageId: string;
  deliveredTo: string;
  deliveredAt: number;
  readAt?: number;
}

export interface ChatThread {
  _id: string;
  name?: string;
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  type: "individual" | "group";
  createdAt: number;
  noOfActiveMembers: number;
  noOfMessages: number;
}

export interface ChatThreadMembers {
  _id: string;
  accountId: string;
  chatId: string;
  isMuted?: boolean;
  status: "accepted" | "rejected" | "pending";
  timestamp: number;
}
