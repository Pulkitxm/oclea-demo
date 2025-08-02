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
import {
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  ChevronUp,
  MessageSquare,
  Copy,
  ExternalLink,
  Loader2,
  FileText,
  Code,
  List,
} from "lucide-react"
import { SuggestionType } from "@/components/suggestions/suggestion-types"
import { getTypeBadgeColor } from "@/components/suggestions/suggestion-utils"

interface FloatingToolbarProps {
  showSuggestions: boolean
  activeFilters: SuggestionType[]
  filteredSuggestions: any[]
  minimizedSuggestions: number[]
  isToolbarLoading: boolean
  showJsonModal: boolean
  highlightedSuggestion: number | null
  onToggleSuggestions: () => void
  onHideAllSuggestions: () => void
  onShowAllSuggestions: () => void
  onToggleFilter: (type: SuggestionType) => void
  onRefreshSuggestions: () => void
  onSetShowJsonModal: (show: boolean) => void
  onExportSuggestions: (format: 'json' | 'pdf') => void
  onCopyForLLM: () => void
  onOpenInChatGPT: () => void
  onOpenInClaude: () => void
  onMinimizeToolbar: () => void
  onSuggestionClick: (id: number) => void
}

export function FloatingToolbar({
  showSuggestions,
  activeFilters,
  filteredSuggestions,
  minimizedSuggestions,
  isToolbarLoading,
  showJsonModal,
  highlightedSuggestion,
  onToggleSuggestions,
  onHideAllSuggestions,
  onShowAllSuggestions,
  onToggleFilter,
  onRefreshSuggestions,
  onSetShowJsonModal,
  onExportSuggestions,
  onCopyForLLM,
  onOpenInChatGPT,
  onOpenInClaude,
  onMinimizeToolbar,
  onSuggestionClick,
}: FloatingToolbarProps) {
  return (
    <div className="floating-toolbar fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border px-4 py-3 flex items-center justify-between md:justify-center md:space-x-4 overflow-x-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        {/* Toggle Suggestions */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSuggestions}
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
            onClick={minimizedSuggestions.length > 0 ? onShowAllSuggestions : onHideAllSuggestions}
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <span className="text-xs">{minimizedSuggestions.length > 0 ? "Show All" : "Hide All"}</span>
          </Button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 flex-shrink-0">
                <List size={16} />
                <span className="hidden sm:inline">Suggestions</span>
                <Badge variant="secondary" className="text-xs">
                  {filteredSuggestions.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96">
              <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <DropdownMenuItem
                    key={suggestion.id}
                    onClick={() => onSuggestionClick(suggestion.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 border-l-4 ${
                      suggestion.type === 'Accessibility' ? 'border-blue-500' :
                      suggestion.type === 'Visual' ? 'border-green-500' : 'border-orange-500'
                    } ${
                      highlightedSuggestion === suggestion.id ? 'bg-yellow-50 border-yellow-400' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
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
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mt-2">
                      {suggestion.suggestion}
                    </p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}



        {/* Chat with LLM Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 flex-shrink-0">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Chat</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onCopyForLLM}>
              <Copy className="mr-2 h-4 w-4" />
              Copy for LLM
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenInChatGPT}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in ChatGPT
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenInClaude}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in Claude
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* JSON View Modal */}
        <Dialog open={showJsonModal} onOpenChange={onSetShowJsonModal}>
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
                onClick={() => onExportSuggestions('json')}
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
            <DropdownMenuItem onClick={() => onExportSuggestions('json')}>
              <FileText className="mr-2 h-4 w-4" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExportSuggestions('pdf')}>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Refresh */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefreshSuggestions}
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
          onClick={onMinimizeToolbar}
          className="flex items-center space-x-2 flex-shrink-0"
        >
          <ChevronUp size={16} className="rotate-180" />
        </Button>
      </div>
    </div>
  )
} 