import {
  AccountResponseParams,
  AudioResponseParams,
  CommentResponseParams,
  HashTagAndLocationResponseParams,
  MemoryResponseParams,
  PostResponseParams,
  PostType,
  ReplyResponseParams,
  SearchResponseParams,
} from "../types";
import { userNameData } from "./data/userName";
import randomNumberGenerator from "../utils/randomNumber";
import { photosData } from "./data/photos";
import { userIdData } from "./data/userId";
import { locationsData } from "./data/location";
import { captionsData } from "./data/captions";
import { audiosData } from "./data/audios";
import { videosData } from "./data/videos";

/**
 * @description generates a fake account response on the fly
 * @returns an account response object
 */

function generateMemoryResponse(): MemoryResponseParams {
  const id: string = "_id" + Date.now();
  const timestamp: number = Date.now();
  let videoItem = videosData[randomNumberGenerator(0, videosData.length - 1)];
  let photoItem = photosData[randomNumberGenerator(0, photosData.length - 1)];
  const video = {
    duration: videoItem.duration * 1000,
    isMuted: randomNumberGenerator(0, 1) ? true : false,
    uri: videoItem.url,
    previewUri: photoItem.url,
    aspectRatio: videoItem.width / videoItem.height,
  };
  let audioInfo = generateAudioResponse(undefined, true);
  let hasAudio = randomNumberGenerator(0, 1) ? true : false;
  const audio = randomNumberGenerator(0, 1)
    ? {
        isAvailable: hasAudio,
        usedSection: hasAudio
          ? {
              from:
                audioInfo.previewSection !== undefined
                  ? audioInfo.previewSection.from
                  : 0,
              to:
                audioInfo.previewSection !== undefined
                  ? audioInfo.previewSection.to
                  : 0,
            }
          : undefined,
        clipLengths: undefined,
        params: hasAudio ? audioInfo : undefined,
      }
    : undefined;
  let captionList = [];
  let animationName: "fade" | "bounce" | "zoom" | "rotate" | "slide" = "fade";
  let backgroundColor:
    | "semi-transparent-background"
    | "transparent-background"
    | "white-background"
    | "colored-background" = "semi-transparent-background";
  for (let i = 0; i < randomNumberGenerator(1, 5); i++) {
    let caption = {
      content: captionsData[randomNumberGenerator(0, captionsData.length - 1)],
      animation: randomNumberGenerator(0, 1)
        ? {
            name: animationName,
            type: "",
          }
        : undefined,
      color: {
        background: backgroundColor,
        value: "",
      },
      transform: {
        rotation: randomNumberGenerator(0, 360),
        scale: 1,
        position: {
          x: 0,
          y: 0,
        },
      },
    };
    captionList.push(caption);
  }
  const captions = randomNumberGenerator(0, 1) ? captionList : undefined;
  const hasSeen = randomNumberGenerator(0, 1) ? true : false;

  return {
    id,
    timestamp,
    video,
    audio,
    captions,
    hasSeen,
  };
}

function generateMemoryResponses(count: number): MemoryResponseParams[] {
  const memories: MemoryResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    let memory = generateMemoryResponse();
    memories.push(memory);
  }
  return memories;
}

