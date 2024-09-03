import { PostComponent } from "@/components/Post";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/client";

interface FeedProps {
  username: string;
}

export const Feed = async ({ username }: FeedProps) => {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId as string },
  });

  let posts: any[] = [];

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          followings: {
            some: {
              followerId: user?.id,
            },
          },
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (!username && user) {
    const following = await prisma.follower.findMany({
      where: {
        followingId: user.id,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts?.length
        ? posts.map((post) => <PostComponent key={post.id} post={post} />)
        : "No posts found"}
    </div>
  );
};
