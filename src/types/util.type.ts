export type Photo = {
  url: string;
  width: number;
  height: number;
};

export type Video = {
  duration: number;
} & Photo;

export type GeoLocationInfo = {
  /**
   * The latitude coordinate of the location.
   * @type {number}
   */
  latitude: number;

  /**
   * The longitude coordinate of the location.
   * @type {number}
   */
  longitude: number;

  /**
   * The country code of the location.
   * @type {string}
   */
  countryCode: string;

  /**
   * The country name of the location.
   * @type {string}
   */
  country: string;

  /**
   * The region or state name of the location.
   * @type {string}
   */
  region: string;

  /**
   * The sub-region or city name of the location.
   * @type {string}
   */
  subRegion: string;
};

export type TextContent = {
  /**
   * The text content.
   * @type {string}
   */
  text: string;

  /**
   * Optional keywords associated with the text.
   * @type {string[] | undefined}
   */
  keywords?: string[];

  /**
   * Optional hashtags mentioned in the text.
   * @type {string[] | undefined}
   */
  hashtags?: string[];

  /**
   * Optional user mentions in the text.
   * @type {string[] | undefined}
   */
  mentions?: string[];
};

export type Link = {
  /**
   * The title or label for the link.
   * @type {string}
   */
  title: string;

  /**
   * The URL of the external link.
   * @type {string}
   */
  url: string;
};

export interface Reports {
  reportedBy: string;
  reportedAt: number;
  reportedOn: "post" | "comment" | "memory" | "account";
  reportedAccountId?: string;
  reportedPostId?: string;
  reportedCommentId?: string;
  reportedMemoryId?: string;
  category: string;
  subCategory?: string;
  description?: string;
}
