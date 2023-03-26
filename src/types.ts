export enum HttpStatusCodes {
  /**
   * The server has received the request headers and the client should proceed to send the request body
   * (in the case of a request for which a body needs to be sent; for example, a POST request).
   * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
   * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
   * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
   */
  CONTINUE = 100,

  /**
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  SWITCHING_PROTOCOLS = 101,

  /**
   * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.
   * This code indicates that the server has received and is processing the request, but no response is available yet.
   * This prevents the client from timing out and assuming the request was lost.
   */
  PROCESSING = 102,

  /**
   * Standard response for successful HTTP requests.
   * The actual response will depend on the request method used.
   * In a GET request, the response will contain an entity corresponding to the requested resource.
   * In a POST request, the response will contain an entity describing or containing the result of the action.
   */
  OK = 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  CREATED = 201,

  /**
   * The request has been accepted for processing, but the processing has not been completed.
   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
   */
  ACCEPTED = 202,

  /**
   * SINCE HTTP/1.1
   * The server is a transforming proxy that received a 200 OK from its origin,
   * but is returning a modified version of the origin's response.
   */
  NON_AUTHORITATIVE_INFORMATION = 203,

  /**
   * The server successfully processed the request and is not returning any content.
   */
  NO_CONTENT = 204,

  /**
   * The server successfully processed the request, but is not returning any content.
   * Unlike a 204 response, this response requires that the requester reset the document view.
   */
  RESET_CONTENT = 205,

  /**
   * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
   * The range header is used by HTTP clients to enable resuming of interrupted downloads,
   * or split a download into multiple simultaneous streams.
   */
  PARTIAL_CONTENT = 206,

  /**
   * The message body that follows is an XML message and can contain a number of separate response codes,
   * depending on how many sub-requests were made.
   */
  MULTI_STATUS = 207,

  /**
   * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
   * and are not being included again.
   */
  ALREADY_REPORTED = 208,

  /**
   * The server has fulfilled a request for the resource,
   * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
   */
  IM_USED = 226,

  /**
   * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
   * For example, this code could be used to present multiple video format options,
   * to list files with different filename extensions, or to suggest word-sense disambiguation.
   */
  MULTIPLE_CHOICES = 300,

  /**
   * This and all future requests should be directed to the given URI.
   */
  MOVED_PERMANENTLY = 301,

  /**
   * This is an example of industry practice contradicting the standard.
   * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect
   * (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302
   * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307
   * to distinguish between the two behaviours. However, some Web applications and frameworks
   * use the 302 status code as if it were the 303.
   */
  FOUND = 302,

  /**
   * SINCE HTTP/1.1
   * The response to the request can be found under another URI using a GET method.
   * When received in response to a POST (or PUT/DELETE), the client should presume that
   * the server has received the data and should issue a redirect with a separate GET message.
   */
  SEE_OTHER = 303,

  /**
   * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
   * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
   */
  NOT_MODIFIED = 304,

  /**
   * SINCE HTTP/1.1
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
   */
  USE_PROXY = 305,

  /**
   * No longer used. Originally meant "Subsequent requests should use the specified proxy."
   */
  SWITCH_PROXY = 306,

  /**
   * SINCE HTTP/1.1
   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
   * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
   * For example, a POST request should be repeated using another POST request.
   */
  TEMPORARY_REDIRECT = 307,

  /**
   * The request and all future requests should be repeated using another URI.
   * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
   */
  PERMANENT_REDIRECT = 308,

  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
   */
  BAD_REQUEST = 400,

  /**
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
   * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
   * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
   * "unauthenticated",i.e. the user does not have the necessary credentials.
   */
  UNAUTHORIZED = 401,

  /**
   * Reserved for future use. The original intention was that this code might be used as part of some form of digital
   * cash or micro payment scheme, but that has not happened, and this code is not usually used.
   * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.
   */
  PAYMENT_REQUIRED = 402,

  /**
   * The request was valid, but the server is refusing action.
   * The user might not have the necessary permissions for a resource.
   */
  FORBIDDEN = 403,

  /**
   * The requested resource could not be found but may be available in the future.
   * Subsequent requests by the client are permissible.
   */
  NOT_FOUND = 404,

  /**
   * A request method is not supported for the requested resource;
   * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE = 406,

  /**
   * The client must first authenticate itself with the proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * The server timed out waiting for the request.
   * According to HTTP specifications:
   * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
   */
  REQUEST_TIMEOUT = 408,

  /**
   * Indicates that the request could not be processed because of conflict in the request,
   * such as an edit conflict between multiple simultaneous updates.
   */
  CONFLICT = 409,

  /**
   * Indicates that the resource requested is no longer available and will not be available again.
   * This should be used when a resource has been intentionally removed and the resource should be purged.
   * Upon receiving a 410 status code, the client should not request the resource in the future.
   * Clients such as search engines should remove the resource from their indices.
   * Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
   */
  GONE = 410,

  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LENGTH_REQUIRED = 411,

  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PRECONDITION_FAILED = 412,

  /**
   * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
   */
  PAYLOAD_TOO_LARGE = 413,

  /**
   * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,
   * in which case it should be converted to a POST request.
   * Called "Request-URI Too Long" previously.
   */
  URI_TOO_LONG = 414,

  /**
   * The request entity has a media type which the server or resource does not support.
   * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
   */
  UNSUPPORTED_MEDIA_TYPE = 415,

  /**
   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   * For example, if the client asked for a part of the file that lies beyond the end of the file.
   * Called "Requested Range Not Satisfiable" previously.
   */
  RANGE_NOT_SATISFIABLE = 416,

  /**
   * The server cannot meet the requirements of the Expect request-header field.
   */
  EXPECTATION_FAILED = 417,

  /**
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,
   * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by
   * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.
   */
  I_AM_A_TEAPOT = 418,

  /**
   * The request was directed at a server that is not able to produce a response (for example because a connection reuse).
   */
  MISDIRECTED_REQUEST = 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * The resource that is being accessed is locked.
   */
  LOCKED = 423,

  /**
   * The request failed due to failure of a previous request (e.g., a PROPPATCH).
   */
  FAILED_DEPENDENCY = 424,

  /**
   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
   */
  UPGRADE_REQUIRED = 426,

  /**
   * The origin server requires the request to be conditional.
   * Intended to prevent "the 'lost update' problem, where a client
   * GETs a resource's state, modifies it, and PUTs it back to the server,
   * when meanwhile a third party has modified the state on the server, leading to a conflict."
   */
  PRECONDITION_REQUIRED = 428,

  /**
   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * The server is unwilling to process the request because either an individual header field,
   * or all the header fields collectively, are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

  /**
   * A server operator has received a legal demand to deny access to a resource or to a set of resources
   * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  /**
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   * Usually this implies future availability (e.g., a new feature of a web-service API).
   */
  NOT_IMPLEMENTED = 501,

  /**
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   * Generally, this is a temporary state.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * The server does not support the HTTP protocol version used in the request
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,

  /**
   * Transparent content negotiation for the request results in a circular reference.
   */
  VARIANT_ALSO_NEGOTIATES = 506,

  /**
   * The server is unable to store the representation needed to complete the request.
   */
  INSUFFICIENT_STORAGE = 507,

  /**
   * The server detected an infinite loop while processing the request.
   */
  LOOP_DETECTED = 508,

  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NOT_EXTENDED = 510,

  /**
   * The client needs to authenticate to gain network access.
   * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
   * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export type FollowStatus = "following" | "requested" | "none";

export type PostType = "photo" | "video" | "moments";

export type AccountSuggestionType = "new" | "nearby" | "popular" | "foryou";

export type AppError = {
  code: string;
  message: string;
  cause: string;
};

/**generic type to represent hashtag and location response */
export type HashTagAndLocationResponseParams = {
  /**name of the hashtag or location */
  name: string;
  /**number of posts created using this location or hashtag */
  noOfPosts: number;
};

/**type that represents a photo*/
export type PhotoResponseParams = {
  /**uri link of the photo */
  uri: string;
  previewUri: string;
  /**aspect ratio of the original and its preview */
  aspectRatio: number;
};

/**type that represents a video */
export type VideoResponseParams = {
  /**duration of the video in milliseconds */
  duration: number;
  /**true if no audio stream is available in the video */
  isMuted: boolean;
} & PhotoResponseParams;

export type MemoryResponseParams = {
  /**unique id of the memory */
  id: string;
  /**created timestamp*/
  timestamp: number;
  /**orginal video data*/
  video: VideoResponseParams;
  /**audio related metadata used in the video */
  audio?: {
    isAvailable: boolean;
    usedSection?: {
      /**statrting timestamp */
      from: number;
      /**stoping timestamp */
      to: number;
    };
    clipLengths?: number[];
    params?: AudioResponseParams;
  };
  /**captions written in the story */
  captions?: {
    /**text content of the caption */
    content: string;
    /**animation used when the caption is mounted */
    animation?: {
      /**name of the animation */
      name: "fade" | "bounce" | "zoom" | "rotate" | "slide";
      /**type of the animation */
      type: string;
    };
    /**colors used in foreground and background*/
    color: {
      /**type of background used */
      background:
        | "semi-transparent-background"
        | "transparent-background"
        | "white-background"
        | "colored-background";
      /**hexcode color used in foreground or background*/
      value: string;
    };
    /**transform properties used to layout the caption*/
    transform: {
      /**rotation in deg*/
      rotation: number;
      /**zoom sclae */
      scale: number;
      /**absolute position coordinates*/
      position: {
        /**x coordinates*/
        x: number;
        /**y coordinates*/
        y: number;
      };
    };
  }[];
  hasSeen: boolean;
};

/**response type  to represent an account */
export type AccountResponseParams = {
  /**unique id generated by server */
  id: string;
  /**unique username provided by the account holder */
  username: string;
  isActiveAccount: boolean;
  /**link to the profile picture */
  profilePictureUri: string;
  /**fullname of the account holder */
  fullname: string;
  followingStatus?: FollowStatus;
  /**true if the  target account follows the requesting account*/
  followerStatus?: FollowStatus;
  /**holds additional information about the following user's personalisation */
  followingInfo?: {
    /**true if the requesting account has added the target account to favourite */
    isFavourite: boolean;
    muteStatus: {
      /**true if memories has been muted */
      memory: boolean;
      /**true if posts has been muted */
      post: boolean;
    };
  };
  /**total number of followers of this account */
  noOfFollowers?: number;
  /**total number of posts uploaded from this account */
  noOfPosts?: number;
  /**true if the account is private */
  isPrivate?: boolean;
  /**memory details */
  memoryInfo?: {
    /**toatl number of memories uploaded in last 24 hours */
    noOfAvailableMemories: number;
    /**true if any of the memories uploaded in last 24 hours is unseen by the requesting account */
    hasUnseenMemories: boolean;
    /**all the memories uploaded in last 24 hours */
    memories?: MemoryResponseParams[];
    posterUri?: string;
  };
  mediaUris?: string[];
};

/**type to represent an audio */
export type AudioResponseParams = {
  /**unique id generated by server */
  id: string;
  /**title of the audio provided by the artist */
  title: string;
  /**name of the artist */
  artistName: string;
  /**account information of the artist if available
   * include only required parameters
   */
  artistAccount?: AccountResponseParams;
  /**uri of the poster of the audio */
  posterUri: string;
  /**uri to play the audio */
  mediaUri?: string;
  /**duration of the audio */
  duration?: number;
  /**section of the audio to play as preview */
  previewSection?: {
    /**time to start the preview from */
    from: number;
    /**time to stop the preview */
    to: number;
  };
  /**total number of photos and videos created with this audio */
  noOfPhotosAndMoments?: number;
  /**true if the audio is added to favourite by the requesting account */
  isSaved?: boolean;
};

export type PostResponseParams = {
  /**unique id generated by server */
  id: string;
  /**media data in this post */
  postType: PostType;
  /**upload timestamp of the post */
  timestamp: number;
  /**true if the post is edited  by the author*/
  isEdited: boolean;
  /**account that uploaded the post
   * include following optional paramaters - memoryInfo, followingInfo, isPrivate, hasRequested, isFollowing
   */
  author: AccountResponseParams;
  /**name of the location added to the post */
  location?: string;
  /**caption text added to the post */
  caption?: string;
  /**true if the requesting account has saved the post */
  isSaved: boolean;
  /**true if the requesting account has liked the post */
  isLiked: boolean;
  /**advanced options related to post metadata that is only mutable by author */
  advancedOptions: {
    /**true if the author has pinned the post to account grids */
    isPinned: boolean;
    /**true if comments is disabled on this post */
    commentsDisabled: boolean;
    /**true if number of likes and views are hidden for this post */
    hideLikesAndViewsCount: boolean;
    /**true if this post cannot be shared to memories */
    shareToMemoryDisabled: boolean;
    /**true if link sharing of this post is disabled */
    shareLinkDisabled: boolean;
  };
  /**metadata about the likes and views of the post */
  likesAndViews?: {
    /**total no of likes in the post */
    noOfLikes: number;
    /**total no of views in the post, only available to video posts */
    noOfViews: number;
    /**couple of account informations
     * only include required params
     */
    likesFromFollowingAccounts?: AccountResponseParams[];
  };
  /**metadata about the comments on this post */
  comments?: {
    /**total number of comments in the post */
    noOfComments: number;
    /**couple of recent comments */
    topComments: CommentResponseParams[];
  };
  /**video data of the post, if available */
  video?: {
    momentParams?: {
      /**information about the orginal post */
      remixedWith?: {
        /**id of the original post */
        id: string;
        /**username of the author of the original post */
        username: string;
      };
      /**true if this video can be remixed, always false in case its a remixed video */
      remixEnabled: boolean;
      clipLengths?: number[];
    };
  } & VideoResponseParams;
  /**photo data of the post, if available */
  photos?: ({
    stickyMentionPositions?: {
      id: string;
      x: number;
      y: number;
    }[];
  } & PhotoResponseParams)[];
  /**audio related metadata used in the photo or video */
  audio?: {
    isAvailable: boolean;
    usedSection?: {
      /**statrting timestamp */
      from: number;
      /**stoping timestamp */
      to: number;
    };
    params?: AudioResponseParams;
  };
  /**mentions in the posts
   * include following params - fullname, memoryInfo, isFollowing
   */
  mentions?: AccountResponseParams[];
};

/**type to represent comment replies from posts */
export type ReplyResponseParams = {
  /**unique id generated by server */
  id: string;
  /**text content */
  content: string;
  /**upload timestamp of the reply */
  timestamp: number;
  /**account, that uploaded the reply
   * include following optional params - memoryInfo
   */
  author: AccountResponseParams;
  /**total number of likes in the reply */
  noOfLikes: number;
  /**true if the requesting account liked the reply */
  isLiked: boolean;
};

/**type to represent comments of posts */
export type CommentResponseParams = {
  /**total number of replies in the comment */
  noOfReplies: number;
  /**a reply of this comment requested by the requesting account */
  requestedReply?: ReplyResponseParams;
  /**true if the author of the post has pinned the comment */
  isPinned: boolean;
} & ReplyResponseParams;

/**parameters needed to represent a page request*/
export type PageRequestBodyParams = {
  /**timestamp upperbound of the page */
  timestamp: number;
  /**starting index of the page */
  offset: number;
  /**length of the page */
  length: number;
};

export type SearchResponseParams = Partial<{
  /**popular keywords to search for */
  keyword: string;
  /**hashtag search result */
  hashtag: HashTagAndLocationResponseParams;
  /**location search result */
  location: HashTagAndLocationResponseParams;
  /**audio search result */
  audio: AudioResponseParams;
  /**account search result
   * include only required parameters
   */
  account: AccountResponseParams;
}>;

export type SearchRequestBodyParams = {
  queryString: string;
};

export type ResponseMetaData<T extends {} = {}> = {
  status: HttpStatusCodes;
  timestamp: number;
} & T;

export type PagePayload<T extends {}> = {
  hasMorePages: boolean;
  data: T[];
};

/**a general type to represent any kind of response body */
export type ResponseBodyParams<P extends {} = {}, M extends {} = {}> = {
  payload?: P;
  meta: ResponseMetaData<M>;
  error?: AppError;
};

export type AccountRequestQueryParams = {
  accountId: string;
};

export type PostRequestQueryParams = {
  postId: string;
};

export type CommentRequestQueryParams = {
  commentId: string;
} & PostRequestQueryParams;

export type ReplyRequestQueryParams = {
  replyId: string;
} & CommentRequestQueryParams;

export type ReplyPageResponseBodyParams = ResponseBodyParams<
  PagePayload<ReplyResponseParams>,
  { pageArgs: PageRequestBodyParams; commentArgs: CommentRequestQueryParams }
>;

export type CommentPageResponseBodyParams = ResponseBodyParams<
  PagePayload<CommentResponseParams>,
  { pageArgs: PageRequestBodyParams; postArgs: PostRequestQueryParams }
>;

export type AccountPagePayload = PagePayload<AccountResponseParams>;

export type CommentPagePayload = PagePayload<CommentResponseParams>;

export type AccountPageResponseBodyParams<T extends {} = {}> =
  ResponseBodyParams<
    AccountPagePayload,
    { pageArgs: PageRequestBodyParams } & T
  >;

export type PostPagePayload = {
  postPage: PagePayload<AccountResponseParams>;
  accountSuggestions?: {
    type: AccountSuggestionType;
    suggestions: AccountResponseParams[];
  };
  postSuggestions?: {
    type: PostType;
    suggestions: PostResponseParams;
  };
};

export type PostPageResponseBodyParams<T extends {} = {}> = ResponseBodyParams<
  PostPagePayload,
  { pageArgs: PageRequestBodyParams } & T
>;

export type PostSearchResponseBodyParams =
  PostPageResponseBodyParams<SearchRequestBodyParams>;

export type SearchResponseBodyParams = ResponseBodyParams<
  SearchResponseParams[],
  SearchRequestBodyParams
>;

export type HomeFeedResponseBodyParams = ResponseBodyParams<{
  postPage: PostPagePayload;
  accountPage: AccountPagePayload;
  activeAccountInfo: AccountResponseParams;
  recentSearches: SearchResponseParams[];
}>;

export type HashTagRouteResponseBodyParams = ResponseBodyParams<
  {
    topPosts: PostPagePayload;
    recentPosts: PostPagePayload;
  } & HashTagAndLocationResponseParams
>;

export type LocationRouteResponseBodyParams = ResponseBodyParams<
  {
    topPosts: PostPagePayload;
    recentPosts: PostPagePayload;
    accounts: AccountResponseParams[];
  } & HashTagAndLocationResponseParams
>;

export type AudioRouteResponseBodyParams = ResponseBodyParams<
  {
    photos: PostPagePayload;
    moments: PostPagePayload;
  } & AudioResponseParams
>;

export type RequestArg = {
  url: string;
  method: "PUT" | "DELETE";
  body: {};
};

export type AccountListResponseBodyParams<T extends {} = {}> =
  ResponseBodyParams<AccountResponseParams[], T>;

export type TextRequestBodyParams = {
  content: string;
};

export type PostSendRequestBodyParams = AccountRequestQueryParams &
  TextRequestBodyParams;

export type FolderParams = {
  folder: string;
};

export type PostRouteResponseBodyParams = ResponseBodyParams<
  {
    commentPage: CommentPagePayload;
    post: PostResponseParams;
  },
  PostRequestQueryParams
>;
