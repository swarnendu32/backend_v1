export interface HashTag {
  _id: string;
  name: string;
  createdAt: number;
  useCounts: {
    post: number;
    memory: number;
    comment: number;
    bio: number;
    message: number;
  };
  noOfVisits: number;
  noOfSearches: number;
}

export interface HashTagVisit {
  _id: string;
  hastagId: string;
  visitedBy: string;
  visitedAt: number;
}
