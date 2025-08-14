import React from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <main className="bg-gray-50 mt-5">
        {/* Hero Section */}
        <section className="pt-14 pb-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            {/* iPhone Title */}
            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-2 tracking-tight">
              iPhone
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-sans">
              Meet the iPhone 16 family.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600">
                Learn more
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white">
                Shop iPhone
              </button>
            </div>

            {/* Apple Intelligence Text */}
            <p className="text-2xl bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-12 font-semibold inline-block">
              Built for Apple Intelligence
            </p>

            {/* iPhone Images */}
            <div className="relative max-w-5xl mx-auto">
              <div className="flex justify-center items-end space-x-4 md:space-x-8">
                <Image
                  src="https://images.macrumors.com/t/NHloYA07lXYNraPhCHvmog9VT_M=/3840x/article-new/2025/03/Apple-iPhone-16-family-lineup.jpg"
                  alt="phone"
                  width={800}
                  height={400}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 w-full">
        <ProductCard
          title="iPad"
          subtitle="Touch, draw, and type on one magical device."
          description="Built for Apple Intelligence."
          imageUrl="https://www.apple.com/v/ipad-pro/at/images/meta/ipad-pro_overview__b6jt6q2ohlsi_og.png?202506200138" // replace with actual path
          textColor="text-white"
          backgroundColor="bg-black"
          buttontext="Shop iPad"
        />
        <ProductCard
          title="MacBook Air"
          subtitle="Sky blue color. Sky high performance with M4."
          description="Built for Apple Intelligence."
          imageUrl="https://www.apple.com/v/macbook-air/u/images/overview/hero/hero_endframe__c67cz35iy9me_large.png"
          backgroundColor="bg-blue-50"
          buttontext="Buy"
        />
        <ProductCard
          title="WATCH SERIES 10"
          subtitle="Thinstant classic."
          imageUrl="https://www.apple.com/v/apple-watch-series-10/d/images/overview/welcome/welcome_hero_endframe__d71hj6st53gy_xlarge.jpg"
          backgroundColor="bg-white"
          buttontext="Buy"
        />
        <ProductCard
          title="AirPods Pro 2"
          subtitle="Now with a Hearing Aid feature."
          imageUrl="https://www.apple.com/v/airpods-pro/d/images/meta/og__ch3csr9zmviq_overview.png"
          textColor="text-white"
          backgroundColor="bg-black"
          buttontext="Buy"
        />
        <ProductCard
          title="Trade In"
          subtitle="Get $160-$600 in credit when you trade in iPhone."
          imageUrl="https://istyle.ae/media/wysiwyg/AE/landing-pages/service/new-tradein-hero-iph15-v2.jpg"
          textColor="text-black"
          backgroundColor="bg-neutral-50"
          buttontext="Trade Now"
        />
        <ProductCard
          title="Card"
          subtitle="Get upto 3% cashback with every purchase."
          imageUrl="https://cdn1.expresscomputer.in/wp-content/uploads/2019/03/26085245/Apple-Card.jpg"
          textColor="text-black"
          backgroundColor="bg-neutral-50"
          buttontext="Buy Card"
        />
      </div>
    </div>
  );
};

export default page;
