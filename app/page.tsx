"use client"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Settings,
  X,
  Search,
  ShoppingBag,
  Code,
  ChevronUp,
  MessageSquare,
  Copy,
  ExternalLink,
  Loader2,
  FileText,
  Minus,
} from "lucide-react"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type SuggestionType = "Accessibility" | "Visual" | "UX"

interface Suggestion {
  id: number
  x: number
  y: number
  type: SuggestionType
  suggestion: string
  priority: string
  section: string
}


// Comprehensive suggestions data with code estimates
const sampleSuggestions: Suggestion[] = [
  // Navigation & Header
  {
    id: 1,
    x: 50,
    y: 120,
    type: "Accessibility",
    suggestion: "Add skip navigation link for keyboard users to jump directly to main content.",
    priority: "high",
    section: "Navigation",
  },
  {
    id: 2,
    x: 1100,
    y: 80,
    type: "UX",
    suggestion: "Consider adding search suggestions dropdown for better user guidance.",
    priority: "medium",
    section: "Navigation",
  },
  // Country Banner
  {
    id: 3,
    x: 600,
    y: 30,
    type: "UX",
    suggestion: "Add a dismiss option for the country selection banner to improve user experience.",
    priority: "low",
    section: "Banner",
  },
  // iPhone Section
  {
    id: 4,
    x: 400,
    y: 200,
    type: "Accessibility",
    suggestion: "Add alt text descriptions for iPhone product images that convey the key features and colors shown.",
    priority: "high",
    section: "iPhone",
  },
  {
    id: 5,
    x: 750,
    y: 300,
    type: "Visual",
    suggestion: "Ensure sufficient color contrast between 'Built for Apple Intelligence' text and background.",
    priority: "high",
    section: "iPhone",
  },
  // Product Grid
  {
    id: 6,
    x: 200,
    y: 600,
    type: "UX",
    suggestion: "Add hover states to iPad Pro card to provide visual feedback and improve interactivity.",
    priority: "medium",
    section: "Product Grid",
  },
  {
    id: 7,
    x: 800,
    y: 650,
    type: "Accessibility",
    suggestion: "Ensure Apple Intelligence video content has captions and audio descriptions available.",
    priority: "high",
    section: "Product Grid",
  },
  {
    id: 8,
    x: 200,
    y: 900,
    type: "Visual",
    suggestion: "Consider consistent spacing between MacBook Air product sections for better visual hierarchy.",
    priority: "medium",
    section: "Product Grid",
  },
  {
    id: 9,
    x: 800,
    y: 950,
    type: "UX",
    suggestion: "Add loading states for AirPods Pro audio visualization to improve perceived performance.",
    priority: "medium",
    section: "Product Grid",
  },
  // Apple TV+ Section
  {
    id: 10,
    x: 150,
    y: 1200,
    type: "Accessibility",
    suggestion: "Ensure Apple TV+ carousel is navigable with keyboard and has proper ARIA labels.",
    priority: "high",
    section: "Apple TV+",
  },
  {
    id: 11,
    x: 600,
    y: 1300,
    type: "UX",
    suggestion: "Add pause/play controls for auto-rotating carousel to improve accessibility.",
    priority: "medium",
    section: "Apple TV+",
  },
  // Services Grid
  {
    id: 12,
    x: 300,
    y: 1500,
    type: "Visual",
    suggestion: "Improve visual consistency across service tiles with uniform image aspect ratios.",
    priority: "low",
    section: "Services",
  },
  {
    id: 13,
    x: 700,
    y: 1550,
    type: "UX",
    suggestion: "Add preview functionality for Apple Music and Apple Arcade content on hover.",
    priority: "low",
    section: "Services",
  },
  // Footer
  {
    id: 14,
    x: 400,
    y: 1800,
    type: "Accessibility",
    suggestion: "Organize footer links with proper heading structure for screen reader navigation.",
    priority: "medium",
    section: "Footer",
  },
  {
    id: 15,
    x: 600,
    y: 1850,
    type: "Visual",
    suggestion: "Improve readability of fine print text by increasing font size and line height.",
    priority: "medium",
    section: "Footer",
  },
]

