/**hashtag quiries
 * get the top 100 most used hashtags in last 7 days
 * get the top 100 most used hashtags
 * get the top 100 most searched hashtags in last 7 days
 * get the top 100 most visited hashtags in last 7 days
 * get all unique accounts that searched a hashtag in a given date
 * get all unique accounts that visited a hashtag in a given date
 */

export interface Account {
  hashtag: {
    visited: {
      name: string;
      lastVisitedAt: number;
    }[];
    searched: {
      name: string;
      lastSearchedAt: number;
    }[];
  };
  location: {
    visited: {
      name: string;
      lastVisitedAt: number;
    }[];
    searched: {
      name: string;
      lastSearchedAt: number;
    }[];
  };
  audio: {
    created: string[];
    visited: {
      audioId: string;
      lastVisitedAt: number;
    }[];
    searched: {
      audioId: string;
      lastSearchedAt: number;
    }[];
    shared: {
      audioId: string;
      lastSharedAt: number;
    }[];
    saved: {
      audioId: string;
      savedAt: number;
    }[];
  };
  account: {
    visited: {
      accountId: string;
      lastVisitedAt: number;
    }[];
    searched: {
      accountId: string;
      lastSearchedAt: number;
    }[];
    shared: {
      accountId: string;
      lastSharedAt: number;
    }[];
    unwanted: {
      accountId: string;
      markedAt: number;
    }[];
    followings: {
      noOfFollowings: number;
      allFollowings: {
        accountId: string;
        followedAt: number;
        isFavourite: boolean;
        muteInfo: {
          memory: boolean;
          post: boolean;
        };
        notificationInfo: {
          memory: boolean;
          photo: boolean;
          video: boolean;
          moment: boolean;
        };
      }[];
    };
    blocks: {
      noOfBlocks: number;
      allBlocks: {
        accountId: string;
        blockedAt: number;
      }[];
    };
    requests: {
      noOfRequests: number;
      allRequests: {
        accountId: string;
        requestedAt: number;
      }[];
    };
  };
  post: {
    created: {
      noOfCreatedPosts: number;
      allPosts: string[];
    };
    viewed: {
      postId: string;
      viewedAt: number;
    }[];
    liked: {
      postId: string;
      likedAt: number;
    }[];
    saved: {
      postId: string;
      savedAt: number;
    }[];
    shared: {
      postId: string;
      lastSharedAt: number;
    }[];
    circulated: {
      postId: string;
      lastCirculatedAt: number;
    }[];
    unwanted: {
      postId: string;
      markedAt: number;
    }[];
  };
  comment: {
    created: {
      postId: string;
      commentId: string;
    }[];
    liked: {
      postId: string;
      commentId: string;
      likedAt: number;
    }[];
  };
  reply: {
    created: {
      postId: string;
      commentId: string;
      replyId: string;
    }[];
    liked: {
      postId: string;
      commentId: string;
      replyId: string;
      likedAt: number;
    }[];
  };
  searches: {
    date: number;
    noOfSearches: number;
    searchedBy: {
      accountId: string;
      noOfSearches: number;
      lastSearchedAt: number;
      searchedAt: number[];
    }[];
  }[];
  visits: {
    date: number;
    noOfVisits: number;
    visitedBy: {
      accountId: string;
      noOfVisits: number;
      lastVisitedAt: number;
      visitedAt: number[];
    }[];
  }[];
  shares: {
    noOfShares: number;
    sharedBy: {
      accountId: string;
      noOfShares: number;
      allShares: {
        chatId: string;
        messageId: string;
      }[];
    }[];
  };
  followers: {
    noOfFollowers: number;
    followedBy: {
      accountId: string;
      followedAt: number;
      isFavourite: boolean;
      muteInfo: {
        memory: boolean;
        post: boolean;
      };
      notificationInfo: {
        memory: boolean;
        photo: boolean;
        video: boolean;
        moment: boolean;
      };
    }[];
  };
  blocks: {
    noOfBlocks: number;
    blockedBy: {
      accountId: string;
      blockedAt: number;
    }[];
  };
  requests: {
    noOfRequests: number;
    requestedBy: {
      accountId: string;
      requestedAt: number;
    }[];
  };
}

export interface Memory {
  _id: string;
  createdAt: number;
  views: {
    noOfViews: number;
    allViews: {
      viewedBy: string;
      viewedAt: number;
    }[];
  };
  reactions: {
    noOfReactions: number;
    allReactions: {
      reactedBy: string;
      reactedAt: number;
      reaction: string;
    }[];
  };
  replies: {
    noOfReplies: number;
    replyDisabled: boolean;
    allReplies: {
      _id: string;
      uploadInfo: {
        uploadedAt: number;
        uploadedBy: string;
      };
      content: string;
    }[];
  };
  mentions: string[] | null;
  resources: {
    audioInfo: {
      audioId: string;
      usedSection: { startAt: number; endAt: number };
    } | null;
    layout: string | null;
    effect: string | null;
    filter: string | null;
  };
  association: {
    postId: string | null;
    accountId: string | null;
    layout: {
      width: number;
      height: number;
    };
    transform: {
      translate: { x: number; y: number };
      scale: number;
      rotate: number;
    };
  } | null;
  interactiveSticker: {
    poll: {
      title: string;
      noOfVotes: number;
      options: {
        text: string;
        noOfVotes: number;
        allVotes: { votedBy: string; votedAt: number }[];
      }[];
    } | null;
    rating: {
      title: string;
      rating: number[];
      allRatings: {
        ratedBy: string;
        ratedAt: number;
        rating: number;
      }[];
    } | null;
    color: string;
    transform: {
      translate: { x: number; y: number };
      scale: number;
      rotate: number;
    };
    style: {
      color: string;
      family: string;
      animation: string;
      type: string;
    };
  } | null;
  interactiveTexts:
    | {
        location: string | null;
        link: {
          title: string;
          url: string;
        } | null;
        caption: string | null;
        transform: {
          translate: { x: number; y: number };
          scale: number;
          rotate: number;
        };
        style: {
          color: string;
          family: string;
          animation: string;
          type: string;
        };
      }[]
    | null;
  deletedAt: number;
  removedAt: number;
  highlights: string[];
}
export interface SearchPhase {
  _id: string;
  phase: string;
  searches: {
    date: number;
    noOfSearches: number;
    searchedBy: {
      accountId: string;
      noOfSearches: number;
      lastSearchedAt: number;
      searchedAt: number[];
    }[];
  }[];
}
