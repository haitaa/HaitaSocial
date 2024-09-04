"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

interface PostInteractionProps {
  postId: string;
  likes: string[];
  commentNumber: number;
}

export const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: PostInteractionProps) => {
  const { userId } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src={"/like.png"}
            alt=""
            height={16}
            width={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src={"/comment.png"}
            alt=""
            height={16}
            width={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
          <Image
            src={"/share.png"}
            alt=""
            height={16}
            width={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Shares</span>
          </span>
        </div>
      </div>
    </div>
  );
};
