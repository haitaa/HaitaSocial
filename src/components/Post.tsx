"use client";

import Image from "next/image";

import { Post as PostType, User } from "@prisma/client";
import { Comments } from "@/components/feed/Comments";
import { PostInteraction } from "./feed/PostInteraction";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

interface PostProps {
  post: FeedPostType;
}

export const PostComponent = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.firstName && post.user.lastName
              ? `${post.user.firstName} ${post.user.lastName}`
              : post.user.username}
          </span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        {post.image && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-contain rounded-md"
            />
          </div>
        )}
        <p>{post.description}</p>
      </div>
      {/* Interaction */}
      <PostInteraction
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />
      <Comments />
    </div>
  );
};
