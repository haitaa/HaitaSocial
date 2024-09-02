import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../lib/client";

interface UserMediaCardProps {
  user: User;
}

export const UserMediaCard = async ({ user }: UserMediaCardProps) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      image: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* Bottom */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div key={post.id} className="relative w-1/5 h-24">
                <Image
                  src={post.image!}
                  alt={post.description}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No media found"}
      </div>
    </div>
  );
};
