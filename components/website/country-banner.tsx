import { ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CountryBanner() {
  return (
    <div className="bg-gray-100 text-center py-3 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <span className="text-gray-600">
            Choose another country or region to see content specific to your location and shop online.
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span>India</span>
            <ChevronUp className="w-4 h-4 rotate-180" />
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 px-4 py-1 text-sm">Continue</Button>
          <button className="text-gray-600 hover:text-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 