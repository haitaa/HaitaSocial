import { Post } from "@/components/Post";

export const Feed = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      <Post />
      <Post />
      <Post />
    </div>
  );
};
