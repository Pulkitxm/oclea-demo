export type SuggestionType = "Accessibility" | "Visual" | "UX"

export interface Suggestion {
  id: number
  x: number
  y: number
  type: SuggestionType
  suggestion: string
  priority: string
  section: string
}

// Comprehensive suggestions data with code estimates
export const sampleSuggestions: Suggestion[] = [
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