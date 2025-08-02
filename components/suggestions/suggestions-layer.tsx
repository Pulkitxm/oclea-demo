import { Suggestion } from "./suggestion-types"
import { SuggestionBubble } from "./suggestion-bubble"

interface SuggestionsLayerProps {
  suggestions: Suggestion[]
  minimizedSuggestions: number[]
  highlightedSuggestion: number | null
  onMinimize: (id: number) => void
  onExpand: (id: number) => void
  onAccept: (id: number) => void
  onDiscard: (id: number) => void
  onScrollTo: (id: number) => void
}

export function SuggestionsLayer({
  suggestions,
  minimizedSuggestions,
  highlightedSuggestion,
  onMinimize,
  onExpand,
  onAccept,
  onDiscard,
  onScrollTo,
}: SuggestionsLayerProps) {
  return (
    <div className="suggestions-layer absolute inset-0 pointer-events-none">
      {suggestions.map((suggestion, index) => {
        const isMinimized = minimizedSuggestions.includes(suggestion.id)
        const isHighlighted = highlightedSuggestion === suggestion.id

        return (
          <SuggestionBubble
            key={suggestion.id}
            suggestion={suggestion}
            index={index}
            isMinimized={isMinimized}
            isHighlighted={isHighlighted}
            onMinimize={onMinimize}
            onExpand={onExpand}
            onAccept={onAccept}
            onDiscard={onDiscard}
            onScrollTo={onScrollTo}
          />
        )
      })}
    </div>
  )
} 