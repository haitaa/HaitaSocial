"use server";

import { User } from "@prisma/client";
import { Ad } from "./Ad";
import { Birthdays } from "./Birthdays";
import { FriendRequests } from "./FriendRequests";
import { UserInfoCard } from "./UserInfoCard";
import { UserMediaCard } from "./UserMediaCard";
import { Suspense } from "react";

interface RightMenuProps {
  user: User;
}

export const RightMenu = ({ user }: RightMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};