export default function UIUXSuggestionTool() {
  const [suggestions] = useState<Suggestion[]>(sampleSuggestions)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [activeFilters, setActiveFilters] = useState<SuggestionType[]>(["Accessibility", "Visual", "UX"])
  const [closedSuggestions, setClosedSuggestions] = useState<number[]>([])
  const [minimizedSuggestions, setMinimizedSuggestions] = useState<number[]>([])
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [isToolbarLoading, setIsToolbarLoading] = useState(false)
  const [showJsonModal, setShowJsonModal] = useState(false)

  const getTypeColor = (type: SuggestionType) => {
    switch (type) {
      case "Accessibility":
        return "border-blue-500"
      case "Visual":
        return "border-green-500"
      case "UX":
        return "border-orange-500"
      default:
        return "border-gray-500"
    }
  }

  const getTypeBadgeColor = (type: SuggestionType) => {
    switch (type) {
      case "Accessibility":
        return "bg-blue-100 text-blue-800"
      case "Visual":
        return "bg-green-100 text-green-800"
      case "UX":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => activeFilters.includes(suggestion.type) && !closedSuggestions.includes(suggestion.id),
  )

  const toggleFilter = (type: SuggestionType) => {
    setActiveFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const closeSuggestion = (id: number) => {
    setClosedSuggestions((prev) => [...prev, id])
  }

  const minimizeSuggestion = (id: number) => {
    setMinimizedSuggestions((prev) => [...prev, id])
  }

  const expandSuggestion = (id: number) => {
    setMinimizedSuggestions((prev) => prev.filter((suggestionId) => suggestionId !== id))
  }

  const acceptSuggestion = (id: number) => {
    setClosedSuggestions((prev) => [...prev, id])
  }

  const discardSuggestion = (id: number) => {
    setClosedSuggestions((prev) => [...prev, id])
  }

  const exportSuggestions = (format: 'json' | 'pdf' = 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(filteredSuggestions, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
      const exportFileDefaultName = "ui-ux-suggestions.json"

      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()
    } else if (format === 'pdf') {
      const doc = new jsPDF()
      
      // Add title
      doc.setFontSize(20)
      doc.text("UI/UX Suggestions Report", 20, 20)
      
      // Add timestamp
      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
      
      let yPosition = 50
      const pageHeight = doc.internal.pageSize.height
      const margin = 20
      const lineHeight = 8
      
      filteredSuggestions.forEach((suggestion, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          doc.addPage()
          yPosition = 20
        }
        
        // Add suggestion number
        doc.setFontSize(14)
        doc.setTextColor(0, 0, 0)
        doc.text(`Suggestion ${index + 1}`, margin, yPosition)
        yPosition += 8
        
        // Add type badge
        doc.setFontSize(10)
        doc.setTextColor(255, 255, 255)
        const typeWidth = doc.getTextWidth(suggestion.type) + 4
        doc.setFillColor(
          suggestion.type === 'Accessibility' ? 59 : 
          suggestion.type === 'Visual' ? 34 : 249, 
          suggestion.type === 'Accessibility' ? 130 : 
          suggestion.type === 'Visual' ? 197 : 115, 
          suggestion.type === 'Accessibility' ? 246 : 
          suggestion.type === 'Visual' ? 94 : 22
        )
        doc.rect(margin, yPosition - 2, typeWidth, 6, 'F')
        doc.text(suggestion.type, margin + 2, yPosition + 2)
        yPosition += 10
        
        // Add section
        doc.setTextColor(100, 100, 100)
        doc.text(`Section: ${suggestion.section}`, margin, yPosition)
        yPosition += 6
        
        // Add suggestion text
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11)
        const splitText = doc.splitTextToSize(suggestion.suggestion, 170)
        doc.text(splitText, margin, yPosition)
        yPosition += splitText.length * 6 + 10
        
        // Add priority
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text(`Priority: ${suggestion.priority}`, margin, yPosition)
        yPosition += 8
        
        // Add separator
        if (index < filteredSuggestions.length - 1) {
          doc.setDrawColor(200, 200, 200)
          doc.line(margin, yPosition, 190, yPosition)
          yPosition += 10
        }
      })
      
      // Save the PDF
      doc.save("ui-ux-suggestions.pdf")
    }
  }

  const refreshSuggestions = () => {
    setIsToolbarLoading(true)
    setTimeout(() => {
      setClosedSuggestions([])
      setMinimizedSuggestions([])
      setIsToolbarLoading(false)
    }, 1500)
  }

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions)
  }

  const hideAllSuggestions = () => {
    setMinimizedSuggestions(filteredSuggestions.map((s) => s.id))
  }

  const showAllSuggestions = () => {
    setMinimizedSuggestions([])
  }

  const copyForLLM = () => {
    const prompt = `Please analyze these UI/UX suggestions for Apple.com and provide implementation recommendations:

${JSON.stringify(filteredSuggestions, null, 2)}

Focus on:
1. Priority order for implementation
2. Technical feasibility
3. Impact on user experience
4. Code examples where applicable`

    navigator.clipboard.writeText(prompt)
  }

  const openInChatGPT = () => {
    const prompt = encodeURIComponent(
      `Please analyze these UI/UX suggestions for Apple.com: ${JSON.stringify(filteredSuggestions, null, 2)}`,
    )
    window.open(`https://chatgpt.com/?q=${prompt}`, "_blank")
  }

  const openInClaude = () => {
    const prompt = encodeURIComponent(
      `Please analyze these UI/UX suggestions for Apple.com: ${JSON.stringify(filteredSuggestions, null, 2)}`,
    )
    window.open(`https://claude.ai/new?q=${prompt}`, "_blank")
  }

  return (
    <div className="page-container relative min-h-screen bg-white overflow-x-hidden">
      {/* Apple.com Website Recreation */}
      <div className="website-content">
        {/* Country Selection Banner */}
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

        {/* Top Navigation */}
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

        {/* iPhone Section */}
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

        {/* Product Grid */}
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

        {/* Apple TV+ Section */}
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

        {/* Footer */}
        <footer className="bg-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs text-gray-600 space-y-4 mb-8 overflow-hidden">
              <p>
                1. Available for Qualified Purchasers only. Qualified Purchasers purchasing an eligible Mac/iPad
                ("Eligible Product") with eligible AirPods/accessory ("Promotion Product") from a Qualifying Location
                through September 30, 2025 will receive Promotion Savings (up to $199, not to exceed the price of the
                Promotion Product). Customers will be charged for all items in their cart, including the Promotion
                Product. Only one Promotion Product per Eligible Product per Qualified Purchaser. Offer subject to
                availability. While supplies last. Additional restrictions apply. View full offer terms here.
              </p>
              <p>
                2. Visual Intelligence is available in iOS 18.2 or later on iPhone 16, iPhone 16 Plus, iPhone 16 Pro,
                and iPhone 16 Pro Max; iOS 18.3 or later on iPhone 15c; and iOS 18.4 or later on iPhone 15 Pro and
                iPhone 15 Pro Max. Apple Intelligence must be on to use visual intelligence.
              </p>
              <p>
                3. Hearing Aid and Hearing Test: The Hearing Aid feature has received FDA authorization. The Hearing
                Test and Hearing Aid features are supported on AirPods Pro 2 with the latest firmware paired with a
                compatible iPhone or iPad with iOS 18 or iPadOS 18 and later and are intended for people 18 years old or
                older. The Hearing Aid feature is also supported on a compatible Mac with macOS Sequoia and later. It is
                intended for people with perceived mild to moderate hearing loss.
              </p>
            </div>
            <div className="text-center text-gray-600 text-sm">
              <p>More ways to shop: Find an Apple Store or other retailer near you.</p>
              <p className="mt-4">Copyright © 2024 Apple Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Suggestions Layer - Only show when toolbar is visible */}
      {showSuggestions && isToolbarVisible && (
        <div className="suggestions-layer absolute inset-0 pointer-events-none">
          {filteredSuggestions.map((suggestion, index) => {
            const isMinimized = minimizedSuggestions.includes(suggestion.id)

            if (isMinimized) {
              // Minimized bubble view
              return (
                <div
                  key={suggestion.id}
                  className={`absolute w-12 h-12 ${getTypeColor(suggestion.type).replace("border-", "bg-").replace("-500", "-100")} rounded-full z-50 pointer-events-auto cursor-pointer flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-400 hover:scale-110 transition-all duration-200`}
                  style={{
                    left: `${Math.min(suggestion.x, typeof window !== "undefined" ? window.innerWidth - 50 : suggestion.x)}px`,
                    top: `${suggestion.y}px`,
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={() => expandSuggestion(suggestion.id)}
                >
                  <div
                    className={`w-6 h-6 ${getTypeColor(suggestion.type).replace("border-", "bg-")} rounded-full`}
                  ></div>
                </div>
              )
            }

            // Full suggestion view
            return (
              <div
                key={suggestion.id}
                className={`suggestion-box absolute w-80 bg-white rounded-lg shadow-lg border-l-4 ${getTypeColor(suggestion.type)} p-4 z-50 pointer-events-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500`}
                style={{
                  left: `${Math.min(suggestion.x, typeof window !== "undefined" ? window.innerWidth - 320 : suggestion.x)}px`,
                  top: `${suggestion.y}px`,
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getTypeBadgeColor(suggestion.type)}`}>{suggestion.type}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.section}
                    </Badge>
                  </div>
                  <button
                    onClick={() => minimizeSuggestion(suggestion.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <Minus size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{suggestion.suggestion}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => acceptSuggestion(suggestion.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-6"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => discardSuggestion(suggestion.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 h-6"
                    >
                      Discard
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Floating Toolbar */}
      {isToolbarVisible && (
        <div className="floating-toolbar fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50">
          <div className="bg-white rounded-full shadow-lg border px-4 py-3 flex items-center justify-between md:justify-center md:space-x-4 overflow-x-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {/* Toggle Suggestions */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSuggestions}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              {showSuggestions ? <EyeOff size={16} /> : <Eye size={16} />}
              <span className="hidden sm:inline">{showSuggestions ? "Hide" : "Show"}</span>
            </Button>

            {/* Hide All / Show All */}
            {showSuggestions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={minimizedSuggestions.length > 0 ? showAllSuggestions : hideAllSuggestions}
                className="flex items-center space-x-2 flex-shrink-0"
              >
                <span className="text-xs">{minimizedSuggestions.length > 0 ? "Show All" : "Hide All"}</span>
              </Button>
            )}

            {/* Filter Buttons */}
            <div className="flex space-x-2 flex-shrink-0">
              {(["Accessibility", "Visual", "UX"] as SuggestionType[]).map((type) => (
                <Button
                  key={type}
                  variant={activeFilters.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(type)}
                  className={`text-xs ${
                    activeFilters.includes(type)
                      ? type === "Accessibility"
                        ? "bg-blue-600"
                        : type === "Visual"
                          ? "bg-green-600"
                          : "bg-orange-600"
                      : ""
                  }`}
                >
                  <span className="hidden md:inline">{type}</span>
                  <span className="md:hidden">{type.charAt(0)}</span>
                </Button>
              ))}
            </div>

            {/* Suggestion Counter */}
            <Badge variant="secondary" className="bg-gray-100 flex-shrink-0">
              {filteredSuggestions.length - minimizedSuggestions.length}/{filteredSuggestions.length}
            </Badge>

            {/* Chat with LLM Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 flex-shrink-0">
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={copyForLLM}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy for LLM
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openInChatGPT}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in ChatGPT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openInClaude}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Claude
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* JSON View Modal */}
            <Dialog open={showJsonModal} onOpenChange={setShowJsonModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 flex-shrink-0">
                  <Code size={16} />
                  <span className="hidden sm:inline">JSON</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
                <DialogHeader className="animate-in fade-in-0 slide-in-from-top-4 duration-300 delay-100">
                  <DialogTitle>Suggestions JSON View</DialogTitle>
                </DialogHeader>
                <div className="bg-gray-900 text-green-400 p-4 max-h-[70vh] rounded-lg font-mono text-md overflow-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-200">
                  <pre className="language-json">
                    <code>{JSON.stringify(filteredSuggestions, null, 2)}</code>
                  </pre>
                </div>
                <div className="flex justify-end mt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-300">
                  <Button
                    onClick={() => exportSuggestions('json')}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    <Download size={16} />
                    <span>Download JSON</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 flex-shrink-0">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => exportSuggestions('json')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportSuggestions('pdf')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Refresh */}
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshSuggestions}
              disabled={isToolbarLoading}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              {isToolbarLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              <span className="hidden sm:inline">Refresh</span>
            </Button>



            {/* Minimize */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsToolbarVisible(false)}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <ChevronUp size={16} className="rotate-180" />
            </Button>
          </div>
        </div>
      )}

      {/* Minimized Toolbar Icon */}
      {!isToolbarVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsToolbarVisible(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-in fade-in-0 zoom-in-95 duration-300 hover:scale-110 transition-all duration-200"
          >
            <ChevronUp size={20} />
          </Button>
        </div>
      )}
    </div>
  )
}