export function generateAccountResponse(
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): AccountResponseParams {
  const id = "_id" + Date.now();
  const username = userIdData[randomNumberGenerator(0, userIdData.length - 1)];
  const isActiveAccount = randomNumberGenerator(0, 1) ? true : false;
  const profilePictureUri =
    photosData[randomNumberGenerator(0, photosData.length - 1)].url;
  const fullname =
    userNameData[randomNumberGenerator(0, userNameData.length - 1)];
  const followingStatus = hasFollowingStatusAttribute
    ? randomNumberGenerator(0, 1)
      ? "following"
      : randomNumberGenerator(0, 1)
      ? "requested"
      : "none"
    : undefined;
  const followerStatus = hasFollowerStatusAttribute
    ? randomNumberGenerator(0, 1)
      ? "following"
      : randomNumberGenerator(0, 1)
      ? "requested"
      : "none"
    : undefined;
  const followingInfo = hasFollowingInfoAttribute
    ? followingStatus === "following"
      ? {
          isFavourite: randomNumberGenerator(0, 1) ? true : false,
          muteStatus: {
            memory: randomNumberGenerator(0, 1) ? true : false,
            post: randomNumberGenerator(0, 1) ? true : false,
          },
        }
      : undefined
    : undefined;
  const noOfFollowers = hasNoOfFollowersAttribute
    ? randomNumberGenerator(0, 100000)
    : undefined;
  const noOfPosts = hasNoOfPostsAttribute
    ? randomNumberGenerator(0, 500)
    : undefined;
  const isPrivate = hasIsPrivateAttribute
    ? randomNumberGenerator(0, 1)
      ? true
      : false
    : undefined;
  let availableMemories = randomNumberGenerator(1, 3);
  const memoryInfo =
    hasMemoryInfoAttribute && !isPrivate
      ? {
          noOfAvailableMemories: availableMemories,
          hasUnseenMemories: randomNumberGenerator(0, 1) ? true : false,
          memories: generateMemoryResponses(availableMemories),
          posterUri:
            photosData[randomNumberGenerator(0, photosData.length - 1)].url,
        }
      : undefined;
  const mediaUris = hasMediaUrisAttribute
    ? [
        photosData[randomNumberGenerator(0, photosData.length - 1)].url,
        photosData[randomNumberGenerator(0, photosData.length - 1)].url,
        photosData[randomNumberGenerator(0, photosData.length - 1)].url,
      ]
    : undefined;
  return {
    id,
    username,
    isActiveAccount,
    profilePictureUri,
    fullname,
    followingStatus,
    followerStatus,
    followingInfo,
    noOfFollowers,
    noOfPosts,
    isPrivate,
    memoryInfo,
    mediaUris,
  };
}

/**
 * @description generates a list of fake account response
 * @argument count: number of account to return
 * @returns an array of account response object of the specified length
 */
export function generateAccountResponses(
  count: number,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): AccountResponseParams[] {
  let accountsResponses: AccountResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    accountsResponses.push(
      generateAccountResponse(
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    );
  }
  return accountsResponses;
}

/**
 * @description generates a fake post response on the fly
 * @argument type : to specify the media type of the post, it will be randomly choosen if not provided
 * @argument isMoment: to specify if the video if choosen is a moment or normal, choosen randomly in case not provided and media type is video
 * @returns a post response object
 */
