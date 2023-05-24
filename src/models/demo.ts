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
  noOfMemories: number;
  uploadedMemories: Memory[];
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
}
