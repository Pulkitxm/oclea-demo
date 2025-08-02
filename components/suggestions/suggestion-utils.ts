import { SuggestionType } from "./suggestion-types"

export const getTypeColor = (type: SuggestionType) => {
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

export const getTypeBadgeColor = (type: SuggestionType) => {
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