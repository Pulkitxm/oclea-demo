import { Button } from "@/components/ui/button"

export function ProductGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* iPad Pro */}
          <div className="bg-black text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">iPad Pro</h3>
              <p className="text-lg mb-6 text-gray-300">Unbelievably thin. Incredibly powerful.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                  Learn more
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-full bg-transparent"
                >
                  Buy
                </Button>
              </div>
              <p className="text-blue-400 text-sm">Built for Apple Intelligence.</p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-60 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-3xl"></div>
          </div>

          {/* Apple Intelligence */}
          <div className="bg-gray-100 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black">Apple Intelligence</h3>
              <p className="text-lg mb-6 text-gray-600">
                Turn a poster into a Calendar event with visual intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-full">
                  Watch the clip
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                  Learn more
                </Button>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 w-32 h-40 bg-gradient-to-b from-blue-200 to-blue-300 rounded-2xl"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* MacBook Air */}
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 text-center min-h-[500px] flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-black">MacBook Air</h3>
            <p className="text-lg mb-2 text-gray-600">Sky blue color.</p>
            <p className="text-lg mb-6 text-gray-600">Sky high performance with M4.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                Learn more
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full bg-transparent"
              >
                Buy
              </Button>
            </div>
            <div className="w-64 h-40 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl mx-auto relative">
              <div className="absolute inset-4 bg-blue-400 rounded-xl"></div>
            </div>
          </div>

          {/* AirPods Pro 2 */}
          <div className="bg-black text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">AirPods Pro 2</h3>
              <p className="text-lg mb-6 text-gray-300">Hearing Test. Hearing Aid. Hearing Protection.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                Learn more
              </Button>
            </div>
            <div className="absolute bottom-8 right-8 w-32 h-32 border-4 border-blue-400 rounded-full flex items-center justify-center">
              <div className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 