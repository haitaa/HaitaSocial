import Image from "next/image";
import { Comments } from "./Comments";

export const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/26562785/pexels-photo-26562785/free-photo-of-kent-sehir-kent-simgesi-gorulecek-yer.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">John Doe</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src={
              "https://images.pexels.com/photos/26562785/pexels-photo-26562785/free-photo-of-kent-sehir-kent-simgesi-gorulecek-yer.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            fill
            className="object-contain rounded-md"
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          voluptas laudantium ut iure pariatur vel ducimus voluptate, inventore
          aliquid natus!
        </p>
      </div>
      {/* Interaction */}
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
              123<span className="hidden md:inline"> Likes</span>
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
              17<span className="hidden md:inline"> Comments</span>
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
              6<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};
