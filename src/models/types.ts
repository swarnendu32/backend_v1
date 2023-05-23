export interface HashTag {
  _id: string;
  name: string;
  createdAt: number;
  uses: {
    noOfPostUses: number;
    noOfBioUses: number;
    noOfMemoryUses: number;
    noOfCommentUses: number;
    noOfReplyUses: number;
    noOfMessageUses: number;
    allUses: {
      date: number;
      noOfPostUses: number;
      noOfBioUses: number;
      noOfMemoryUses: number;
      noOfCommentUses: number;
      noOfReplyUses: number;
      noOfMessageUses: number;
    }[];
  };
  searches: {
    allSearches: {
      searchedBy: string;
      searchedAt: number;
    }[];
    dailyStats: {
      date: number;
      searchCount: number;
      noOfSearches: number;
    }[];
  };
  visits: {
    allVisits: {
      visitedBy: string;
      visitedAt: number;
    }[];
    dailyStats: {
      date: number;
      visitCount: number;
      noOfVisits: number;
    }[];
  };
}

export interface Location {
  _id: string;
  name: string;
  createdAt: number;
  uses: {
    noOfPostUses: number;
    noOfMemoryUses: number;
    allUses: {
      date: number;
      noOfPostUses: number;
      noOfMemoryUses: number;
    }[];
  };
  searches: {
    allSearches: {
      searchedBy: string;
      searchedAt: number;
    }[];
    dailyStats: {
      date: number;
      searchCount: number;
      noOfSearches: number;
    }[];
  };
  visits: {
    allVisits: {
      visitedBy: string;
      visitedAt: number;
    }[];
    dailyStats: {
      date: number;
      visitCount: number;
      noOfVisits: number;
    }[];
  };
}

export interface Audio {
  _id: string;
  uploadInfo: {
    uploadedAt: number;
    isUploadedManually: boolean;
  };
  associatedAccount?: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  poster?: {
    url: string;
    width: number;
    height: number;
  };
  previewSection: {
    from: number;
    to: number;
  };
  saves: {
    noOfSaves: number;
    allSaves: {
      savedBy: string;
      savedAt: number;
    }[];
  };
  shares: {
    noOfShares: number;
    allShares: {
      sharedBy: string;
      sharedAt: number;
    }[];
  };
  useInfo: {
    noOfPostUses: number;
    noOfMemoryUses: number;
    uses: {
      noOfPostUses: number;
      noOfMemoryUses: number;
      allUses: {
        date: number;
        noOfPostUses: number;
        noOfMemoryUses: number;
      }[];
    };
  };
  searches: {
    allSearches: {
      searchedBy: string;
      searchedAt: number;
    }[];
    dailyStats: {
      date: number;
      searchCount: number;
      noOfSearches: number;
    }[];
  };
  visits: {
    allVisits: {
      visitedBy: string;
      visitedAt: number;
    }[];
    dailyStats: {
      date: number;
      visitCount: number;
      noOfVisits: number;
    }[];
  };
}

export interface Post {
  _id: string;
  uploadInfo: {
    uploadedBy: string;
    uploadedAt: number;
    uploadedFrom?: {
      coord: {
        latitude: number;
        longitude: number;
      };
      city?: string;
      country?: string;
      isoCountryCode?: string;
      name?: string;
    };
  };
  lastUpdatedAt: number;
  deletedAt?: number;
  caption?: {
    originalText: string;
    hashtags?: string[];
    mentions?: string[];
    keyWords?: string[];
    emojis?: string[];
  };
  location?: string;
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
  shares: {
    noOfShares: number;
    allShares: {
      sharedBy: string;
      sharedAt: number;
    }[];
  };
  circulations: {
    noOfCirculations: number;
    allCirculations: {
      circulateddBy: string;
      circulatedAt: number;
    }[];
  };
  comments: {
    noOfComments: number;
    allComments: {
      _id: string;
      uploadInfo: {
        uploadedAt: number;
        uploadedBy: string;
      };
      deletedAt?: number;
      content: string;
      isPinned: boolean;
      likes: {
        noOfLikes: number;
        allLikes: { likedBy: string; likedAt: number }[];
      };
      replies: {
        noOfReplies: number;
        allReplies: {
          _id: string;
          uploadInfo: {
            uploadedAt: number;
            uploadedBy: string;
          };
          deletedAt?: number;
          content: string;
          likes: {
            noOfLikes: number;
            allLikes: { likedBy: string; likedAt: number }[];
          };
        }[];
      };
    }[];
  };
  mentions?: string[];
  contentInfo: {
    photo?: {
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
      mentions?: {
        accountId: string;
        translateX: number;
        translateY: number;
      }[];
    };
    moment?: {
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
      remixInfo?: {
        accountId: string;
        postId: string;
      };
      sections?: number[];
      duration: number;
      isMuted: boolean;
    };
    album?: {
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
      mentions?: {
        accountId: string;
        translateX: number;
        translateY: number;
      }[];
    }[];
    video?: {
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
    };
    audio?: {
      audioId: string;
      usedSection: { from: number; to: number };
    };
    filter?: string;
  };
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemoryCirculation: boolean;
    disableChatSharing: boolean;
    enableRemixing?: boolean;
  };
}
