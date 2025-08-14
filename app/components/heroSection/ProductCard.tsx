import React from "react";
import Image from "next/image";

type ProductCardProps = {
  title: string;
  subtitle: string;
  description?: string;
  imageUrl: string;
  textColor?: string;
  backgroundColor?: string;
  buttontext: string;
};

export default function ProductCard({
  title,
  subtitle,
  description,
  imageUrl,
  textColor = "text-black",
  backgroundColor = "bg-white",
  buttontext,
}: ProductCardProps) {
  return (
    <div
      className={`w-full pt-4 pl-4 pr-4 sm:pt-6 sm:pr-5 sm:pl-5 lg:pt-3 lg:pl-3 lg:pr-3  flex flex-col justify-between ${backgroundColor} ${textColor} rounded-none`}
    >
      <div className="text-center mt-2 sm:mt-3 lg:mt-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          {title}
        </h2>
        <h3 className="text-base sm:text-lg lg:text-xl mt-1">{subtitle}</h3>
        {description && (
          <p className="text-xs sm:text-sm mt-2 px-2 sm:px-0">{description}</p>
        )}
        <div className="mt-3 sm:mt-4 hidden lg:flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 sm:space-x-2">
          <button className="w-full sm:w-auto bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-700 transition">
            Learn more
          </button>
          <button className="w-full sm:w-auto border border-blue-600 text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-50 transition">
            {buttontext}
          </button>
        </div>
        {/* {title.includes("Apple Intelligence") && (
          <p className="mt-2 text-xs bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text font-medium">
            Built for Apple Intelligence.
          </p>
        )} */}
      </div>
      <div className="flex justify-center items-end flex-1 w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
