import { ObjectId } from "mongodb";
import {
  GeoLocationInfo,
  Link,
  NotificationSettings,
  PersonalInfo,
  PrivacySettings,
  SecurityInfo,
  SuggestionSettings,
  TextContent,
} from "./util.type";

export interface Account {
  /**
   * The timestamp indicating when the account was created.
   * @type {number}
   */
  createdAt: Date;

  /**
   * The geolocation information where the account was created.
   * @type {GeoLocationInfo}
   */
  createdFrom: GeoLocationInfo;

  /**
   * The username of the user.
   * @type {string}
   */
  username: string;

  /**
   * The full name of the user.
   * @type {string}
   */
  fullname: string;

  /**
   * Optional URL of the user's profile picture.
   * @type {string | undefined}
   */
  profilePictureUrl?: string;

  /**
   * Optional bio information for the user.
   * @type {Bio | undefined}
   */
  bio?: TextContent;

  /**
   * Optional array of external links associated with the user.
   * @type {Link[] | undefined}
   */
  links?: Link[];

  /**
   * The number of followers the user has.
   * @type {number}
   */
  noOfFollowers: number;

  /**
   * The number of posts the user has made.
   * @type {number}
   */
  noOfPosts: number;

  /**
   * The number of users the user is following.
   * @type {number}
   */
  noOfFollowings: number;

  /**
   * A flag indicating if the user's account is private.
   * @type {boolean}
   */
  isPrivate: boolean;
  broadcastTopic: string;
  privacySettings: PrivacySettings;
  deletedAt?: Date;
  lastDeactivatedAt?: Date;
}

export interface AccountDetails {
  createdAt: Date;
  accountId: ObjectId;
  noOfBlockedAccounts: number;
  noOfFavoriteAccounts: number;
  noOfMutedAccounts: number;
  noOfSavedAudios: number;
  personalInfo: PersonalInfo;
  securityInfo: SecurityInfo;
  notificationInfo: NotificationSettings;
  suggestionSettings: SuggestionSettings;
  meta: {
    noOfFollowRequests: number;
    noOfShares: number;
    noOfSearches: number;
    noOfVisits: number;
  };
}

export interface AccountActivity {
  accountId: ObjectId;
  timestamp: Date;
  activity: string;
}

export interface AccountFollower {
  accountId: ObjectId;
  followedBy: ObjectId;
  followedAt: Date;
  notify: boolean;
}

export interface AccountBlock {
  accountId: ObjectId;
  blockedBy: ObjectId;
  blockedAt: Date;
}

export interface AccountFollowRequest {
  accountId: ObjectId;
  requestedBy: ObjectId;
  requestedAt: Date;
}

export interface AccountFavourite {
  accountId: ObjectId;
  addedBy: ObjectId;
  addedAt: Date;
}

export interface AccountMute {
  accountId: ObjectId;
  mutedBy: ObjectId;
  mutedAt: Date;
}

export interface MemoryHiddenAccount {
  accountId: ObjectId;
  hiddenBy: ObjectId;
  hiddenAt: Date;
}

export interface CommentBlockedAccount {
  accountId: ObjectId;
  blockedBy: ObjectId;
  blockedAt: Date;
}

export interface AccountVisit {
  accountId: ObjectId;
  visitedBy: ObjectId;
  visitedAt: Date;
}

export interface AccountSessions {
  accountId: ObjectId;
  timestamp: Date;
  ipAddress: string;
  clientName: string;
  clientType: string;
  location: GeoLocationInfo;
  hashedAuthToken: string;
  hashedRefreshToken: string;
}

export interface VisitedPlaces {
  accountId: ObjectId;
  placeId: ObjectId;
  timestamp: Date;
  latitude: number;
  longitude: number;
}