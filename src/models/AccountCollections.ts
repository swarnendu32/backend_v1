export interface Account {
  _id: string;
  createdAt: number;
  broadcastTopic: string;
  usernameInfo: {
    username: string;
    updatedAt: number;
  };
  fullnameInfo: {
    fullname: string;
    updatedAt: number;
  };
  profilePictureInfo: {
    profilePicture: {
      url: string;
      width: number;
      height: number;
    };
    updatedAt: number;
  };
  bioInfo?: {
    text: string;
    updatedAt: number;
  };
  noOfFollowers: number;
  noOfPosts: number;
  noOfFollowings: number;
  noOfFollowRequests: number;
  noOfShares: number;
  noOfSearches: number;
  noOfVisits: number;
  links: {
    _id: string;
    title: string;
    url: string;
  }[];
  personalInfo: {
    dateOfBirth?: number;
    gender?: string;
    contactInfo: {
      type: "phone-number" | "email-address";
      updatedAt: number;
      phoneNumber?: boolean;
      emailAddress?: string;
    };
  };
  securityInfo: {
    passwordInfo: {
      passwordHash: string;
      updatedAt: number;
    };
    twoStepAuthInfo: {
      enabled: boolean;
      type: "phone-number" | "email-address";
      updatedAt: number;
      phoneNumber?: boolean;
      emailAddress?: string;
    };
  };
  privacyInfo: {
    accountStatusInfo: {
      accountStatus: boolean;
      updatedAt: number;
    };
    chatInfo: {
      enabled: boolean;
    };
    restrictedKeywords: string[];
  };
  notficationInfo: {
    notificationTopic: string;
    /**when someone menions this  account*/
    mentions: "all" | "following" | "off";
    /**when someone likes a post from this account */
    postLike: "all" | "following" | "off";
    /**when someone comments on a post from this account */
    postComment: "all" | "following" | "off";
    /**when someone tag this accountin a post */
    postTags: "all" | "following" | "off";
    /**when someone likes a post this account is tagged in */
    taggedPostLike: "all" | "following" | "off";
    /**when someone comments on a post this account is tagged in */
    taggedPostComment: "all" | "following" | "off";
    /**when someone likes a comment from this account */
    commentLike: "all" | "following" | "off";
    /**when someone replies to a comment from this account */
    commentReplies: "all" | "following" | "off";
    /**when someone react to a memory from this account */
    memoryReactions: "all" | "following" | "off";
    /**when someone replies to a memory from this account */
    memoryReplies: "all" | "following" | "off";
    /**when someone interacts to a sticker from this account */
    stickerInterctions: "all" | "following" | "off";
    /**when someone creates a memory or post using audio associated to this account */
    orginaAudio: "on" | "off";
    /**when someone remixes a moment from this account */
    remixes: "on" | "off";
    /**when a message request comes from  an individual or group*/
    messageRequests: "on" | "off";
    /**when message comes from an individual or group */
    messages: "on" | "off";
    /**when follow request comes to this account */
    followRequest: "on" | "off";
    /**when someone accepts follow requests from this account */
    followRequestAccepted: "on" | "off";
    /**when someone starts following this account */
    startedFollow: "on" | "off";
  };
}

export interface AccountStatus {
  _id: string;
  accountId: string;
  followedBy: string;
  status: "requested" | "followed" | "blocked";
  isFavourite?: boolean;
  muteInfo?: {
    post: boolean;
    memory: boolean;
  };
  notification?: {
    photo: boolean;
    moment: boolean;
    video: boolean;
    memory: boolean;
  };
  timestamp: number;
}

export interface AccountVisit {
  _id: string;
  accountId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface AccountSearch {
  _id: string;
  accountId: string;
  searchedBy: string;
  searchedAt: number;
}
