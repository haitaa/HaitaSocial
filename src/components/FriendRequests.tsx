import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { prisma } from "../../lib/client";
import { FriendRequestsList } from "./FriendRequestList";

/**
 * Retrieves and returns the friend requests for the current authenticated user.
 * This function first checks if the user is authenticated, then fetches the user's data,
 * and finally retrieves the follow requests where the user is the receiver.
 *
 * @returns {Promise<Array|null>} - Returns an array of friend requests with sender details, or null if no requests exist or the user is not authenticated.
 */
export const FriendRequests = async () => {
  // Retrieve the current authenticated user's ID.
  const { userId } = auth();

  // If there is no authenticated user, return null.
  if (!userId) return null;

  // Fetch the user from the database based on their Clerk ID.
  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
  });

  // If the user is not found, return null.
  if (!user) return null;

  // Retrieve all follow requests where the user is the receiver.
  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: user.id,
    },
    include: {
      sender: true, // Include sender details in the result.
    },
  });

  // If there are no follow requests, return null.
  if (requests.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* User  */}
      <FriendRequestsList requests={requests} />
    </div>
  );
};
