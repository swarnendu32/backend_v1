import {
    AccountResponseParams,
    AudioResponseParams,
    CommentResponseParams,
    MediaType,
    PostResponseParams,
    ReplyResponseParams,
} from "../types";
import { userName } from "./data/userName";
import randomNumberGenerator from "../util/randomNumber";
import { photosData } from "./data/photos";
import { userId } from "./data/userId";
import { locations } from "./data/location";
import { captions } from "./data/captions";
import { audios } from "./data/audios";
import { videos } from "./data/videos";

/**
 * @description generates a fake account response on the fly
 * @returns an account response object
 */
export function generateAccountResponse(
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean
): AccountResponseParams {
    const id = "_id" + Date.now();
    const username = userId[randomNumberGenerator(0, userId.length - 1)];
    const profilePictureUri =
        photosData[randomNumberGenerator(0, photosData.length - 1)].url;
    const fullname = hasFullName
        ? userName[randomNumberGenerator(0, userName.length - 1)]
        : undefined;
    const isFollowing = hasFollowing
        ? randomNumberGenerator(0, 1)
            ? true
            : false
        : undefined;
    const isFollower = hasFollower
        ? randomNumberGenerator(0, 1)
            ? true
            : false
        : undefined;
    const followingInfo = hasFollowingInfo
        ? isFollowing !== false
            ? {
                  isFavourite: randomNumberGenerator(0, 1) ? true : false,
                  muteStatus: {
                      memory: randomNumberGenerator(0, 1) ? true : false,
                      post: randomNumberGenerator(0, 1) ? true : false,
                  },
              }
            : undefined
        : undefined;
    // const suggestionText = randomNumberGenerator(0, 1)
    //     ? "This account is suggested for some abrupt reasons :("
    //     : undefined;
    const noOfFollowers = hasNoOfFollowers
        ? randomNumberGenerator(0, 100000)
        : undefined;
    const noOfPosts = hasNoOfPosts ? randomNumberGenerator(0, 500) : undefined;
    const topPosts = hasTopPosts
        ? [
              photosData[randomNumberGenerator(0, photosData.length - 1)].url,
              photosData[randomNumberGenerator(0, photosData.length - 1)].url,
              photosData[randomNumberGenerator(0, photosData.length - 1)].url,
          ]
        : undefined;
    const type: "public" | "private" | undefined = hasType
        ? randomNumberGenerator(0, 1)
            ? "public"
            : "private"
        : undefined;
    const hasRequested =
        type === "private"
            ? randomNumberGenerator(0, 1)
                ? true
                : false
            : undefined;

    return {
        id,
        username,
        profilePictureUri,
        fullname,
        isFollowing,
        isFollower,
        followingInfo,
        hasRequested,
        noOfFollowers,
        noOfPosts,
        topPosts,
        type,
    };
}

/**
 * @description generates a list of fake account response
 * @argument count: number of account to return
 * @returns an array of account response object of the specified length
 */
