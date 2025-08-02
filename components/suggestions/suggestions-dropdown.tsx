import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, ChevronDown, List } from "lucide-react"
import { Suggestion } from "./suggestion-types"
import { getTypeColor, getTypeBadgeColor } from "./suggestion-utils"

interface SuggestionsDropdownProps {
  suggestions: Suggestion[]
  isOpen: boolean
  highlightedSuggestion: number | null
  onToggle: () => void
  onSuggestionClick: (id: number) => void
}

export function SuggestionsDropdown({
  suggestions,
  isOpen,
  highlightedSuggestion,
  onToggle,
  onSuggestionClick,
}: SuggestionsDropdownProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80 max-h-96">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <List size={16} className="text-gray-600" />
            <span className="font-medium text-sm">Suggestions</span>
            <Badge variant="secondary" className="text-xs">
              {suggestions.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-6 w-6 p-0"
          >
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </div>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <ScrollArea className="h-80">
              <div className="p-2 space-y-1">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 border-l-4 ${
                      getTypeColor(suggestion.type)
                    } ${
                      highlightedSuggestion === suggestion.id ? 'bg-yellow-50 border-yellow-400' : ''
                    }`}
                    onClick={() => onSuggestionClick(suggestion.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getTypeBadgeColor(suggestion.type)}`}>
                          {suggestion.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.section}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{suggestion.priority}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {suggestion.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
} 