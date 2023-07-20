import { PostContent } from "../collections/post.type";
import { Photo } from "../util.type";
import {
  AccountResponse0,
  AccountResponse2,
  AccountResponse3,
} from "./account.response";

export type PostResponse = {
  _id: string;
  isPinned: boolean;
  createdBy: AccountResponse3;
  createdAt: number;
  content: PostContent;
  isUpdated: boolean;
  caption?: string;
  taggedLocation?: {
    name: string;
    _id: string;
  };
  taggedAccounts?: AccountResponse2[];
  usedAuido?: {
    _id: string;
    type: "original" | "song";
    title?: string;
    artist?: string;
    poster?: Photo;
    associatedAccountId?: AccountResponse0;
    isSaved: boolean;
  };
  advancedOptions: {
    hideEngagementCount: boolean;
    commentSetting: "disabled" | "following" | "all";
    disableCirculation: boolean;
    disableSharing: boolean;
  };
  engagementSummary: {
    noOfLikes: number;
    noOfViews: number;
    noOfComments: number;
  };
  mentions?: string[];
};
