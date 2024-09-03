"use server";

import * as z from "zod";
import { auth } from "@clerk/nextjs/server"; // Import authentication functions from Clerk.
import { prisma } from "./client"; // Import the Prisma client for database interactions.

/**
 * Retrieves a user from the database based on their Clerk ID.
 * @param {string} clerkId - The Clerk ID of the user to retrieve.
 * @returns {Object} user - The user object retrieved from the database.
 * @throws Will throw an error if the user is not found.
 */
export const getUserByClerkId = async (clerkId: string) => {
  const { userId } = auth(); // Get the authenticated user's ID.

  const user = await prisma.user.findFirst({
    where: { clerkId: userId }, // Find the user in the database by their Clerk ID.
  });

  if (!user) {
    throw new Error("User not found!"); // Throw an error if the user is not found.
  }

  return user; // Return the user object if found.
};

/**
 * Toggles the follow status between the current user and another user.
 * If the current user is already following the target user, unfollow them.
 * If the current user has sent a follow request, cancel it.
 * Otherwise, send a follow request.
 * @param {string} userId - The ID of the user to follow or unfollow.
 * @throws Will throw an error if the operation fails or if the user is unauthorized.
 */
export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth(); // Get the current authenticated user's ID.

  if (!currentUserId) {
    throw new Error("Unauthorized"); // Throw an error if the user is not authenticated.
  }

  try {
    const user = await getUserByClerkId(currentUserId); // Get the user object of the current user.

    // Check if the current user is already following the target user.
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: user.id,
        followingId: userId,
      },
    });

    if (existingFollow) {
      // If a follow relationship exists, unfollow by deleting the record.
      await prisma.follower.delete({
        where: { id: existingFollow.id },
      });
    } else {
      // If no follow relationship exists, check if a follow request was sent.
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: user.id,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        // If a follow request exists, cancel it by deleting the record.
        await prisma.followRequest.delete({
          where: { id: existingFollowRequest.id },
        });
      } else {
        // If no follow request exists, create a new follow request.
        await prisma.followRequest.create({
          data: {
            senderId: user.id,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!"); // Throw a generic error if something goes wrong.
  }
};

/**
 * Toggles the block status between the current user and another user.
 * If the current user has already blocked the target user, unblock them.
 * Otherwise, block the target user.
 * @param {string} userId - The ID of the user to block or unblock.
 * @throws Will throw an error if the user is unauthorized, not found, or if the operation fails.
 */
export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth(); // Get the current authenticated user's ID.

  if (!currentUserId) {
    throw new Error("Unauthorized"); // Throw an error if the user is not authenticated.
  }

  // Retrieve the current user from the database using their Clerk ID.
  const user = await getUserByClerkId(currentUserId);

  if (!user) {
    throw new Error("User not found!"); // Throw an error if the current user is not found in the database.
  }

  try {
    // Check if there is an existing block relationship where the current user is the blocker and the target user is blocked.
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: user.id, // The ID of the current user who might have blocked the target user.
        blockedId: userId, // The ID of the target user who might be blocked.
      },
    });

    if (existingBlock) {
      // If a block relationship exists, unblock the target user by deleting the block record.
      await prisma.block.delete({
        where: { id: existingBlock.id }, // Delete the block record using its ID.
      });
    } else {
      // If no block relationship exists, block the target user by creating a new block record.
      await prisma.block.create({
        data: {
          blockerId: user.id, // The ID of the current user who is blocking the target user.
          blockedId: userId, // The ID of the target user who is being blocked.
        },
      });
    }
  } catch (error) {
    console.log(error); // Log any error that occurs during the operation.
    throw new Error("Something went wrong!"); // Throw a generic error if something goes wrong.
  }
};

/**
 * Accepts a follow request from another user.
 * If a follow request exists from the target user to the current user, it is accepted:
 * - The follow request is deleted.
 * - The target user is added as a follower of the current user.
 * @param {string} userId - The ID of the user who sent the follow request.
 * @throws Will throw an error if the user is unauthorized, not found, or if the operation fails.
 */
export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth(); // Get the current authenticated user's ID.

  if (!currentUserId) {
    throw new Error("Unauthorized"); // Throw an error if the user is not authenticated.
  } 

  // Retrieve the current user from the database using their Clerk ID.
  const user = await getUserByClerkId(currentUserId);
  
  if (!user) {
    throw new Error("User not found!"); // Throw an error if the current user is not found in the database.
  }

  try {
    // Check if there is an existing follow request from the target user to the current user.
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId, // The ID of the user who sent the follow request.
        receiverId: user.id, // The ID of the current user who received the follow request.
      },
    });

    if (existingFollowRequest) {
      // If a follow request exists, delete it from the database.
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id }, // Delete the follow request using its ID.
      });

      // Add the target user as a follower of the current user by creating a new follower record.
      await prisma.follower.create({
        data: {
          followerId: user.id, // The ID of the current user who is being followed.
          followingId: userId, // The ID of the user who is now following the current user.
        },
      });
      
      await prisma.follower.create({
        data: {
          followerId: userId, // The ID of the user who is now following the current user.
          followingId: user.id, // The ID of the current user who is being followed.
        }
      })
    }
  } catch (error) {
    console.error(error); // Log any error that occurs during the operation.
    throw new Error("Something went wrong!"); // Throw a generic error if something goes wrong.
  }
};

/**
 * Deletes a follow request sent by a specific user to the currently authenticated user.
 *
 * This function performs the following steps:
 * Checks if the current user is authenticated.
 * Retrieves the current user's data from the database using their Clerk ID.
 * Searches for an existing follow request from the specified user.
 * If found, deletes the follow request from the database.
 *
 * @param {string} userId - The ID of the user who sent the follow request to the current user.
 * @throws Will throw an error if the operation fails, the user is unauthorized, or not found.
 */
export const deleteFollowRequests = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the current user from the database using their Clerk ID.
  const user = await getUserByClerkId(currentUserId);

  if (!user) {
    throw new Error("User not found!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: user.id,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });
    }
  } catch (error) {
    throw new Error("Something went wrong!")
  }
}

export const updateProfile = async (formData: FormData) => {
  const fields = Object.fromEntries(formData);

  const Profile = z.object({
    cover: z.string().optional(),
    firstName: z.string().max(60).optional(),
    lastName: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  })

  const validatedFields = Profile.safeParse(fields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    throw new Error("Invalid fields");
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...validatedFields.data,
      }
    })
  } catch(error) {
    throw new Error("Something went wrong!")
  }
}