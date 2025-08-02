"use client"

import { useState, useRef } from "react"
import jsPDF from "jspdf"
import { WebsiteContent } from "@/components/website/website-content"
import { SuggestionsLayer } from "@/components/suggestions/suggestions-layer"

import { FloatingToolbar } from "@/components/toolbar/floating-toolbar"
import { MinimizedToolbar } from "@/components/toolbar/minimized-toolbar"
import { sampleSuggestions, SuggestionType } from "@/components/suggestions/suggestion-types"

export default function UIUXSuggestionTool() {
  const [suggestions] = useState(sampleSuggestions)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [activeFilters, setActiveFilters] = useState<SuggestionType[]>(["Accessibility", "Visual", "UX"])
  const [closedSuggestions, setClosedSuggestions] = useState<number[]>([])
  const [minimizedSuggestions, setMinimizedSuggestions] = useState<number[]>(sampleSuggestions.map(s => s.id))
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [isToolbarLoading, setIsToolbarLoading] = useState(false)
  const [showJsonModal, setShowJsonModal] = useState(false)

  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number | null>(null)
  const suggestionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

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

  const scrollToSuggestion = (suggestionId: number) => {
    const suggestion = suggestions.find(s => s.id === suggestionId)
    if (suggestion) {
      // Scroll to the suggestion position
      window.scrollTo({
        top: suggestion.y - 100,
        behavior: 'smooth'
      })
      
      // Highlight the suggestion
      setHighlightedSuggestion(suggestionId)
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedSuggestion(null)
      }, 3000)
    }
  }



  return (
    <div className="page-container relative min-h-screen bg-white overflow-x-hidden">
      {/* Apple.com Website Recreation */}
      <WebsiteContent />

      {/* Suggestions Layer - Only show when toolbar is visible */}
      {showSuggestions && isToolbarVisible && (
        <SuggestionsLayer
          suggestions={filteredSuggestions}
          minimizedSuggestions={minimizedSuggestions}
          highlightedSuggestion={highlightedSuggestion}
          onMinimize={minimizeSuggestion}
          onExpand={expandSuggestion}
          onAccept={acceptSuggestion}
          onDiscard={discardSuggestion}
          onScrollTo={scrollToSuggestion}
        />
      )}



      {/* Floating Toolbar */}
      {isToolbarVisible && (
        <FloatingToolbar
          showSuggestions={showSuggestions}
          activeFilters={activeFilters}
          filteredSuggestions={filteredSuggestions}
          minimizedSuggestions={minimizedSuggestions}
          isToolbarLoading={isToolbarLoading}
          showJsonModal={showJsonModal}
          highlightedSuggestion={highlightedSuggestion}
          onToggleSuggestions={toggleSuggestions}
          onHideAllSuggestions={hideAllSuggestions}
          onShowAllSuggestions={showAllSuggestions}
          onToggleFilter={toggleFilter}
          onRefreshSuggestions={refreshSuggestions}
          onSetShowJsonModal={setShowJsonModal}
          onExportSuggestions={exportSuggestions}
          onCopyForLLM={copyForLLM}
          onOpenInChatGPT={openInChatGPT}
          onOpenInClaude={openInClaude}
          onMinimizeToolbar={() => setIsToolbarVisible(false)}
          onSuggestionClick={scrollToSuggestion}
        />
      )}

      {/* Minimized Toolbar Icon */}
      {!isToolbarVisible && (
        <MinimizedToolbar onShowToolbar={() => setIsToolbarVisible(true)} />
      )}
    </div>
  )
}
