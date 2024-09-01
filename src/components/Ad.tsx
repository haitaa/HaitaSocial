import Image from "next/image";

export const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Top */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src={"/more.png"} alt="" width={16} height={16} />
      </div>
      {/* Bottom */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src={
              "https://images.pexels.com/photos/17272195/pexels-photo-17272195/free-photo-of-saglikli-kent-sehir-yol.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/17272195/pexels-photo-17272195/free-photo-of-saglikli-kent-sehir-yol.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={`${size === "sm" ? "text-xs" : "text-sm"}`}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, delectus?"
            : size === "md"
            ? "            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut ducimus velit alias, quo cumque!"
            : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis suscipit dolores id deleniti quam nobis magnam. Nam odit rem ea?"}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};
