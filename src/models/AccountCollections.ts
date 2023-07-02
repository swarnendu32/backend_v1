import {
  GeoLocationInfo,
  Link,
  NotificationInfo,
  PersonalInfo,
  PrivacySettings,
  SecurityInfo,
  TextContent,
} from "./Utility";

export interface Account {
  /**
   * The unique identifier for the account document.
   * @type {string}
   */
  _id: string;

  /**
   * The timestamp indicating when the account was created.
   * @type {number}
   */
  createdAt: number;

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
}

export interface AccountDetails {
  _id: string;
  accountId: string;
  noOfFollowRequests: number;
  noOfShares: number;
  noOfSearches: number;
  noOfVisits: number;
  broadcastTopic: string;
  personalInfo: PersonalInfo;
  securityInfo: SecurityInfo;
  notificationInfo: NotificationInfo;
  privacySettings: PrivacySettings;
  noOfBlockedAccounts: number;
  noOfFavoriteAccounts: number;
  noOfMutedAccounts: number;
  noOfSavedAudios: number;
}

export interface AccountActivity {
  _id: string;
  accountId: string;
  timestamp: number;
  key: string;
  value?: string;
}

export interface FollowedAccount {
  _id: string;
  accountId: string;
  followedBy: string;
  followedAt: number;
  notification: boolean;
}

export interface BlockedAccount {
  _id: string;
  accountId: string;
  blockedBy: string;
  blockedAt: number;
}

export interface RequestedAccount {
  _id: string;
  accountId: string;
  requestedBy: string;
  requestedAt: number;
}

export interface FavouriteAccount {
  _id: string;
  accountId: string;
  addedBy: string;
  addedAt: number;
}

export interface MutedAccount {
  _id: string;
  accountId: string;
  mutedBy: string;
  mutedAt: number;
}

export interface MemoryHiddenAccount {
  _id: string;
  accountId: string;
  hiddenBy: string;
  hiddenAt: number;
}

export interface CommentBlockedAccount {
  _id: string;
  accountId: string;
  blockedBy: string;
  blockedAt: number;
}

export interface AccountVisit {
  _id: string;
  accountId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface AccountSessions {
  _id: string;
  accountId: string;
  timestamp: number;
  ipAddress: string;
  clientName: string;
  clientType: string;
  location: GeoLocationInfo;
}

export interface VisitedPlaces {
  _id: string;
  accountId: string;
  placeId: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}
