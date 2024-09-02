"use client";

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
  return (
    <>
      <form action={""}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {userId === currentUserId
            ? "Edit Profile"
            : isFollowing
            ? "Unfollow"
            : isFollowingRequestSent
            ? "Cancel Request"
            : "Follow"}
        </button>
      </form>
      <form action={""} className="self-end">
        <span className="text-red-400 text-xs cursor-pointer">Block user</span>
      </form>
    </>
  );
};
