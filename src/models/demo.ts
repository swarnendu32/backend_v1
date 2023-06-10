export interface Memory {
  _id: string;
  photo: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Account {
  _id: string;
  uploadedPosts: {
    noOfPosts: number;
    allPosts: string[];
  };
  publicFolders: {
    noOfFolders: number;
    allFolders: {
      _id: string;
      createdAt: number;
      poster?: {
        url: string;
        width: number;
        height: number;
      }[];
      noOfPosts: number;
      allPosts: {
        postId: string;
        addedAt: number;
      }[];
    }[];
  };
  uploadedAudios: {
    noOfAudios: number;
    allAudios: string[];
  };
  mentions: {
    posts: {
      noOfPosts: number;
      allPosts: string[];
    };
    memories: {
      noOfMemories: number;
      allMemories: {
        accountId: string;
        memoryId: string;
      }[];
    };
    accounts: {
      noOfAccount: number;
      allAccounts: string[];
    };
    comments: {
      noOfComments: number;
      allComments: {
        postId: string;
        commentId: string;
      }[];
    };
    replies: {
      noOfReplies: number;
      allReplies: {
        postId: string;
        commentId: string;
        replyId: string;
      }[];
    };
  };
  memories: {
    noOfMemories: number;
    allMemories: Memory[];
  };
  highlights: {
    noOfHighlights: number;
    allHighlights: {
      _id: string;
      createdAt: number;
      poster?: {
        url: string;
        width: number;
        height: number;
      }[];
      noOfMemories: number;
      allMemories: {
        memoryId: string;
        addedAt: number;
      }[];
    }[];
  };
  uploadedComments: {
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
  viewedPosts: {
    noOfPosts: number;
    allPosts: {
      postId: string;
      viewedAt: number;
    }[];
  };
  likedPosts: {
    noOfPosts: number;
    allPosts: {
      likedAt: number;
      postId: string;
    }[];
  };
  savedPosts: {
    noOfPosts: number;
    allPosts: {
      savedAt: number;
      postId: string;
    }[];
    noOfFolders: number;
    privateFolders: {
      noOfFolders: number;
      allFolders: {
        _id: string;
        createdAt: number;
        poster?: {
          url: string;
          width: number;
          height: number;
        }[];
        noOfPosts: number;
        allPosts: {
          postId: string;
          addedAt: number;
        }[];
      }[];
    };
  };
  likedComments: {
    noOfComments: number;
    allComments: {
      postId: string;
      commentId: string;
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
  reactedMemories: {
    noOfMemories: number;
    allMemories: {
      accountId: string;
      memoryId: string;
      reaction: string;
      reactedAt: number;
    }[];
  };
  pollParticipation: {
    noOfMemories: number;
    allMemories: {
      accountId: string;
      memoryId: string;
      option: string;
      participatedAt: number;
    }[];
  };
}
