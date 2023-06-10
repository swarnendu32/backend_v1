export interface Engagement {
  followers: {
    noOfFollowers: number;
    followedBy: {
      accountId: string;
      favourite: boolean;
      muteInfo: {
        postMuted: boolean;
        memoryMuted: boolean;
      };
    }[];
  };
  blockedBy: string[];
  searches: {
    noOfSearches: number;
    noOfSearchesFromUniqueAccount: number;
    searchedBy: string[];
  };
  visits: {
    noOfVisits: number;
    noOfVisitsFromUniqueAccount: number;
    visitedBy: string[];
  };
  shares: {
    noOfShares: number;
    noOfSharesFromUniqueAccount: number;
    sharedBy: string[];
  };
  dailyStats: {
    date: number;
    noOfSearches: number;
    noOfVisits: number;
    noOfShares: number;
    engagements: {
      postLikes: number;
      memoryReactions: number;
    };
  }[];
  engagements: {
    accountId: string;
    allEngagements: {
      date: number;
      postLikes: number;
      memoryReactions: number;
    }[];
  }[];
}

export interface Activity {
  followingAccounts: {
    noOfFollowings: number;
    allFollowings: {
      accountId: string;
      favourite: boolean;
      muteInfo: {
        postMuted: boolean;
        memoryMuted: boolean;
      };
    }[];
  };
  visits: {
    accounts: string[];
    audios: string[];
    hashtags: string[];
    locations: string[];
  };
  shares: {
    accounts: string[];
    audios: string[];
    posts: string[];
  };
  searches: Search[];
  mentions: {
    posts: string[];
    accounts: string[];
    comments: string[];
    replies: string[];
  };
  blockedAccounts: string[];
  savedAudios: string[];
  uploadedAudios: string[];
  uploadedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  viewedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  likedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  savedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  sharedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  circulatedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  uploadedComments: {
    noOfComments: number;
    allComments: {
      postId: string;
      commentId: string;
    }[];
  };
  likedComments: {
    noOfComments: number;
    allComments: {
      postId: string;
      commentId: string;
    }[];
  };
  uploadedReplies: {
    noOfReplies: number;
    allReplies: {
      postId: string;
      commentId: string;
      replyId: string;
    }[];
  };
  likedReplies: {
    noOfReplies: number;
    allReplies: {
      postId: string;
      commentId: string;
      replyId: string;
    }[];
  };
  privateFolders: {
    _id: string;
    name: string;
    noOfPosts: number;
    allPosts: string[];
  }[];
  publicFolders: {
    _id: string;
    name: string;
    noOfPosts: number;
    allPosts: string[];
  }[];
}

export type Search =
  | {
      type: "account";
      accountId: string;
      username: string;
      fullname: string;
      profilePictureUrl: string;
      noOfFollowers: number;
      following: boolean;
    }
  | {
      type: "audio";
      audioId: string;
      title: string;
      artist: string;
      posterUrl: string;
    }
  | {
      type: "hashtag";
      hashtagId: string;
      name: string;
      noOfPosts: number;
    }
  | {
      type: "location";
      locationId: string;
      name: string;
      noOfPosts: number;
    }
  | {
      type: "search-phase";
      searchPhaseId: string;
      searchPhase: string;
    };

export interface Memory {
  _id: string;
  uploadedAt: number;
  video: {
    url: string;
    width: number;
    height: number;
    duration: number;
    isMuted: boolean;
  };
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  audioInfo?: {
    audioId: string;
    usedSection: {
      from: number;
      to: number;
    };
  };
  usedLayout?: string;
  usedFilter?: string;
  usedAfterEffect?: string;
  texts?: (MemorySticker & MemoryText)[];
  starRating?: {
    _id: string;
    title: string;
    noOfRatings: number;
    ratings: [number, number, number, number, number];
    allRatings: {
      ratedBy: string;
      rating: number;
    }[];
  } & MemorySticker;
  poll?: {
    _id: string;
    title: string;
    noOfVotes: number;
    votes: {
      option: string;
      noOfVotes: number;
    }[];
    allVotes: {
      votedBy: string;
      vote: string;
    }[];
  } & MemorySticker;
  views: {
    noOfViews: number;
    viewedBy: string[];
  };
  likes: {
    noOfLikes: number;
    likedBy: string[];
  };
  shares: {
    noOfShares: number;
    sharedBy: string[];
  };
  circulations: {
    noOfCirculations: number;
    circulatedBy: string[];
  };
  responses: {
    noOfResponses: number;
    allResponses: {
      _id: string;
      responsedBy: string;
      responsedAt: number;
      responseText: string;
    }[];
  };
  mentions?: string[];
  associations?: {
    transform: {
      rotation: number;
      translate: {
        x: number;
        y: number;
      };
    };
    layout: {
      width: number;
      height: number;
    };
    accountId?: string;
    postId?: string;
  };
}

export type MemoryText =
  | {
      type: "caption";
      caption: string;
    }
  | {
      type: "location";
      name: string;
    }
  | {
      type: "link";
      url: string;
      title: string;
    };

export type MemorySticker = {
  transform: {
    scale: number;
    rotation: number;
    translate: {
      x: number;
      y: number;
    };
  };
  style: {
    color: string;
    type: string;
  };
  enteringAnimation: string;
  fontFamily: string;
};
