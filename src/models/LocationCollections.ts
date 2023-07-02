export interface Location {
  _id: string;
  createdAt: number;
  placeId: string;
  license: string;
  osmType: string;
  osmId: string;
  latitude: number;
  langitude: number;
  type: string;
  category: string;
  addressType: string;
  formattedAddress: string;
  name: string;
  importance: number;
  placeRank: number;
  boundingBox: number[];
  addressComponents: {
    type: string;
    name: string;
  }[];
  noOfSearches: number;
  noOfVisits: number;
  noOfShares: number;
  useCounts: {
    post: number;
    memory: number;
  };
}

export interface LocationVisit {
  _id: string;
  locationId: string;
  visitedBy: string;
  visitedAt: number;
}
