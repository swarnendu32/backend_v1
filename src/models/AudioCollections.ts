export interface Audio {
  _id: string;
  url: string;
  duration: number;
  createdAt: number;
  type: "original" | "song";
  uploadedBy: "admin" | "user";
  associatedAccountId?: string;
  title?: string;
  artist?: string;
  poster?: string;
  preview?: {
    url: string;
    start: number;
    end: number;
  };
  genres?: string[];
  bestSections?: { from: number; to: number }[];
  useCounts: {
    post: number;
    memory: number;
  };
  noOfVisits: number;
  noOfSearches: number;
  noOfShares: number;
  noOfSaves: number;
}

export interface AudioSave {
  _id: string;
  audioId: string;
  savedBy: string;
  savedAt: number;
}

export interface AudioVisit {
  _id: string;
  audioId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface AudioSearch {
  _id: string;
  audioId: string;
  searchedBy: string;
  searchedAt: number;
}
