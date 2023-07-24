// import { ObjectId } from "mongodb";
// import { findFollowingAccount, findMemoryHiddenAccount } from "./account.model";
// import {
//   memoryCollection,
//   memoryLikeCollection,
//   memoryReplyCollection,
//   memoryStickerResponseCollection,
//   memoryViewCollection,
// } from "./index.model";
// import AppError from "../utils/AppError";

// export async function findMemoryById(targetMemoryId: ObjectId) {
//   const targetMemory = await memoryCollection.findOne({ _id: targetMemoryId });

//   return targetMemory;
// }

// export async function crossCheckMemoryRestrictions(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId
// ) {
//   const targetMemory = await findMemoryById(targetMemoryId);
//   if (!targetMemory || targetMemory.deletedAt) {
//     console.log("cannot find memory");
//     return;
//   }

//   const requstingAccountMemoryHiddenStatus = await findMemoryHiddenAccount(
//     targetMemory.createdBy,
//     requestingAccountId
//   );

//   if (requstingAccountMemoryHiddenStatus) {
//     console.log("you ar unauthorized to view the memory");
//     return;
//   }

//   return targetMemory;
// }

// export async function addView(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId
// ) {
//   const targetMemory = await findMemoryById(targetMemoryId);

//   if (!targetMemory || targetMemory.deletedAt) {
//     throw new AppError("memory not found");
//   }

//   const requstingAccountMemoryHiddenStatus = await findMemoryHiddenAccount(
//     targetMemory.createdBy,
//     requestingAccountId
//   );

//   if (requstingAccountMemoryHiddenStatus) {
//     throw new AppError("unauthorized to view the memory");
//   }

//   const viewDocumentInsertionResult = await memoryViewCollection.insertOne({
//     memoryId: targetMemoryId,
//     viewedBy: requestingAccountId,
//     viewedAt: new Date(),
//   });

//   if (!viewDocumentInsertionResult.acknowledged) {
//     throw new AppError("failed to add view to the memory");
//   }

//   const viewIncrementOperationResult = await memoryCollection.updateOne(
//     { _id: targetMemoryId },
//     { $inc: { "meta.noOfViews": 1 } }
//   );

//   if (
//     !viewIncrementOperationResult.acknowledged ||
//     !viewIncrementOperationResult.matchedCount ||
//     !viewIncrementOperationResult.modifiedCount
//   ) {
//     throw new AppError("failed to add view to the memory");
//   }
// }

// export async function addLike(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId
// ) {
//   const targetMemory = await findMemoryById(targetMemoryId);

//   if (!targetMemory || targetMemory.deletedAt) {
//     throw new AppError("memory not found");
//   }

//   const requstingAccountMemoryHiddenStatus = await findMemoryHiddenAccount(
//     targetMemory.createdBy,
//     requestingAccountId
//   );

//   if (requstingAccountMemoryHiddenStatus) {
//     throw new AppError("unauthorized to like the memory");
//   }

//   const likeDocumentInsertionResult = await memoryLikeCollection.insertOne({
//     memoryId: targetMemoryId,
//     likedBy: requestingAccountId,
//     likedAt: new Date(),
//   });

//   if (!likeDocumentInsertionResult.acknowledged) {
//     throw new AppError("failed to add like to the memory");
//   }

//   const likeIncrementOperationResult = await memoryCollection.updateOne(
//     { _id: targetMemoryId },
//     { $inc: { "meta.noOfLikes": 1 } }
//   );

//   if (
//     !likeIncrementOperationResult.acknowledged ||
//     !likeIncrementOperationResult.matchedCount ||
//     !likeIncrementOperationResult.modifiedCount
//   ) {
//     throw new AppError("failed to add like to the memory");
//   }
// }

// export async function addReply(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId,
//   replyText: string
// ) {
//   const targetMemory = await findMemoryById(targetMemoryId);

//   if (!targetMemory || targetMemory.deletedAt) {
//     throw new AppError("memory not found");
//   }

//   const requstingAccountMemoryHiddenStatus = await findMemoryHiddenAccount(
//     targetMemory.createdBy,
//     requestingAccountId
//   );

//   if (
//     requstingAccountMemoryHiddenStatus ||
//     targetMemory.advancedOptions.replySetting === "disabled"
//   ) {
//     throw new AppError("unauthorized to reply to the memory");
//   }

//   if (targetMemory.advancedOptions.replySetting === "following") {
//     const reqestingAccountFollowingStatus = await findFollowingAccount(
//       requestingAccountId,
//       targetMemory.createdBy
//     );

//     if (!reqestingAccountFollowingStatus) {
//       throw new AppError("unauthorized to reply to the memory");
//     }
//   }

//   const memoryReplyDocumentInsertionResult =
//     await memoryReplyCollection.insertOne({
//       memoryId: targetMemoryId,
//       repliedAt: new Date(),
//       repliedBy: requestingAccountId,
//       text: replyText,
//     });

//   if (!memoryReplyDocumentInsertionResult.acknowledged) {
//     throw new AppError("unable to add reply to the memory");
//   }

//   const memoryReplyIncrementOpearationResult = await memoryCollection.updateOne(
//     { _id: targetMemoryId },
//     { $inc: { "meta.noOfReplies": 1 } }
//   );

//   if (!memoryReplyIncrementOpearationResult.acknowledged) {
//     throw new AppError("unable to add reply to the memory");
//   }
// }

// export async function addStickerResponse(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId,
//   stickerType: "poll" | "star-rating",
//   response: number | string
// ) {
//   const targetMemory = await findMemoryById(targetMemoryId);

//   if (!targetMemory || targetMemory.deletedAt) {
//     throw new AppError("memory not found");
//   }

//   if (targetMemory.sticker?.type !== stickerType) {
//     throw new AppError("sticker not found");
//   }

//   if (
//     targetMemory.sticker.type === "poll" &&
//     targetMemory.sticker.details.options.findIndex(
//       (value) => value === response
//     ) != -1
//   ) {
//     throw new AppError("sticker not found");
//   }

//   const requstingAccountMemoryHiddenStatus = await findMemoryHiddenAccount(
//     targetMemory.createdBy,
//     requestingAccountId
//   );

//   if (requstingAccountMemoryHiddenStatus) {
//     throw new AppError("unauthorized to respond to the memory sticker");
//   }

//   memoryStickerResponseCollection.insertOne({
//     memoryId: targetMemoryId,
//     respondedAt: new Date(),
//     respondedBy: requestingAccountId,
//     stickerType: stickerType,
//     response: response,
//   });
// }

// export async function getViews(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId,
//   timestampUpperBound: Date
// ) {
//   memoryViewCollection.aggregate([
//     {
//       $match: {
//         memoryId: targetMemoryId,
//         viewedAt: { $lte: timestampUpperBound },
//       },
//     },
//     {
//       $sort: {
//         viewedAt: -1,
//       },
//     },
//     {
//       $limit: 30,
//     },
//   ]);
// }

// export async function getLikes(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId
// ) {}

// export async function getReplies(
//   targetMemoryId: ObjectId,
//   requestingAccountId: ObjectId
// ) {}
