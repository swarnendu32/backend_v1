export interface HashTag {
  _id: string;
  name: string;
  uploadInfo: {
    uploadedBy: string;
    uploadedAt: number;
  };
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
    totalNoOfCommentUses: number;
    commentUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
    totalNoOfReplyUses: number;
    replyUses: {
      date: number;
      totalNoOfUses: number;
      allUses: {
        usedBy: string;
        usedAt: number;
      }[];
    }[];
    totalNoOfMessageUses: number;
    messageUses: {
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
  deleteInfo: {
    deletedAt: number;
    deletedBy: "author" | "admin";
  } | null;
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
      lastViewedAt: number;
      totalNoOfViews: number;
      viewHistory: number[];
    }[];
  };
  shares: {
    noOfShares: number;
    allShares: {
      sharedBy: string;
      totalNoOfShares: number;
      lastShareInfo: {
        lastSharedTo: "external-app" | "chat" | "memory";
        lastSharedAt: number;
      };
      shareHistory: {
        sharedTo: "external-app" | "chat" | "memory";
        sharedAt: number;
      }[];
    }[];
  };
  saves: {
    noOfSaves: number;
    allSaves: {
      savedBy: string;
      savedAt: number;
      savedFolders: {
        savedTo: string;
        savedAt: number;
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
  comments: {
    id: string;
    uploadInfo: {
      uploadedAt: number;
      uploadedBy: string;
    };
    deleteInfo: {
      deletedAt: number;
      deletedBy: "comment-author" | "post-author" | "admin";
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
          deletedBy: "comment-author" | "post-author" | "admin";
        } | null;
        content: string;
        likes: {
          totalNoOfLikes: number;
          allLikes: { likedBy: string; likedAt: number }[];
        };
      }[];
    };
  }[];
}