export function generatePostResponse(
  postTypeAttribute?: PostType,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean,
  hasLocationAttribute?: boolean,
  hasCaptionAttribute?: boolean,
  hasLikesAndViewsAttribute?: boolean,
  hasLikesFromFollowingAccountsAttribute?: boolean,
  hasCommentsAttribute?: boolean,
  hasRequestedReplyAttribute?: boolean,
  hasRemixAttribute?: boolean,
  hasTemplateAttribute?: boolean,
  hasStickyMentionsAttribute?: boolean,
  hasAudioRelatedInfoAttribute?: boolean,
  hasAudioUriAttribute?: boolean,
  hasDurationAttribute?: boolean,
  hasPreviewSectionAttribute?: boolean
): PostResponseParams {
  const id = "_id" + Date.now();
  const postType =
    postTypeAttribute === undefined
      ? randomNumberGenerator(0, 1)
        ? "photo"
        : randomNumberGenerator(0, 1)
        ? "video"
        : "moments"
      : postTypeAttribute;
  const timestamp = Date.now();
  const isEdited = randomNumberGenerator(0, 1) ? true : false;
  const author = generateAccountResponse(
    hasFollowingStatusAttribute,
    hasFollowerStatusAttribute,
    hasFollowingInfoAttribute,
    hasNoOfFollowersAttribute,
    hasNoOfPostsAttribute,
    hasIsPrivateAttribute,
    hasMemoryInfoAttribute,
    hasMediaUrisAttribute
  );
  const location = hasLocationAttribute
    ? locationsData[randomNumberGenerator(0, locationsData.length - 1)]
    : undefined;
  const caption = hasCaptionAttribute
    ? captionsData[randomNumberGenerator(0, captionsData.length - 1)]
    : undefined;
  const isSaved = randomNumberGenerator(0, 1) ? true : false;
  const isLiked = randomNumberGenerator(0, 1) ? true : false;
  const advancedOptions = {
    isPinned: randomNumberGenerator(0, 1) ? true : false,
    commentsDisabled: randomNumberGenerator(0, 1) ? true : false,
    hideLikesAndViewsCount: randomNumberGenerator(0, 1) ? true : false,
    shareToMemoryDisabled: randomNumberGenerator(0, 1) ? true : false,
    shareLinkDisabled: randomNumberGenerator(0, 1) ? true : false,
  };
  const likesAndViews = hasLikesAndViewsAttribute
    ? {
        noOfLikes: randomNumberGenerator(0, 100000),
        noOfViews: randomNumberGenerator(0, 1000000),
        likesfromFollowingAccounts: hasLikesFromFollowingAccountsAttribute
          ? {
              noOfLikes: randomNumberGenerator(0, 100),
              topAccounts: generateAccountResponses(3),
            }
          : undefined,
      }
    : undefined;
  const comments = hasCommentsAttribute
    ? {
        noOfComments: randomNumberGenerator(0, 200),
        topComments: generateCommentResponses(
          3,
          hasRequestedReplyAttribute,
          hasFollowingStatusAttribute,
          hasFollowerStatusAttribute,
          hasFollowingInfoAttribute,
          hasNoOfFollowersAttribute,
          hasNoOfPostsAttribute,
          hasIsPrivateAttribute,
          hasMemoryInfoAttribute,
          hasMediaUrisAttribute
        ),
      }
    : undefined;
  let clipLength: number[] = [];
  let noOfClips = randomNumberGenerator(3, 15);
  for (let i = 0; i < noOfClips; i++) {
    clipLength.push(randomNumberGenerator(300, 5000));
  }
  let photoItem = photosData[randomNumberGenerator(0, photosData.length - 1)];
  let videoItem = videosData[randomNumberGenerator(0, videosData.length - 1)];
  let videoRelatedData = {
    momentParams:
      postType === "moments"
        ? {
            remixedWith: hasRemixAttribute
              ? { id: author.id, username: author.username }
              : undefined,
            remixEnabled: randomNumberGenerator(0, 1) ? true : false,
            clipLengths: hasTemplateAttribute ? clipLength : undefined,
          }
        : undefined,
    media: {
      duration: videoItem.duration * 1000,
      isMuted: randomNumberGenerator(0, 1) ? true : false,
      uri: videoItem.url,
      previewUri: photoItem.url,
      aspectRatio: videoItem.width / videoItem.height,
    },
  };
  const video =
    postType === "video" || postType === "moments"
      ? videoRelatedData
      : undefined;
  let stickyList = [];
  let photoList = [];
  if (hasStickyMentionsAttribute) {
    for (let i = 0; i < randomNumberGenerator(1, 15); i++) {
      let stickyMention = {
        id: userIdData[randomNumberGenerator(0, userIdData.length - 1)],
        x: 0,
        y: 0,
      };
      stickyList.push(stickyMention);
    }
  }
  for (let i = 0; i < randomNumberGenerator(1, 10); i++) {
    let photo = photosData[randomNumberGenerator(0, photosData.length - 1)];
    let photoItem = {
      stickyMentions: hasStickyMentionsAttribute ? stickyList : undefined,
      media: {
        uri: photo.url,
        previewUri: photo.url,
        aspectRatio: photo.width / photo.height,
      },
    };
    photoList.push(photoItem);
  }
  let data = {
    data: photoList,
  };
  const photo = postType === "photo" ? data : undefined;
  let audioInfo = generateAudioResponse(
    undefined,
    hasAudioUriAttribute,
    hasDurationAttribute,
    hasPreviewSectionAttribute
  );
  let audioAvailable = randomNumberGenerator(0, 1) ? true : false;
  const audio =
    postType === "video"
      ? undefined
      : hasAudioRelatedInfoAttribute
      ? {
          isAvailable: audioAvailable,
          usedSection: audioAvailable
            ? {
                from:
                  audioInfo.previewSection !== undefined
                    ? audioInfo.previewSection.from
                    : 0,
                to:
                  audioInfo.previewSection !== undefined
                    ? postType === "moments"
                      ? audioInfo.previewSection.from + videoItem.duration
                      : audioInfo.previewSection.to
                    : 0,
              }
            : undefined,
          params: audioAvailable ? audioInfo : undefined,
        }
      : undefined;
  let mentionCount = randomNumberGenerator(0, 10);
  const mentions = generateAccountResponses(mentionCount);
  return {
    id,
    timestamp,
    isEdited,
    author,
    location,
    caption,
    isSaved,
    isLiked,
    advancedOptions,
    likesAndViews,
    comments,
    video,
    photo,
    audio,
    mentions,
  };
}
/**
 * @description generates a list of fake post data
 * @argument count: number of post to return
 * @argument type : to specify the media type of the post, it will be randomly choosen if not provided
 * @argument isMoment: to specify if the video if choosen is a moment or normal, choosen randomly in case not provided and media type is video
 * @returns an array of post response object of the specified length
 */
