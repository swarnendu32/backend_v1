export interface HashTag {
  _id: string;
  name: string;
  uploadedAt: number;
  useInfo: {
    noOfPostUses: number;
    noOfMemoryUses: number;
    noOfCommentUses: number;
    noOfReplyUses: number;
    noOfMessageUses: number;
    uses: {
      date: number;
      noOfPostUses: number;
      allPosts: string[];
      noOfMemoryUses: number;
      allMemories: { accountId: string; memoryId: string }[];
      noOfCommentUses: number;
      allComments: { postId: string; commentId: string }[];
      noOfReplyUses: number;
      allReplies: { postId: string; commentId: string; replyId: string }[];
      noOfMessageUses: number;
      allMessages: { chatId: string; messageId: string }[];
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
}

export interface Location {
  _id: string;
  name: string;
  uploadInfo: {
    uploadedBy: string;
    uploadedAt: number;
  };
  mapUrl: string;
  visits: {
    date: number;
    totalNoOfVisits: number;
    allVisits: {
      visitedBy: string;
      entryAt: number;
      exitAt: number;
    }[];
  }[];
  searches: {
    date: number;
    totalNoOfSearches: number;
    allSearches: {
      searchedBy: string;
      searchedAt: number;
    }[];
  }[];
  uses: {
    totalNoOfPostUses: number;
    postUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
    totalNoOfAccountUses: number;
    accountUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
    totalNoOfMemoryUses: number;
    memoryUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
  };
}

export interface Audio {
  _id: string;
  uploadInfo: {
    uploadedBy: string | null;
    uploadedAt: number;
  };
  title: string;
  artist: string;
  mediaInfo: {
    url: string;
    duration: number;
    poster: {
      url: string;
      width: number;
      height: number;
    };
    previewSection: [number, number];
  };
  saves: {
    totalNoOfSaves: number;
    allSaves: {
      savedBy: string;
      savedAt: number;
    }[];
  };
  visits: {
    date: number;
    allVisits: {
      visitedBy: string;
      visitHistory: number[];
    }[];
  }[];
  searches: {
    date: number;
    allSearches: {
      seBy: string;
      visitHistory: number[];
    }[];
  }[];
  uses: {
    totalNoOfPostUses: number;
    postUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
    totalNoOfMemoryUses: number;
    memoryUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
  };
}

export interface Post {
  _id: string;
  uploadInfo: {
    uploadedBy: string;
    uploadedAt: number;
    uploadedFrom: {
      coord: {
        latitude: number;
        longitude: number;
      };
      city: string | null;
      country: string | null;
      isoCountryCode: string | null;
      name: string | null;
    } | null;
  };
  lastUpdatedAt: number;
  deletedAt: number;
  caption: string | null;
  location: string | null;
  likes: {
    noOfLikes: number;
    allLikes: {
      likedBy: string;
      likedAt: number;
    }[];
  };
  views: {
    noOfViews: number;
    allViews: {
      viewedBy: string;
      viewedAt: number;
    }[];
  };
  saves: {
    noOfSaves: number;
    allSaves: {
      savedBy: string;
      savedAt: number;
    }[];
  };
  comments: {
    id: string;
    uploadInfo: {
      uploadedAt: number;
      uploadedBy: string;
    };
    deleteInfo: {
      deletedAt: number;
      deletedBy: "comment-author" | "post-author";
    } | null;
    content: string;
    isPinned: boolean;
    likes: {
      totalNoOfLikes: number;
      allLikes: { likedBy: string; likedAt: number }[];
    };
    replies: {
      totalNoOfReplies: number;
      allReplies: {
        id: string;
        uploadInfo: {
          uploadedAt: number;
          uploadedBy: string;
        };
        deleteInfo: {
          deletedAt: number;
          deletedBy: "reply-author" | "post-author";
        } | null;
        content: string;
        likes: {
          totalNoOfLikes: number;
          allLikes: { likedBy: string; likedAt: number }[];
        };
      }[];
    };
  }[];
  messageShares: {
    noOfShares: number;
    allShares: {
      sharedBy: string;
      shareHistory: {
        sharedTo: string;
        sharedAt: number;
        messageId: string;
      }[];
    }[];
  };
  memoryShares: {
    noOfShares: number;
    allShares: {
      sharedBy: string;
      shareHistory: {
        sharedAt: number;
        memoryId: string;
      }[];
    }[];
  };
  mentions: string[] | null;
  contentInfo: {
    contentType: "single-photo" | "album" | "moment" | "long-video";
    photo: {
      variants: {
        url: string;
        width: number;
        height: number;
        preview: {
          url: string;
          width: number;
          height: number;
        };
      }[];
      mentions:
        | {
            accountId: string;
            translateX: number;
            translateY: number;
          }[]
        | null;
    } | null;
    moment: {
      variants: {
        url: string;
        width: number;
        height: number;
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
      }[];
      duration: number;
      isMuted: boolean;
    } | null;
    photos:
      | {
          variants: {
            url: string;
            width: number;
            height: number;
          }[];
          mentions:
            | {
                accountId: string;
                translateX: number;
                translateY: number;
              }[]
            | null;
        }[]
      | null;
    video: {
      variants: {
        url: string;
        width: number;
        height: number;
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
      }[];
      duration: number;
      isMuted: boolean;
    } | null;
    audio: {
      audioId: string;
      usedSection: [number, number];
    } | null;
  };
  captionHashtags: string[] | null;
  captionMentions: string[] | null;
  captionKeyWords: string[] | null;
  captionEmojis: string[] | null;
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemorySharing: boolean;
    disableLinkSharing: boolean;
    disableChatSharing: boolean;
  };
}

export interface Account {
  _id: string;
  incomingVisits: {
    date: number;
    visitedBy: string;
    noOfVisits: number;
    lastVisitTimestamp: number;
  }[];
  incomingSearches: {
    date: number;
    searchedBy: string;
    noOfSearches: number;
    lastSearchedAt: number;
  }[];
  incomingUses: {
    usedBy: string;
    date: number;
    lastUsedAt: number;
    noOfPostUses: number;
    noOfMemoryUse: number;
    noOfAccountUses: number;
    noOfCommentUses: number;
    noOfReplyUses: number;
    noOfMessageUses: number;
  }[];
  incomingShares: {
    sharedBy: string;
    date: number;
    lastSharedAt: number;
    noOfSharesByMessages: number;
    noOfSharesByExtrenalApps: number;
  };
  outGoingAccountVisits: {
    date: number;
    visitedAccount: string;
    noOfVisits: number;
    lastVisitTimestamp: number;
  }[];
  outGoingAccountSearches: {
    date: number;
    searchedAccount: string;
    noOfSearches: number;
    lastSearchedAt: number;
  }[];
  outGoingAccountUses: {
    usedAccount: string;
    date: number;
    lastUsedAt: number;
    noOfPostUses: number;
    noOfMemoryUse: number;
    noOfAccountUses: number;
    noOfCommentUses: number;
    noOfReplyUses: number;
    noOfMessageUses: number;
  }[];
  outGoingAccountShares: {
    sharedAccount: string;
    date: number;
    lastSharedAt: number;
    noOfSharesByMessages: number;
    noOfSharesByExtrenalApps: number;
  };
  outGoingHashTagVisits: {
    date: number;
    visitedHashTag: string;
    noOfVisits: number;
    lastVisitTimestamp: number;
  }[];
  outGoingHashTagSearches: {
    date: number;
    searchedHashTag: string;
    noOfSearches: number;
    lastSearchedAt: number;
  }[];
  outGoingHashTagUses: {
    usedHashTag: string;
    date: number;
    lastUsedAt: number;
    noOfPostUses: number;
    noOfMemoryUse: number;
    noOfAccountUses: number;
    noOfCommentUses: number;
    noOfReplyUses: number;
    noOfMessageUses: number;
  }[];
  outGoingHashTagShares: {
    sharedHashTag: string;
    date: number;
    lastSharedAt: number;
    noOfSharesByMessages: number;
    noOfSharesByExtrenalApps: number;
  };
  outGoingLocationVisits: {
    date: number;
    visitedLocation: string;
    noOfVisits: number;
    lastVisitTimestamp: number;
  }[];
  outGoingLocationSearches: {
    date: number;
    searchedLocation: string;
    noOfSearches: number;
    lastSearchedAt: number;
  }[];
  outGoingLocationUses: {
    usedLocation: string;
    date: number;
    lastUsedAt: number;
    noOfPostUses: number;
    noOfAccountUses: number;
    noOfMemoryUse: number;
  }[];
  outGoingLocationShares: {
    sharedLocation: string;
    date: number;
    lastSharedAt: number;
    noOfSharesByMessages: number;
    noOfSharesByExtrenalApps: number;
  };
  outGoingAudioVisits: {
    date: number;
    visitedAudio: string;
    noOfVisits: number;
    lastVisitTimestamp: number;
  }[];
  outGoingAudioSearches: {
    date: number;
    searchedAudio: string;
    noOfSearches: number;
    lastSearchedAt: number;
  }[];
  outGoingAudioUses: {
    usedAudio: string;
    date: number;
    lastUsedAt: number;
    noOfPostUses: number;
    noOfMemoryUse: number;
  }[];
  outGoingAudioShares: {
    sharedAudio: string;
    date: number;
    lastSharedAt: number;
    noOfSharesByMessages: number;
    noOfSharesByExtrenalApps: number;
  };
  followings: {
    noOfFollowings: number;
    allFollowings: {
      accountId: string;
      timestamp: number;
    }[];
  };
  followers: {
    noOfFollowers: number;
    allFollowers: {
      accountId: string;
      timestamp: number;
    }[];
  };

  repliedComments: {
    noOfComments: number;
    allReplies: {
      repliedComment: string;
      repliedAt: number;
    }[];
  };
  likedPosts: {
    noOfLikes: number;
    allLikes: {
      likedPost: string;
      likedAt: number;
    }[];
  };
  savedPosts: {
    noOfSaves: number;
    allSaves: {
      savedPost: string;
      savedAt: number;
    }[];
  };
  viewedPosts: {
    noOfViews: number;
    allViews: {
      viewedPost: string;
      date: number;
      lastViewedAt: number;
      record: number[];
    }[];
  };
  sharedPosts: {
    noOfShares: number;
    allShares: {
      sharedPost: string;
      date: number;
      lastSharedAt: number;
      noOfShares: number;
      record: number[];
    }[];
  };
  createdPosts: {
    allPosts: {
      postId: string;
      createdAt: number;
    }[];
    noOfPosts: number;
  };
  createdFolders: {
    publicFolders: {
      _id: string;
      name: string;
      createdAt: number;
      noOfPosts: number;
      allPosts: {
        postId: string;
        addedAt: number;
      }[];
    }[];
    privateFolders: {
      _id: string;
      name: string;
      createdAt: number;
      noOfPosts: number;
      allPosts: {
        postId: string;
        addedAt: number;
      }[];
    }[];
  };
  createdReplies: {
    replyId: string;
    commentId: string;
    postId: string;
    createdAt: number;
  }[];
  likedReplies: {
    replyId: string;
    commentId: string;
    postId: string;
    likedAt: number;
  }[];
  createdComments: {
    commentId: string;
    postId: string;
    createdAt: number;
  }[];
  likedComments: {
    commentId: string;
    postId: string;
    likedAt: number;
  }[];
  createdMessages: {
    messageId: string;
    chatId: string;
    createdAt: number;
  }[];
  reactedMessages: {
    messageId: string;
    chatId: string;
    reactedAt: number;
    reaction: string;
  };
}

export interface SearchPhase {
  _id: string;
  phase: string;
  searches: {
    date: number;
    noOfSearches: number;
    allSeaches: {
      searchedBy: string;
      noOfSearches: number;
      lastSearchedAt: string;
      searchHistory: number[];
    }[];
  }[];
}
