export type Photo = {
  url: string;
  width: number;
  height: number;
  aspectRatio: number;
};

export type Video = {
  duration: number;
  isMuted: boolean;
  thumbnailUrl: string;
};

export type GeoLocationInfo = {
  /**
   * The latitude coordinate of the location.
   * @type {number}
   */
  latitude: number;

  /**
   * The longitude coordinate of the location.
   * @type {number}
   */
  longitude: number;

  /**
   * The country code of the location.
   * @type {string}
   */
  countryCode: string;

  /**
   * The country name of the location.
   * @type {string}
   */
  country: string;

  /**
   * The region or state name of the location.
   * @type {string}
   */
  region: string;

  /**
   * The sub-region or city name of the location.
   * @type {string}
   */
  subRegion: string;
};

export type TextContent = {
  /**
   * The text content.
   * @type {string}
   */
  text: string;

  /**
   * Optional keywords associated with the text.
   * @type {string[] | undefined}
   */
  keywords?: string[];

  /**
   * Optional hashtags mentioned in the text.
   * @type {string[] | undefined}
   */
  hashtags?: string[];

  /**
   * Optional user mentions in the text.
   * @type {string[] | undefined}
   */
  mentions?: string[];
};

export type Link = {
  /**
   * The title or label for the link.
   * @type {string}
   */
  title: string;

  /**
   * The URL of the external link.
   * @type {string}
   */
  url: string;
};

export type ContactInfo = {
  type: "phone-number" | "email-address";
  phoneNumber?: string;
  emailAddress?: string;
};

export type TwoStepAuthenticationInfo = {
  enabled: boolean;
  mechanism?: ContactInfo;
};

export type SecurityInfo = {
  passwordHash: string;
  twoStepAuthInfo: TwoStepAuthenticationInfo;
  noOfActiveSessions: number;
};

export type PersonalInfo = {
  dateOfBirth?: number;
  gender?: string;
  contactInfo: ContactInfo;
};

export type NotificationInfo = {
  broadcastTopic: string;
  mentions: "all" | "following" | "off";
  postLike: "all" | "following" | "off";
  postComment: "all" | "following" | "off";
  postTags: "all" | "following" | "off";
  taggedPostLike: "all" | "following" | "off";
  taggedPostComment: "all" | "following" | "off";
  commentLike: "all" | "following" | "off";
  commentReplies: "all" | "following" | "off";
  memoryReactions: "all" | "following" | "off";
  memoryReplies: "all" | "following" | "off";
  stickerInterctions: "all" | "following" | "off";
  orginalAudio: "on" | "off";
  remixes: "on" | "off";
  messageRequests: "on" | "off";
  messages: "on" | "off";
  followRequest: "on" | "off";
  followRequestAccepted: "on" | "off";
  startedFollow: "on" | "off";
};

export type PrivacySettings = {
  allowMentions: "everyone" | "following" | "none";
  allowTags: "everyone" | "following" | "none";
  customOffensiveKeywords: string[];
  chatSettings: {
    messageRequests: {
      others: boolean;
      following: boolean;
      contacts: boolean;
    };
    groupInvitations: {
      others: boolean;
      following: boolean;
      contacts: boolean;
    };
    hideOffensiveMessageRequests: boolean;
  };
  commentSettings: {
    hideOffensiveComments: boolean;
    noOfBlockedAccounts: number;
  };
  memorySettings: {
    noOfHiddenAccounts: number;
  };
  suggestionSettings: {
    noOfNotInterestedAccounts: number;
    customSensetiveKeywords: string[];
  };
};