export function generateAccountResponses(
    count: number,
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean
): AccountResponseParams[] {
    let accountsResponses: AccountResponseParams[] = [];
    for (let i = 0; i < count; i++) {
        accountsResponses.push(
            generateAccountResponse(
                hasFullName,
                hasMemories,
                hasFollowing,
                hasFollower,
                hasFollowingInfo,
                hasNoOfFollowers,
                hasNoOfPosts,
                hasTopPosts,
                hasType
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
    mediaType?: MediaType,
    isMoment?: boolean,
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean,
    hasLocation?: boolean,
    hasCaption?: boolean,
    hasLikesAndViews?: boolean,
    hasLikesFromFollowingAccounts?: boolean,
    hasComments?: boolean,
    hasRemix?: boolean,
    hasTemplate?: boolean,
    hasStickyMentions?: boolean,
    hasAudioRelatedInfo?: boolean,
    hasAudio?: boolean,
    hasArtistAccount?: boolean,
    hasMediaUri?: boolean,
    hasLink?: boolean,
    hasDuration?: boolean,
    hasPreviewSection?: boolean,
    hasPhotosAndMoments?: boolean,
    hasIsSaved?: boolean
): PostResponseParams {
    const id = "_id" + Date.now();
    const type =
        mediaType === undefined
            ? randomNumberGenerator(0, 1)
                ? "Photo"
                : "Video"
            : mediaType;
    const timestamp = Date.now();
    const isEdited = randomNumberGenerator(0, 1) ? true : false;
    const author = generateAccountResponse(
        hasFullName,
        hasMemories,
        hasFollowing,
        hasFollower,
        hasFollowingInfo,
        hasNoOfFollowers,
        hasNoOfPosts,
        hasTopPosts,
        hasType
    );
    const location = hasLocation
        ? locations[randomNumberGenerator(0, locations.length - 1)]
        : undefined;
    const caption = hasCaption
        ? captions[randomNumberGenerator(0, captions.length - 1)]
        : undefined;
    const isSaved = randomNumberGenerator(0, 1) ? true : false;
    const isLiked = randomNumberGenerator(0, 1) ? true : false;
    const isPinned = randomNumberGenerator(0, 1) ? true : false;
    const advancedOptions = {
        commentsDisabled: randomNumberGenerator(0, 1) ? true : false,
        hideLikesAndViewsCount: randomNumberGenerator(0, 1) ? true : false,
        shareToMemoryDisabled: randomNumberGenerator(0, 1) ? true : false,
        shareLinkDisabled: randomNumberGenerator(0, 1) ? true : false,
    };
    const likesAndViews = hasLikesAndViews
        ? {
              noOfLikes: randomNumberGenerator(0, 100000),
              noOfViews: randomNumberGenerator(0, 1000000),
              likesfromFollowingAccounts: hasLikesFromFollowingAccounts
                  ? {
                        noOfLikes: randomNumberGenerator(0, 1000),
                        topAccounts: generateAccountResponses(10),
                    }
                  : undefined,
          }
        : undefined;
    const comments = hasComments
        ? {
              noOfComments: randomNumberGenerator(0, 200),
              topComments: generateCommentResponses(10, hasMemories),
          }
        : undefined;
    let media = randomNumberGenerator(0, 1) ? "Photo" : "Video";
    let clipLength: number[] = [];
    let noOfClips = randomNumberGenerator(3, 15);
    for (let i = 0; i < noOfClips; i++) {
        clipLength.push(randomNumberGenerator(300, 5000));
    }
    let photo = photosData[randomNumberGenerator(0, photosData.length - 1)];
    let videoData = videos[randomNumberGenerator(0, videos.length - 1)];
    let videoType =
        isMoment === undefined
            ? randomNumberGenerator(0, 1)
                ? true
                : false
            : isMoment;
    let videoRelatedData = {
        isMoment: videoType,
        momentRelatedInfo: videoType
            ? {
                  remixedWith: hasRemix
                      ? { id: author.id, username: author.username }
                      : undefined,
                  remixEnabled: randomNumberGenerator(0, 1) ? true : false,
                  clipLengths: hasTemplate ? clipLength : undefined,
              }
            : undefined,
        duration: videoData.duration * 1000,
        isMuted: randomNumberGenerator(0, 1) ? true : false,
        uri: videoData.url,
        previewUri: photo.url,
        aspectRatio: videoData.width / videoData.height,
    };
    const video =
        mediaType === undefined
            ? media === "Video"
                ? videoRelatedData
                : undefined
            : mediaType === "Video"
            ? videoRelatedData
            : undefined;
    let stickyList = [];
    let photoList = [];
    if (hasStickyMentions) {
        for (let i = 0; i < randomNumberGenerator(1, 15); i++) {
            let stickyMention = {
                username: userId[randomNumberGenerator(0, userId.length) - 1],
                coord: {
                    x: String(randomNumberGenerator(0, 1080)),
                    y: String(randomNumberGenerator(0, 1920)),
                },
            };
            stickyList.push(stickyMention);
        }
    }
    for (let i = 0; i < randomNumberGenerator(1, 10); i++) {
        let image = photosData[randomNumberGenerator(0, photosData.length - 1)];
        let photoItem = {
            stickyMentions: hasStickyMentions ? stickyList : undefined,
            uri: image.url,
            previewUri: image.url,
            aspectRatio: image.width / image.height,
        };
        photoList.push(photoItem);
    }
    const photos =
        mediaType === undefined
            ? media === "Photo"
                ? photoList
                : undefined
            : mediaType === "Photo"
            ? photoList
            : undefined;
    let audio = generateAudioResponse(
        hasArtistAccount,
        hasMediaUri,
        hasLink,
        hasDuration,
        hasPreviewSection,
        hasPhotosAndMoments,
        hasIsSaved
    );
    const audioRelatedInfo =
        mediaType === "Video" && isMoment === false
            ? undefined
            : hasAudioRelatedInfo
            ? {
                  usedSection: {
                      from:
                          audio.previewSection !== undefined
                              ? audio.previewSection.from
                              : 0,
                      to:
                          audio.previewSection !== undefined
                              ? audio.previewSection.from +
                                (mediaType === undefined
                                    ? randomNumberGenerator(0, 1)
                                        ? videoData.duration
                                        : audio.previewSection.to
                                    : mediaType === "Video"
                                    ? videoData.duration
                                    : audio.previewSection.to)
                              : 0,
                  },
                  audio: hasAudio ? audio : undefined,
              }
            : undefined;
    return {
        id,
        type,
        timestamp,
        isEdited,
        author,
        location,
        caption,
        isSaved,
        isLiked,
        isPinned,
        advancedOptions,
        likesAndViews,
        comments,
        video,
        photos,
        audioRelatedInfo,
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
    mediaType?: MediaType,
    isMoment?: boolean,
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean,
    hasLocation?: boolean,
    hasCaption?: boolean,
    hasLikesAndViews?: boolean,
    hasLikesFromFollowingAccounts?: boolean,
    hasComments?: boolean,
    hasRemix?: boolean,
    hasTemplate?: boolean,
    hasStickyMentions?: boolean,
    hasAudioRelatedInfo?: boolean,
    hasAudio?: boolean,
    hasArtistAccount?: boolean,
    hasMediaUri?: boolean,
    hasLink?: boolean,
    hasDuration?: boolean,
    hasPreviewSection?: boolean,
    hasPhotosAndMoments?: boolean,
    hasIsSaved?: boolean
): PostResponseParams[] {
    let postResponses: PostResponseParams[] = [];
    for (let i = 0; i < count; i++) {
        postResponses.push(
            generatePostResponse(
                mediaType,
                isMoment,
                hasFullName,
                hasMemories,
                hasFollowing,
                hasFollower,
                hasFollowingInfo,
                hasNoOfFollowers,
                hasNoOfPosts,
                hasTopPosts,
                hasType,
                hasLocation,
                hasCaption,
                hasLikesAndViews,
                hasLikesFromFollowingAccounts,
                hasComments,
                hasRemix,
                hasTemplate,
                hasStickyMentions,
                hasAudioRelatedInfo,
                hasAudio,
                hasArtistAccount,
                hasMediaUri,
                hasLink,
                hasDuration,
                hasPreviewSection,
                hasPhotosAndMoments,
                hasIsSaved
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
    hasMemories?: boolean
): ReplyResponseParams {
    const id = "_id" + Date.now();
    const content = captions[randomNumberGenerator(0, captions.length - 1)];
    const timestamp = Date.now();
    const author = generateAccountResponse(hasMemories);
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
    hasMemories?: boolean
): ReplyResponseParams[] {
    let replyResponses: ReplyResponseParams[] = [];
    for (let i = 0; i < count; i++) {
        replyResponses.push(generateReplyResponse(hasMemories));
    }
    return replyResponses;
}

/**
 * @description generates a fake comment response on the fly
 * @returns a comment response object
 */
export function generateCommentResponse(
    hasRequestedReply?: boolean,
    hasMemories?: boolean
): CommentResponseParams {
    let replies = {
        noOfReplies: randomNumberGenerator(0, 30),
        requestedReply: hasRequestedReply
            ? generateReplyResponse(hasMemories)
            : undefined,
    };
    let isPinned = randomNumberGenerator(0, 1) ? true : false;
    const { id, content, timestamp, author, noOfLikes, isLiked } =
        generateReplyResponse(hasMemories);
    return {
        id,
        content,
        timestamp,
        author,
        noOfLikes,
        isLiked,
        replies,
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
    hasRequestedReply?: boolean,
    hasMemories?: boolean
): CommentResponseParams[] {
    let commentResponses: CommentResponseParams[] = [];
    for (let i = 0; i < count; i++) {
        commentResponses.push(
            generateCommentResponse(hasRequestedReply, hasMemories)
        );
    }
    return commentResponses;
}

/**
 * @description generates a fake audio response on the fly
 * @returns an audio response object
 */

export function generateAudioResponse(
    hasArtistAccount?: boolean,
    hasMediaUri?: boolean,
    hasLink?: boolean,
    hasDuration?: boolean,
    hasPreviewSection?: boolean,
    hasPhotosAndMoments?: boolean,
    hasIsSaved?: boolean,
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean
): AudioResponseParams {
    const id = "_id" + Date.now();
    let audio = audios[randomNumberGenerator(0, audios.length - 1)];
    const title = audio.title;
    const artistName = audio.artist;
    const artistAccount = hasArtistAccount
        ? generateAccountResponse(
              hasFullName,
              hasMemories,
              hasFollowing,
              hasFollower,
              hasFollowingInfo,
              hasNoOfFollowers,
              hasNoOfPosts,
              hasTopPosts,
              hasType
          )
        : undefined;
    const posterUri =
        photosData[randomNumberGenerator(0, photosData.length - 1)].url;
    const mediaUri = hasMediaUri ? audio.url : undefined;
    const link = hasLink ? "" : undefined;
    const duration = hasDuration ? audio.duration * 1000 : undefined;
    let clipDuration = randomNumberGenerator(5000, 59999);
    let previewStart = randomNumberGenerator(
        0,
        audio.duration * 1000 - clipDuration
    );
    const previewSection = hasPreviewSection
        ? { from: previewStart, to: previewStart + clipDuration }
        : undefined;
    const noOfPhotosAndMoments = hasPhotosAndMoments
        ? randomNumberGenerator(1, 100000)
        : undefined;
    const isSaved = hasIsSaved
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
        link,
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
    hasArtistAccount?: boolean,
    hasMediaUri?: boolean,
    hasLink?: boolean,
    hasDuration?: boolean,
    hasPreviewSection?: boolean,
    hasPhotosAndMoments?: boolean,
    hasIsSaved?: boolean,
    hasFullName?: boolean,
    hasMemories?: boolean,
    hasFollowing?: boolean,
    hasFollower?: boolean,
    hasFollowingInfo?: boolean,
    hasNoOfFollowers?: boolean,
    hasNoOfPosts?: boolean,
    hasTopPosts?: boolean,
    hasType?: boolean
): AudioResponseParams[] {
    let audioResponses: AudioResponseParams[] = [];
    for (let i = 0; i < count; i++) {
        audioResponses.push(
            generateAudioResponse(
                hasArtistAccount,
                hasMediaUri,
                hasLink,
                hasDuration,
                hasPreviewSection,
                hasPhotosAndMoments,
                hasIsSaved,
                hasFullName,
                hasMemories,
                hasFollowing,
                hasFollower,
                hasFollowingInfo,
                hasNoOfFollowers,
                hasNoOfPosts,
                hasTopPosts,
                hasType
            )
        );
    }
    return audioResponses;
}
