import { Photo, TextContent, Video } from "./util.type";

export interface Message {
  _id: string;
  createdBy: string;
  createdAt: number;
  deletedAt?: number;
  repliedTo?: string;
  chatId: string;
  text?: TextContent;
  hideFrom: string[];
  noOfReactions: number;
  attachment?: {
    type: "media" | "account" | "audio" | "after-effect" | "post";
    media?: {
      type: "photo" | "video";
      data: Photo | Video;
    }[];
    accountId?: string;
    audioId?: string;
    afterEffectId?: string;
    postId?: string;
    memoryId?: string;
  };
}

export interface MessageReaction {
  _id: string;
  messageId: string;
  reactedBy: string;
  reactedAt: number;
  reaction: string;
}

export interface ChatThread {
  _id: string;
  name?: string;
  posterUrl?: string;
  type: "oneToOne" | "group";
  createdAt: number;
  noOfActiveMembers: number;
  noOfMessages: number;
}

export interface ChatThreadMembers {
  _id: string;
  accountId: string;
  chatId: string;
  status: "pending" | "active" | "rejected" | "left";
  timestamp: number;
  isAdmin?: boolean;
  isMuted?: boolean;
  lastDeletedAt?: number;
  lastActiveAt?: number;
}
