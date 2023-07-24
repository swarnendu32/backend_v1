import { MongoClient } from "mongodb";
import {
    Account,
    AccountBlock,
    AccountFavourite,
    AccountFollower,
    MemoryHiddenAccount,
    AccountMute,
    AccountFollowRequest,
} from "../types/collections/account.type";
import {
    Comment,
    CommentLike,
    Post,
    PostLike,
    PostSave,
    PostView,
    PostFolder,
} from "../types/collections/post.type";
import { LocationVisit, Location } from "../types/collections/location.type";
import { HashTag, HashTagVisit } from "../types/collections/hashtag.type";
import { Audio, AudioSave, AudioVisit } from "../types/collections/audio.type";
import {
    Memory,
    MemoryLike,
    MemoryReply,
    MemoryStickerResponse,
    MemoryView,
} from "../types/collections/memory.type";

const database_username = "";

const database_password = "";

const connection_string = `mongodb+srv://${database_username}:${database_password}@test-cluster-1.g7jcj9i.mongodb.net/appdatabase-dev`;

export const databaseClient = new MongoClient(connection_string);

export function initDatabaseClient() {
    databaseClient.addListener("close", () => {
        console.log("database connection closed");
    });

    databaseClient.addListener("commandFailed", () => {
        console.log("database command failed\n");
    });

    databaseClient.addListener("commandStarted", () => {
        console.log("database command started\n");
    });

    databaseClient.addListener("commandSucceeded", () => {
        console.log("database command succeeded\n");
    });

    databaseClient.addListener("connectionCheckOutFailed", () => {
        console.log("database connection checkout failed\n");
    });

    databaseClient.addListener("connectionCheckOutStarted", () => {
        console.log("database connection closed\n");
    });

    databaseClient.addListener("connectionCheckedIn", () => {
        console.log("database connection checkedin\n");
    });

    databaseClient.addListener("connectionCheckedOut", () => {
        console.log("database connection checked out\n");
    });

    databaseClient.addListener("connectionClosed", () => {
        console.log("database connection closed\n");
    });

    databaseClient.addListener("connectionCreated", () => {
        console.log("database connection created\n");
    });

    databaseClient.addListener("connectionPoolCleared", () => {
        console.log("database connection pool cleared\n");
    });

    databaseClient.addListener("connectionPoolReady", () => {
        console.log("database connection pool ready\n");
    });

    databaseClient.addListener("connectionReady", () => {
        console.log("database connection ready\n");
    });

    databaseClient.addListener("connectionPoolClosed", () => {
        console.log("database connection pool closed\n");
    });

    databaseClient.addListener("connectionPoolCreated", () => {
        console.log("database connection created\n");
    });

    databaseClient.addListener("error", () => {
        console.log("database error\n");
    });

    databaseClient.addListener("open", () => {
        console.log("database open\n");
    });

    databaseClient.addListener("serverClosed", () => {
        console.log("database server closed\n");
    });

    databaseClient.addListener("serverOpening", () => {
        console.log("database server opening\n");
    });

    databaseClient.addListener("timeout", () => {
        console.log("database timed out");
    });

    databaseClient.addListener("serverHeartbeatFailed", () => {
        console.log("database heartbeat failure\n");
    });
    databaseClient.addListener("serverHeartbeatStarted", () => {
        console.log("database heartbeat started\n");
    });

    databaseClient.addListener("serverHeartbeatSucceeded", () => {
        console.log("database heartbeat successed\n");
    });
}

export const appDatabase = databaseClient.db("appdatabase-dev");

export const accountsCollection = appDatabase.collection<Account>("accounts");

export const accountFollowersCollection =
    appDatabase.collection<AccountFollower>("account-followers");

export const accountFollowRequestCollection =
    appDatabase.collection<AccountFollowRequest>("account-follow-request");

export const accountBlocksCollection =
    appDatabase.collection<AccountBlock>("account-blocks");

export const accountMuteCollection =
    appDatabase.collection<AccountMute>("account-mute");

export const accountFavouriteCollection =
    appDatabase.collection<AccountFavourite>("account-favourite");

export const memoryHiddenAccountCollection =
    appDatabase.collection<MemoryHiddenAccount>("memory-hidden-account");

export const postCollection = appDatabase.collection<Post>("post");

export const postLikeCollection = appDatabase.collection<PostLike>("post-like");

export const postSaveCollection = appDatabase.collection<PostSave>("post-save");

export const postFolderCollection =
    appDatabase.collection<PostFolder>("post-folder");

export const postViewCollection = appDatabase.collection<PostView>("post-view");

export const commentCollection = appDatabase.collection<Comment>("comment");

export const commentLikeCollection =
    appDatabase.collection<CommentLike>("comment-like");

export const locationCollection = appDatabase.collection<Location>("location");

export const locationVisitCollection =
    appDatabase.collection<LocationVisit>("location-visit");

export const hashtagCollection = appDatabase.collection<HashTag>("hashtag");

export const hashtagVisitCollection =
    appDatabase.collection<HashTagVisit>("hashtag-visit");

export const audioCollection = appDatabase.collection<Audio>("audio");

export const audioVisitCollection =
    appDatabase.collection<AudioVisit>("audio-visit");

export const audioSaveCollection =
    appDatabase.collection<AudioSave>("audio-save");

export const memoryCollection = appDatabase.collection<Memory>("memory");

export const memoryViewCollection =
    appDatabase.collection<MemoryView>("memory-view");

export const memoryLikeCollection =
    appDatabase.collection<MemoryLike>("memory-like");

export const memoryReplyCollection =
    appDatabase.collection<MemoryReply>("memory-reply");

export const memoryStickerResponseCollection =
    appDatabase.collection<MemoryStickerResponse>("memory-sticker-response");
