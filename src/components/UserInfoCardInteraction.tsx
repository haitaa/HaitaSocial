"use client";

import { useOptimistic, useState } from "react";
import { switchBlock, switchFollow } from "../../lib/actions";

interface UserInfoCardInteractionProps {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingRequestSent: boolean;
}

export const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingRequestSent,
}: UserInfoCardInteractionProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingRequestSent,
  });

  /**
   * Handles the follow action by optimistically updating the UI,
   * sending a follow request to the server, and then updating the UI
   * based on the server's response.
   */
  const follow = async () => {
    // Optimistically update the UI to reflect the following action.
    switchOptimisticState("follow");

    try {
      // Perform the follow operation on the server.
      await switchFollow(userId);

      // Update the user state based on the successful follow operation.
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false, // Set `following` to `false` if the user was already following.
        followingRequestSent:
          !prev.following && !prev.followingRequestSent
            ? true // Set `followingRequestSent` to `true` if the user was not following and no request was previously sent.
            : false, // Otherwise, set `followingRequestSent` to `false`.
      }));
    } catch (error) {
      // Log any errors that occur during the follow operation.
      console.log(error);
    }
  };

  /**
   * Handles the block action by optimistically updating the UI,
   * sending a block request to the server, and then updating the UI
   * based on the server's response.
   */
  const block = async () => {
    // Optimistically update the UI to reflect the block action.
    switchOptimisticState("block");

    try {
      // Perform the block operation on the server.
      await switchBlock(userId);

      // Update the user state based on the successful block operation.
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked, // Toggle the `blocked` state between `true` and `false`.
      }));
    } catch (error) {
      // Optionally, handle or log errors that occur during the block operation.
      console.log(error);
    }
  };

  // `useOptimistic` is a custom hook that handles optimistic updates for state changes.
  // It allows you to update the UI immediately while performing an asynchronous operation,
  // and then synchronize with the server once the operation completes.
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState, // The current state of the user, which will be optimistically updated.
    (state, value: "follow" | "block") =>
      value === "follow"
        ? // When the `value` is "follow", update the state to reflect the follow action.
          {
            ...state,
            following: state.following && false, // Set `following` to `false` if the user was already following.
            followingRequestSent:
              !state.following && !state.followingRequestSent
                ? true // Set `followingRequestSent` to `true` if the user was not following and no request was previously sent.
                : false, // Otherwise, set `followingRequestSent` to `false`.
          }
        : {
            // When the `value` is "block", update the state to reflect the block action.
            ...state,
            blocked: !state.blocked, // Toggle the `blocked` state between `true` and `false`.
          }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {userId === currentUserId
            ? "Edit Profile"
            : optimisticState.following
            ? "Unfollow"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      {userId !== currentUserId && (
        <form action={block} className="self-end">
          <button>
            <span className="text-red-400 text-xs cursor-pointer">
              {optimisticState.blocked ? "Unblock user" : "Block user"}
            </span>
          </button>
        </form>
      )}
    </>
  );
};
