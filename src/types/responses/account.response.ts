export type AccountResponse0 = {
  _id: string;
  username: string;
  profilePictureUrl: string;
};

//comment author structure
export type AccountResponse1 = {
  hasUnseenStory: boolean;
};

//post likes and tags structure
export type AccountResponse2 = {
  isFollowing: boolean;
  isPrivate: boolean;
  isRequested: boolean;
} & AccountResponse1;

//post author structure
export type AccountResponse3 = {
  isFavourite: boolean;
} & AccountResponse2;
