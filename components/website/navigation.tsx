import { Search, ShoppingBag } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Apple Logo */}
          <div className="flex items-center">
            <svg className="w-4 h-4 fill-current text-gray-800" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-800 transition-colors">
              Store
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Mac
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              iPad
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              iPhone
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Watch
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Vision
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              AirPods
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              TV & Home
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Entertainment
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Accessories
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              Support
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <ShoppingBag className="w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  )
} 