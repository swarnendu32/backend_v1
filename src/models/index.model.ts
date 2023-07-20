import { readFileSync } from "fs";
import { MongoClient, MongoClientOptions } from "mongodb";
import path from "path";
import { createSecureContext } from "tls";
import {
    Comment,
    CommentLike,
    Post,
    PostFolder,
    PostLike,
    PostSave,
    PostView,
} from "../types/post.type";
import { Location, LocationVisit } from "../types/location.type";
import { HashTag, HashTagVisit } from "../types/hashtag.type";
import { Audio, AudioSave, AudioVisit } from "../types/audio.type";
import {
    Account,
    AccountActivity,
    AccountDetails,
    AccountBlock,
    AccountFavourite,
    AccountFollower,
    AccountMute,
    AccountFollowRequest,
} from "../types/account.type";
import { Memory, MemoryView } from "../types/memory.type";

const url =
    "mongodb+srv://cluster0.ssap4qe.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

const secureContext = createSecureContext({
    cert: readFileSync(
        path.join(__dirname, "./X509_cert_3289345913187973920.pem")
    ),
    key: readFileSync(
        path.join(__dirname, "./X509_cert_3289345913187973920.pem")
    ),
});

const options = {
    tls: true,
    secureContext: secureContext,
} as MongoClientOptions;

const client = new MongoClient(url, options);

export const db = client.db("myDB");

export const postCollection = db.collection<Post>("Posts");

export const postLikesCollection = db.collection<PostLike>("PostLikes");

export const postViewsCollection = db.collection<PostView>("PostViews");

export const postSavesCollection = db.collection<PostSave>("PostSaves");

export const postFoldersCollection = db.collection<PostFolder>("PostFolders");

export const commentsCollection = db.collection<Comment>("Comments");

export const commentLikesCollection =
    db.collection<CommentLike>("CommentLikes");

export const locationCollection = db.collection<Location>("Location");

export const locationVisitsCollection =
    db.collection<LocationVisit>("LocationVisit");

export const hashtagCollection = db.collection<HashTag>("HashTag");

export const hashtagVisitsCollection =
    db.collection<HashTagVisit>("HashTagVisits");

export const audioCollection = db.collection<Audio>("Audio");

export const audioSavesCollection = db.collection<AudioSave>("AudioSaves");

export const audioVisitsCollection = db.collection<AudioVisit>("AudioVisits");

export const accountCollection = db.collection<Account>("Accounts");

export const accountDetailsCollection =
    db.collection<AccountDetails>("AccountDetails");

export const accountActivityCollection =
    db.collection<AccountActivity>("AccountActivity");

export const followedAccountsCollection =
    db.collection<AccountFollower>("Followedaccounts");

export const blockedAccountsCollection =
    db.collection<AccountBlock>("BlockedAccounts");

export const requestedAccountsCollection =
    db.collection<AccountFollowRequest>("RequestedAccounts");

export const favouriteAccountsCollection =
    db.collection<AccountFavourite>("FavouriteAccounts");

export const mutedAccountsCollection =
    db.collection<AccountMute>("MutedAccounts");

export const memoryCollection = db.collection<Memory>("Momories")

export const memoryViewsCollection = db.collection<MemoryView>("MemoryViews")

export default client;