export function generatePostResponses(
  count: number,
  postTypeAttribute?: PostType,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean,
  hasLocationAttribute?: boolean,
  hasCaptionAttribute?: boolean,
  hasLikesAndViewsAttribute?: boolean,
  hasLikesFromFollowingAccountsAttribute?: boolean,
  hasCommentsAttribute?: boolean,
  hasRequestedReplyAttribute?: boolean,
  hasRemixAttribute?: boolean,
  hasTemplateAttribute?: boolean,
  hasStickyMentionsAttribute?: boolean,
  hasAudioRelatedInfoAttribute?: boolean,
  hasAudioUriAttribute?: boolean,
  hasDurationAttribute?: boolean,
  hasPreviewSectionAttribute?: boolean
): PostResponseParams[] {
  let postResponses: PostResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    postResponses.push(
      generatePostResponse(
        postTypeAttribute,
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute,
        hasLocationAttribute,
        hasCaptionAttribute,
        hasLikesAndViewsAttribute,
        hasLikesFromFollowingAccountsAttribute,
        hasCommentsAttribute,
        hasRequestedReplyAttribute,
        hasRemixAttribute,
        hasTemplateAttribute,
        hasStickyMentionsAttribute,
        hasAudioRelatedInfoAttribute,
        hasAudioUriAttribute,
        hasDurationAttribute,
        hasPreviewSectionAttribute
      )
    );
  }
  return postResponses;
}

/**
 * @description generates a fake reply response on the fly
 * @returns a reply response object
 */
export function generateReplyResponse(
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): ReplyResponseParams {
  const id = "_id" + Date.now();
  const content =
    captionsData[randomNumberGenerator(0, captionsData.length - 1)];
  const timestamp = Date.now();
  const author = generateAccountResponse(
    hasFollowingStatusAttribute,
    hasFollowerStatusAttribute,
    hasFollowingInfoAttribute,
    hasNoOfFollowersAttribute,
    hasNoOfPostsAttribute,
    hasIsPrivateAttribute,
    hasMemoryInfoAttribute,
    hasMediaUrisAttribute
  );
  const noOfLikes = randomNumberGenerator(0, 100000);
  const isLiked = randomNumberGenerator(0, 1) ? true : false;
  return { id, content, timestamp, author, noOfLikes, isLiked };
}

