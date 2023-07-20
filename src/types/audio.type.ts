import { ObjectId } from "mongodb";

export interface Audio {
  url: string;
  duration: number;
  createdAt: Date;
  type: "original" | "song";
  uploadedBy: "admin" | "user";
  associatedAccountId?: ObjectId;
  title?: string;
  artist?: string;
  posterUrl?: string;
  preview?: {
    url: string;
    start: number;
    end: number;
  };
  genres?: string[];
  bestSections?: { from: number; to: number }[];
  meta: {
    noOfPostUse: number;
    noOfMemoryUse: number;
    noOfVisits: number;
    noOfSearches: number;
    noOfShares: number;
    noOfSaves: number;
  };
}

export interface AudioSave {
  audioId: ObjectId;
  savedBy: ObjectId;
  savedAt: Date;
}

export interface AudioVisit {
  audioId: ObjectId;
  visitedBy: ObjectId;
  visitedAt: Date;
}