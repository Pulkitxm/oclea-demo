import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

interface MinimizedToolbarProps {
  onShowToolbar: () => void
}

export function MinimizedToolbar({ onShowToolbar }: MinimizedToolbarProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onShowToolbar}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-in fade-in-0 zoom-in-95 duration-300 hover:scale-110 transition-all duration-200"
      >
        <ChevronUp size={20} />
      </Button>
    </div>
  )
} 