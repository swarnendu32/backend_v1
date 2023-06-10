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
  };
  searches: {
    searchedBy: string;
    searchedAt: number;
  }[];
  visits: {
    visitedBy: string;
    visitedAt: number;
  }[];
  dailyStats: {
    date: number;
    uses: {
      noOfPostUses: number;
      noOfBioUses: number;
      noOfMemoryUses: number;
      noOfCommentUses: number;
      noOfReplyUses: number;
    };
    noOfVisits: number;
    noOfSearches: number;
  }[];
}

export interface Location {
  _id: string;
  name: string;
  createdAt: number;
  uses: {
    noOfPostUses: number;
    noOfMemoryUses: number;
  };
  searches: {
    searchedBy: string;
    searchedAt: number;
  }[];
  visits: {
    visitedBy: string;
    visitedAt: number;
  }[];
  dailyStats: {
    date: number;
    uses: {
      noOfPostUses: number;
      noOfMemoryUses: number;
    };
    noOfVisits: number;
    noOfSearches: number;
  }[];
}

export interface Audio {
  _id: string;
  uploadedAt: number;
  isUploadedExternally: boolean;
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
  uses: {
    noOfPostUses: number;
    noOfMemoryUses: number;
  };
  saves: {
    savedBy: string;
    savedAt: number;
  }[];
  shares: {
    sharedBy: string;
    sharedAt: number;
  }[];
  searches: {
    searchedBy: string;
    searchedAt: number;
  }[];
  visits: {
    visitedBy: string;
    visitedAt: number;
  }[];
  dailyStats: {
    date: number;
    uses: {
      noOfPostUses: number;
      noOfMemoryUses: number;
    };
    noOfVisits: number;
    noOfSearches: number;
    noOfShares: number;
  }[];
}

export interface Post {
  _id: string;
  uploadedBy: string;
  uploadedAt: number;
  lastUpdatedAt: number;
  deletedAt?: number;
  caption?: {
    originalText: string;
    hashtags?: string[];
    mentions?: string[];
    keyWords?: string[];
    emojis?: string[];
  };
  taggedLocation?: string;
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
    savedBy: string;
    savedAt: number;
  }[];
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
      circulationsBy: string;
      circulationsAt: number;
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
  taggedAccounts?: {
    accountId: string;
    taggedPhotoIndex?: number[];
  }[];
  mediaInfo: {
    photo?: {
      url: string;
      width: number;
      height: number;
      preview: {
        url: string;
        width: number;
        height: number;
      };
    };
    album?: {
      url: string;
      width: number;
      height: number;
      preview: {
        url: string;
        width: number;
        height: number;
      };
    }[];
    moment?: {
      variants: {
        url: string;
        width: number;
        height: number;
      }[];
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      remixInfo?: {
        accountId: string;
        postId: string;
      };
      sections?: number[];
      duration: number;
      isMuted: boolean;
    };
    video?: {
      variants: {
        url: string;
        width: number;
        height: number;
      }[];
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      duration: number;
      isMuted: boolean;
    };
    audio?: {
      audioId: string;
      usedSection: { from: number; to: number };
    };
  };
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemoryCirculation: boolean;
    disableRemixing?: boolean;
  };
  dailyStats: {
    date: number;
    views: {
      noOfViewsReached: number;
      totalNoOfViews: number;
    };
    shares: {
      noOfSharesReached: number;
      totalNoOfShares: number;
    };
    circulations: {
      noOfCirculationsReached: number;
      totalNoOfCirculations: number;
    };
  }[];
}
