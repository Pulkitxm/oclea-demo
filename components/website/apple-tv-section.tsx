import { Button } from "@/components/ui/button"

export function AppleTVSection() {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">📺+ Apple TV+</h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-hidden">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white min-h-[200px] flex items-end">
            <div>
              <p className="text-sm opacity-80">🏌️ Apple TV+</p>
              <h3 className="font-bold">PGA TOUR Golf</h3>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-6 text-white min-h-[200px] flex items-end">
            <div>
              <p className="text-sm opacity-80">💪 Apple Fitness+</p>
              <h3 className="font-bold">Strength with Gregg</h3>
              <Button className="bg-white text-black hover:bg-gray-100 px-4 py-1 rounded-full text-sm mt-2">
                Watch now
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white min-h-[200px] flex items-end">
            <div>
              <p className="text-sm opacity-80">🎵 Apple Music</p>
              <h3 className="font-bold">A-List Pop</h3>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-2xl p-6 text-white min-h-[200px] flex items-end">
            <div>
              <p className="text-sm opacity-80">🎮 Apple Arcade</p>
              <h3 className="font-bold">Balatro+</h3>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white min-h-[200px] flex items-end">
            <div>
              <p className="text-sm opacity-80">🎮 Apple Arcade</p>
              <h3 className="font-bold">Strong and Calm</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 