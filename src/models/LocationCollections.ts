export interface Location {
  _id: string;
  name: string;
  createdAt: number;
  useCounts: {
    post: number;
    memory: number;
  };
  noOfVisits: number;
  noOfSearches: number;
}

export interface LocationVisit {
  _id: string;
  locationId: string;
  visitedBy: string;
  visitedAt: number;
}

export interface LocationSearch {
  _id: string;
  locationId: string;
  searchedBy: string;
  searchedAt: number;
}
