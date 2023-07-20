import { ObjectId } from "mongodb";

export interface HashTag {
  name: string;
  createdAt: Date;
  meta: {
    noOfVisits: number;
    noOfSearches: number;
    noOfPostUse: number;
    noOfMemoryUse: number;
    noOfCommentUse: number;
    noOfBioUse: number;
    noOfMessageUse: number;
  };
}

export interface HashTagVisit {
  hastagId: ObjectId;
  visitedBy: ObjectId;
  visitedAt: Date;
}