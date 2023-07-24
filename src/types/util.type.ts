import { ObjectId } from "mongodb";

export type Photo = {
    url: string;
    width: number;
    height: number;
};

export type Video = {
    duration: number;
} & Photo;

type PhotoPostContent = {
    thumbnail: Photo;
    backgroundAudioUrl?: string;
} & Photo;

type VideoPostContent = {
    videoType: "moment" | "clip";
    isMuted: boolean;
    thumbnail: Photo;
} & Video;

export type PostContent = {
    type: "photo" | "video";
    data: PhotoPostContent[] | VideoPostContent;
};

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
    hashtags?: string[];
    mentions?: string[];
    keywords?: string[];
    emojis?: string[];
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

export type Editables = {
    caption?: string;
    meta?: {
        hashtags?: string[];
        mentions?: string[];
        keywords?: string[];
        emojis?: string[];
    };
    location?: LocationTag;
    tags?: {
        accountId: string;
        coordinates?: { x: number; y: number };
        index?: number;
    }[];
};

export type AccountTag = {
    accountId: ObjectId;
    index?: number;
    coordinates?: {
        x: number;
        y: number;
    };
};

export type LocationTag = {
    id: ObjectId;
    name: string;
};

export type LocationAddressComponent = {
    type: string;
    name: string;
};
