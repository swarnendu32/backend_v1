export interface HashTagModel {
  id: string;
  createdTimestamp: number;
  authorId: string;
  name: string;
  associatedPosts: string[];
  violations: string[];
  associatedMemories: {
    accountId: string;
    memoryId: string;
  }[];
  availabilityInfo: {
    isAvailable: boolean;
    removedTimestamp: number | null;
    info: string | null;
  };
}

export interface LocationModel {
  id: string;
  name: string;
  authorId: string;
  createdTimestamp: number;
  violations: string[];
  associatedPosts: string[];
  associatedMemories: {
    accountId: string;
    memoryId: string;
  }[];
  associatedAccounts: string[];
  availabilityInfo: {
    isAvailable: boolean;
    removedTimestamp: number | null;
    info: string | null;
  };
}

export interface AudioModel {
  id: string;
  createdTimestamp: number;
  violations: string[];
  associatedAccountId: string | null;
  artist: string;
  title: string;
  url: string;
  duration: number;
  posterUrl: string;
  previewSection: {
    from: number;
    to: number;
  };
  associatedMemories: {
    accountId: string;
    memoryId: string;
  }[];
  associatedPosts: string[];
  availabilityInfo: {
    isAvailable: boolean;
    removedTimestamp: number | null;
    info: string | null;
  };
}

export interface PostModel {
  id: string;
  createdTimestamp: number;
  authorId: string;
  mediaType: string;
  lastEditTimestamp: number | null;
  availabilityInfo: {
    isAvailable: boolean;
    removedTimestamp: number | null;
    isRemovedByAuthor: boolean;
    isRemovedByAdmin: boolean;
    info: string | null;
  };
  violations: string[];
  uploadGeoLocation: {
    coord: {
      latitude: number;
      longitude: number;
    } | null;
    city: string | null;
    country: string | null;
    district: string | null;
    isoCountryCode: string | null;
    name: string | null;
    postalCode: string | null;
    region: string | null;
    streetNumber: string | null;
    subregion: string | null;
  };
  caption: string | null;
  taggedLocation: string | null;
  mentions: string[] | null;
  views: string[];
  likes: string[];
  saves: string[];
  comments: {
    id: string;
    createdTimestamp: number;
    authorId: string;
    availabilityInfo: {
      isAvailable: boolean;
      removedTimestamp: number | null;
      isRemovedByPostAuthor: boolean;
      isRemovedByAdmin: boolean;
      isRemoverByCommentAuthor: boolean;
      info: string | null;
    };
    violations: string[];
    content: string;
    likes: string[];
    isPinned: boolean;
    replies: {
      id: string;
      createdTimestamp: number;
      authorId: string;
      availabilityInfo: {
        isAvailable: boolean;
        removedTimestamp: number | null;
        isRemovedByPostAuthor: boolean;
        isRemovedByAdmin: boolean;
        isRemoverByReplyAuthor: boolean;
        info: string | null;
      };
      violations: string[];
      content: string;
      likes: string[];
    }[];
  }[];
  audioInfo: {
    audioId: string;
    usedSection: {
      from: number;
      to: number;
    };
  } | null;
  photos:
    | {
        url: string;
        width: string;
        height: string;
        preview: {
          url: string;
          width: number;
          height: number;
        };
        stickyMentions: string[] | null;
      }[]
    | null;
  video: {
    url: string;
    width: string;
    height: string;
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
    duration: number;
    isMuted: boolean;
    isMoment: boolean;
    momentRelatedInfo: {
      remixEnabled: boolean;
      remixedWith: string | null;
      templateSections: number[] | null;
    } | null;
  } | null;
  advancedOptions: {
    hideEngagementCount: boolean;
    disableComment: boolean;
    disableMemorySharing: boolean;
    disableLinkSharing: boolean;
    disableChatSharing: boolean;
  };
  memoryShares: { accountId: string; memoryId: string }[];
  chatShares: string[];
  linkShares: string[];
}