/**
 * @description generates a list of fake reply response
 * @argument count: number of reply to return
 * @returns an array of reply response object of the specified length
 */
export function generateReplyResponses(
  count: number,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): ReplyResponseParams[] {
  let replyResponses: ReplyResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    replyResponses.push(
      generateReplyResponse(
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    );
  }
  return replyResponses;
}

/**
 * @description generates a fake comment response on the fly
 * @returns a comment response object
 */
export function generateCommentResponse(
  hasRequestedReplyAttribute?: boolean,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): CommentResponseParams {
  const noOfReplies = randomNumberGenerator(0, 30);
  const requestedReply = hasRequestedReplyAttribute
    ? generateReplyResponse(
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    : undefined;
  let isPinned = randomNumberGenerator(0, 1) ? true : false;
  const { id, content, timestamp, author, noOfLikes, isLiked } =
    generateReplyResponse(
      hasFollowingStatusAttribute,
      hasFollowerStatusAttribute,
      hasFollowingInfoAttribute,
      hasNoOfFollowersAttribute,
      hasNoOfPostsAttribute,
      hasIsPrivateAttribute,
      hasMemoryInfoAttribute,
      hasMediaUrisAttribute
    );
  return {
    id,
    content,
    timestamp,
    author,
    noOfLikes,
    isLiked,
    noOfReplies,
    requestedReply,
    isPinned,
  };
}

/**
 * @description generates a list of fake comment response
 * @argument count: number of comments to return
 * @returns an array of comment response object of the specified length
 */
export function generateCommentResponses(
  count: number,
  hasRequestedReplyAttribute?: boolean,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): CommentResponseParams[] {
  let commentResponses: CommentResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    commentResponses.push(
      generateCommentResponse(
        hasRequestedReplyAttribute,
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    );
  }
  return commentResponses;
}

/**
 * @description generates a fake audio response on the fly
 * @returns an audio response object
 */

export function generateAudioResponse(
  hasArtistAccountAttribute?: boolean,
  hasAudioUriAttribute?: boolean,
  hasDurationAttribute?: boolean,
  hasPreviewSectionAttribute?: boolean,
  hasPhotosAndMomentsAttribute?: boolean,
  hasIsSavedAttribute?: boolean,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): AudioResponseParams {
  const id = "_id" + Date.now();
  let audio = audiosData[randomNumberGenerator(0, audiosData.length - 1)];
  const title = audio.title;
  const artistName = audio.artist;
  const artistAccount = hasArtistAccountAttribute
    ? generateAccountResponse(
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    : undefined;
  const posterUri =
    photosData[randomNumberGenerator(0, photosData.length - 1)].url;
  const mediaUri = hasAudioUriAttribute ? audio.url : undefined;
  const duration = hasDurationAttribute ? audio.duration * 1000 : undefined;
  let clipDuration = randomNumberGenerator(5000, 59999);
  let previewStart = randomNumberGenerator(
    0,
    audio.duration * 1000 - clipDuration
  );
  const previewSection = hasPreviewSectionAttribute
    ? { from: previewStart, to: previewStart + clipDuration }
    : undefined;
  const noOfPhotosAndMoments = hasPhotosAndMomentsAttribute
    ? randomNumberGenerator(1, 100000)
    : undefined;
  const isSaved = hasIsSavedAttribute
    ? randomNumberGenerator(0, 1)
      ? true
      : false
    : undefined;

  return {
    id,
    title,
    artistName,
    posterUri,
    artistAccount,
    duration,
    isSaved,
    mediaUri,
    noOfPhotosAndMoments,
    previewSection,
  };
}

/**
 * @description generates a list of fake audio response
 * @argument count: number of audio to return
 * @returns an array of audio response object of the specified length
 */
export function generateAudioResponses(
  count: number,
  hasArtistAccountAttribute?: boolean,
  hasMediaUriAttribute?: boolean,
  hasDurationAttribute?: boolean,
  hasPreviewSectionAttribute?: boolean,
  hasPhotosAndMomentsAttribute?: boolean,
  hasIsSavedAttribute?: boolean,
  hasFollowingStatusAttribute?: boolean,
  hasFollowerStatusAttribute?: boolean,
  hasFollowingInfoAttribute?: boolean,
  hasNoOfFollowersAttribute?: boolean,
  hasNoOfPostsAttribute?: boolean,
  hasIsPrivateAttribute?: boolean,
  hasMemoryInfoAttribute?: boolean,
  hasMediaUrisAttribute?: boolean
): AudioResponseParams[] {
  let audioResponses: AudioResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    audioResponses.push(
      generateAudioResponse(
        hasArtistAccountAttribute,
        hasMediaUriAttribute,
        hasDurationAttribute,
        hasPreviewSectionAttribute,
        hasPhotosAndMomentsAttribute,
        hasIsSavedAttribute,
        hasFollowingStatusAttribute,
        hasFollowerStatusAttribute,
        hasFollowingInfoAttribute,
        hasNoOfFollowersAttribute,
        hasNoOfPostsAttribute,
        hasIsPrivateAttribute,
        hasMemoryInfoAttribute,
        hasMediaUrisAttribute
      )
    );
  }
  return audioResponses;
}

export function generateHashTagLocationResponses(): HashTagAndLocationResponseParams[] {
  let result: HashTagAndLocationResponseParams[] = [];
  for (let i = 0; i < 30; i++) {
    let data = {
      name: locationsData[randomNumberGenerator(0, locationsData.length - 1)],
      noOfPosts: randomNumberGenerator(0, 10000),
    };
    result.push(data);
  }
  return result;
}

export function generateSearchResponse(
  hasKeywordAttribute?: boolean,
  hasHashtagAttribute?: boolean,
  hasLocationAttribute?: boolean,
  hasAudioAttribute?: boolean,
  hasAccountAttribute?: boolean
): SearchResponseParams {
  const keyword: string | undefined = hasKeywordAttribute
    ? userIdData[randomNumberGenerator(0, userIdData.length - 1)]
    : undefined;
  const hashtag: HashTagAndLocationResponseParams | undefined =
    hasHashtagAttribute
      ? {
          name: locationsData[
            randomNumberGenerator(0, locationsData.length - 1)
          ],
          noOfPosts: randomNumberGenerator(0, 10000),
        }
      : undefined;
  const location: HashTagAndLocationResponseParams | undefined =
    hasLocationAttribute
      ? {
          name: locationsData[
            randomNumberGenerator(0, locationsData.length - 1)
          ],
          noOfPosts: randomNumberGenerator(0, 1000),
        }
      : undefined;
  const audio: AudioResponseParams | undefined = hasAudioAttribute
    ? generateAudioResponse()
    : undefined;
  const account = hasAccountAttribute
    ? generateAccountResponse(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        true,
        undefined
      )
    : undefined;

  return {
    account,
    audio,
    hashtag,
    keyword,
    location,
  };
}

export function generateSearchResponses(
  count: number,
  hasKeywordAttribute?: boolean,
  hasHashtagAttribute?: boolean,
  hasLocationAttribute?: boolean,
  hasAudioAttribute?: boolean,
  hasAccountAttribute?: boolean
): SearchResponseParams[] {
  let searchData: SearchResponseParams[] = [];
  for (let i = 0; i < count; i++) {
    const data = generateSearchResponse(
      hasKeywordAttribute,
      hasHashtagAttribute,
      hasLocationAttribute,
      hasAudioAttribute,
      hasAccountAttribute
    );
    searchData.push(data);
  }
  return searchData;
}
