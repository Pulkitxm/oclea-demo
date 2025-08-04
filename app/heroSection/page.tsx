import React from "react";

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
                {/* iPhone Pro - Gold */}
                {/* <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1695653424718-fee9827420b4?w=400&h=600&fit=crop&crop=center" 
                    alt="iPhone 16 Pro in Natural Titanium"
                    className="w-48 md:w-64 lg:w-80 h-auto object-contain"
                  />
                </div> */}

                {/* iPhone - Blue (Center, slightly larger) */}
                {/* <div className="relative transform scale-110">
                  <img 
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=600&fit=crop&crop=center" 
                    alt="iPhone 16 in Ultramarine"
                    className="w-48 md:w-64 lg:w-80 h-auto object-contain"
                  />
                </div> */}

                {/* iPhone - White */}
                {/* <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1695048006968-ea93a39a700c?w=400&h=600&fit=crop&crop=center" 
                    alt="iPhone 16 in White"
                    className="w-48 md:w-64 lg:w-80 h-auto object-contain"
                  />
                </div> */}

                <img
                  src="https://images.macrumors.com/t/NHloYA07lXYNraPhCHvmog9VT_M=/3840x/article-new/2025/03/Apple-iPhone-16-family-lineup.jpg"
                  alt="phone"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
