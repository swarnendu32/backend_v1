import {
    Db,
    ObjectId,
    WithId,
    Document,
    TransactionOptions,
    MongoError,
    ClientSession,
} from "mongodb";
import client, {
    accountCollection,
    audioCollection,
    blockedAccountsCollection,
    followedAccountsCollection,
    locationCollection,
    postCollection,
    postViewsCollection,
} from "../models/index.model";
import { Post, PostView } from "../types/post.type";
import { Account, AccountBlock } from "../types/account.type";
import { Location } from "../types/location.type";
import { Audio } from "../types/audio.type";
import { LocationAddressComponent, LocationTag } from "../types/util.type";

/**
 * Check if a post is available in the database.
 * @async
 * @function isPostAvailable
 * @param {string} postId - The ID of the post to check.
 * @returns {Promise<WithId<Post> | null>} Returns the post document if it exists and is not deleted, otherwise returns null.
 */

export async function isPostAvailable(
    postId: string
): Promise<WithId<Post> | null> {
    const post = await postCollection.findOne({
        _id: new ObjectId(postId),
        deletedAt: { $exists: false },
    });
    return post;
}

/**
 * Check if an account is blocked by another account.
 * @async
 * @function isBlocked
 * @param {string} accountId - The ID of the account to check.
 * @param {string} authorId - The ID of the author to check against.
 * @returns {Promise<WithId<BlockedAccount> | null>} Returns the blocked document if it exists, otherwise returns null.
 */

export async function isBlocked(
    accountId: string,
    authorId: string
): Promise<WithId<AccountBlock> | null> {
    const blocked = await blockedAccountsCollection.findOne({
        $or: [
            {
                accountId: new ObjectId(authorId),
                blockedBy: new ObjectId(accountId),
            },
            {
                accountId: new ObjectId(accountId),
                blockedBy: new ObjectId(authorId),
            },
        ],
    });
    return blocked;
}

/**
 * Check if an account is private and if the author is followed by the account.
 * @async
 * @function privateFollowingStatus
 * @param {string} authorId - The ID of the author to check.
 * @param {string} accountId - The ID of the account to check.
 * @returns {Promise<WithId<Account> | null>} Returns the author document if it exists and is not private or if it is private and followed by the account, otherwise returns null.
 */

export async function privateFollowingStatus(
    authorId: string,
    accountId: string
): Promise<WithId<Account> | null> {
    const author = await accountCollection.findOne({
        _id: new ObjectId(authorId),
    });
    if (author) {
        if (author.isPrivate) {
            const followed = await followedAccountsCollection.findOne({
                accountId: new ObjectId(authorId),
                followedBy: new ObjectId(accountId),
            });
            if (followed) {
                return author;
            } else {
                return null;
            }
        }
    }
    return author;
}

/**
 * Check if a post has been viewed by an account.
 * @async
 * @function postViewStatus
 * @param {string} postId - The ID of the post to check.
 * @param {string} accountId - The ID of the account to check.
 * @returns {Promise<WithId<PostView> | null>} Returns the viewed document if it exists, otherwise returns null.
 */

export async function postViewStatus(
    postId: string,
    accountId: string
): Promise<WithId<PostView> | null> {
    const viewed = await postViewsCollection.findOne({
        postId: new ObjectId(postId),
        viewedBy: new ObjectId(accountId),
    });
    return viewed;
}

async function getLocationDetails(
    locationName: string,
    placeId: string
): Promise<Location> {
    return {} as Location;
}

async function getAudioDetails(audioId: string): Promise<Audio> {
    return {} as Audio;
}

export async function commitWithRetry(
    session: ClientSession,
    retires: number = 0
) {
    try {
        await session.commitTransaction();
    } catch (error) {
        if (
            error instanceof MongoError &&
            error.hasErrorLabel("UnknownTransactionCommitResult")
        ) {
            if (retires < 5) {
                // Log error
                await commitWithRetry(session, retires++);
            }
        }
        // Log error
        throw error;
    }
}

async function transactionWithRetry(
    session: ClientSession,
    transactionFunction: (
        session: ClientSession,
        ...args: any[]
    ) => Promise<void>,
    retries: number = 0,
    ...args: any[]
) {
    try {
        await transactionFunction(session, args);
    } catch (error) {
        if (
            error instanceof MongoError &&
            error.hasErrorLabel("TransientTransactionError")
        ) {
            // Log error
            if (retries < 5) {
                await transactionWithRetry(
                    session,
                    transactionFunction,
                    retries++,
                    args
                );
            }
        }
        // Log error
        throw error;
    }
}

/**
 * Execute a transaction with retries on transient errors or unknown commit results.
 * @async
 * @function executeTransaction
 * @param {Function} transactionFunction - The function to execute in the transaction.
 * @param {...any[]} args - Additional arguments to pass to the transaction function.
 */

export async function executeTransaction(
    transactionFunction: (
        session: ClientSession,
        ...args: any[]
    ) => Promise<void>,
    ...args: any[]
): Promise<void> {
    const transactionOptions = {
        readPreference: "primary",
        readConcern: "majority",
        writeConcern: { w: "majority" },
    } as TransactionOptions;
    const session = client.startSession();
    try {
        await transactionWithRetry(
            session,
            transactionFunction,
            undefined,
            args
        );
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function uploadAudioDetails(
    accountId: string,
    url: string,
    duration: number
): Promise<string | undefined> {
    let account = await accountCollection.findOne({
        _id: new ObjectId(accountId),
        deletedAt: { $exists: false },
    });
    let audioId = await audioCollection.insertOne({
        url: url,
        duration: duration,
        createdAt: new Date(),
        type: "original",
        uploadedBy: "user",
        posterUrl: account?.profilePictureUrl,
        associatedAccountId: new ObjectId(accountId),
        title: "Original_Audio",
        meta: {
            noOfMemoryUse: 0,
            noOfPostUse: 0,
            noOfSaves: 0,
            noOfSearches: 0,
            noOfShares: 0,
            noOfVisits: 0,
        },
    });
    return audioId.insertedId.toString();
}

export async function uploadLocationDetails(
    placeId: string,
    name: string
): Promise<LocationTag> {
    let location = await locationCollection.findOne({
        placeId: placeId,
        name: name,
    });
    if (!location) {
        let locationInfo = await getLocationDetails(name, placeId);
        let locationId = await locationCollection.insertOne({
            createdAt: new Date(),
            placeId: locationInfo.placeId,
            license: locationInfo.license,
            osmType: locationInfo.osmType,
            osmId: locationInfo.osmId,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            type: locationInfo.type,
            category: locationInfo.category,
            addressType: locationInfo.addressType,
            formattedAddress: locationInfo.formattedAddress,
            name: locationInfo.name,
            importance: locationInfo.importance,
            placeRank: locationInfo.placeRank,
            boundingBox: locationInfo.boundingBox,
            addressComponents: locationInfo.addressComponents,
            meta: {
                noOfMemoryUse: 0,
                noOfPostUse: 0,
                noOfSearches: 0,
                noOfShares: 0,
                noOfVisits: 0,
            },
        });
        return {
            id: locationId.insertedId.toString(),
            name: locationInfo.name,
        };
    } else {
        return { id: location._id.toString(), name: location.name };
    }
}
