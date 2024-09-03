"use client";

import { useOptimistic, useState } from "react";
import Image from "next/image";

import { FollowRequest, User } from "@prisma/client";
import { acceptFollowRequest, deleteFollowRequests } from "../../lib/actions";

type RequestWithUser = FollowRequest & {
  sender: User;
};

interface FriendRequestsListProps {
  requests: RequestWithUser[];
}

export const FriendRequestsList = ({ requests }: FriendRequestsListProps) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await deleteFollowRequests(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  return (
    <div className="">
      {optimisticRequest.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={(request.sender.avatar as string) || "/noAvatar.png"}
              alt=""
              height={40}
              width={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.firstName && request.sender.lastName
                ? `${request.sender.firstName} ${request.sender.lastName}`
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.senderId)}>
              <button>
                <Image
                  src={"/accept.png"}
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.senderId)}>
              <button>
                <Image
                  src={"/reject.png"}
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};
