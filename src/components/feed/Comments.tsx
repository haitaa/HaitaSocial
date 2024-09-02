import Image from "next/image";

export const Comments = () => {
  return (
    <div className="">
      {/* Write */}
      <div className="flex items-center gap-4">
        <Image
          src={
            "https://images.pexels.com/photos/20894817/pexels-photo-20894817/free-photo-of-soguk-alginligi-soguk-kar-adam.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          alt=""
          width={34}
          height={34}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src={"/emoji.png"}
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* Comment */}
        <div className="flex gap-4 justify-between mt-6">
          {/* Avatar */}
          <div className="">
            <Image
              src={
                "https://images.pexels.com/photos/20894817/pexels-photo-20894817/free-photo-of-soguk-alginligi-soguk-kar-adam.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Mustafa Haita</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              odio distinctio illo ad dolorum dignissimos sint vitae,
              exercitationem impedit consectetur modi repellendus temporibus
              nisi fugiat natus. Odio odit minus eligendi!
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src={"/like.png"}
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* Icon */}
          <Image
            src={"/more.png"}
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};
