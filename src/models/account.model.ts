import { ObjectId } from "mongodb";
import {
  accountFollowersCollection,
  memoryHiddenAccountCollection,
} from "./index.model";

export async function findMemoryHiddenAccount(
  accountId: ObjectId,
  hiddenBy: ObjectId
) {
  const targetMemoryHiddenAccount = await memoryHiddenAccountCollection.findOne(
    { accountId, hiddenBy }
  );

  return targetMemoryHiddenAccount;
}

export async function findFollowingAccount(
  accountId: ObjectId,
  followedBy: ObjectId
) {
  const targetDocument = await accountFollowersCollection.findOne({
    accountId,
    followedBy,
  });

  return targetDocument;
}
