import { Button } from "@/components/ui/button"

export function IPhoneSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">iPhone</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">Meet the iPhone 16 family.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm">
            Learn more
          </Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full text-sm bg-transparent"
          >
            Shop iPhone
          </Button>
        </div>

        <p className="text-blue-600 text-sm mb-12">Built for Apple Intelligence.</p>

        {/* iPhone Images */}
        <div className="flex justify-center items-end space-x-8 mb-16">
          <div className="w-48 h-80 bg-gradient-to-b from-amber-100 to-amber-200 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
            <div className="w-40 h-72 bg-gradient-to-b from-amber-300 to-amber-400 rounded-[2.5rem] relative">
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-amber-600 rounded-2xl"></div>
              <div className="absolute top-6 left-4 w-8 h-8 bg-amber-600 rounded-full"></div>
              <div className="absolute top-16 left-4 w-8 h-8 bg-amber-600 rounded-full"></div>
            </div>
          </div>
          <div className="w-48 h-80 bg-gradient-to-b from-blue-100 to-blue-200 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
            <div className="w-40 h-72 bg-gradient-to-b from-blue-300 to-blue-400 rounded-[2.5rem] relative">
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-xl"></div>
              <div className="absolute top-6 left-6 w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="w-48 h-80 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
            <div className="w-40 h-72 bg-gradient-to-b from-gray-300 to-gray-400 rounded-[2.5rem] relative">
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-600 rounded-xl"></div>
              <div className="absolute top-6 left-6 w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 