"use client";

import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";

type RequestWithUser = FollowRequest & {
  sender: User;
};

interface FriendRequestsListProps {
  requests: RequestWithUser[];
}

export const FriendRequestsList = ({ requests }: FriendRequestsListProps) => {
  return (
    <div className="">
      {requests.map((request) => (
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
            <Image
              src={"/accept.png"}
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src={"/reject.png"}
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
