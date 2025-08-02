import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus } from "lucide-react"
import { Suggestion } from "./suggestion-types"
import { getTypeColor, getTypeBadgeColor } from "./suggestion-utils"

interface SuggestionBubbleProps {
  suggestion: Suggestion
  index: number
  isMinimized: boolean
  isHighlighted: boolean
  onMinimize: (id: number) => void
  onExpand: (id: number) => void
  onAccept: (id: number) => void
  onDiscard: (id: number) => void
  onScrollTo: (id: number) => void
}

export function SuggestionBubble({
  suggestion,
  index,
  isMinimized,
  isHighlighted,
  onMinimize,
  onExpand,
  onAccept,
  onDiscard,
  onScrollTo,
}: SuggestionBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null)

  if (isMinimized) {
    // Minimized bubble view
    return (
      <div
        ref={bubbleRef}
        className={`absolute w-8 h-8 ${getTypeColor(suggestion.type).replace("border-", "bg-").replace("-500", "-100")} rounded-full z-50 pointer-events-auto cursor-pointer flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-400 hover:scale-110 transition-all duration-200 ${
          isHighlighted ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse' : ''
        }`}
        style={{
          left: `${Math.min(suggestion.x, typeof window !== "undefined" ? window.innerWidth - 50 : suggestion.x)}px`,
          top: `${suggestion.y}px`,
          animationDelay: `${index * 100}ms`,
        }}
        onClick={() => {
          onExpand(suggestion.id)
          onScrollTo(suggestion.id)
        }}
      >
        <div
          className={`w-4 h-4 ${getTypeColor(suggestion.type).replace("border-", "bg-")} rounded-full`}
        ></div>
      </div>
    )
  }

  // Full suggestion view
  return (
    <div
      ref={bubbleRef}
      className={`suggestion-box absolute w-80 bg-white rounded-lg shadow-lg border-l-4 ${getTypeColor(suggestion.type)} p-4 z-50 pointer-events-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500 ${
        isHighlighted ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse' : ''
      }`}
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
          onClick={() => onMinimize(suggestion.id)}
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
            onClick={() => onAccept(suggestion.id)}
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-6"
          >
            Accept
          </Button>
          <Button
            size="sm"
            onClick={() => onDiscard(suggestion.id)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 h-6"
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  )
} 