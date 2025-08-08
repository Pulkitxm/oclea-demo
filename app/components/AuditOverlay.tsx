// Type for audit point
type AuditPoint = {
  id: number;
  key: string;
  top: number;
  left: number;
  suggestion: string;
};
import React, { useState, useEffect } from 'react';

// Generate audit points scattered across the full scrollable page
export const SUGGESTIONS = [
  'Add skip navigation link for keyboard users to jump directly to main content.',
  'Consider adding search suggestions dropdown for better user guidance.',
  'Add a sticky header for easier navigation.',
  'Add alt text to all images for accessibility.',
  'Ensure all buttons have accessible labels.',
  'Use consistent heading sizes for better hierarchy.',
  'Add section headings for improved structure.',
  'Add a dismiss option for the country selection banner to improve user experience.',
  'Use more whitespace between sections for clarity.',
  'Increase line height for better readability.',
  'Add bullet points for better list clarity.',
  'Ensure all links are underlined for visibility.',
  'Add descriptive titles to SVG icons.',
  'Add a sticky footer for better navigation.',
  'Add form validation for better user feedback.',
  'Use larger input fields for easier typing.',
  'Ensure all form fields have associated labels.',
  'Add a sidebar for quick access to important links.',
  'Use article tags for blog content for better semantics.',
  'Avoid excessive nesting of divs for cleaner markup.',
  'Improve color contrast for accessibility.',
  'Add hover states to cards for better interactivity.',
  'Make the page title more descriptive for SEO.',
  'Add meta description for better search engine visibility.',
  'Add a floating action button for quick actions.',
  'Add a back-to-top button for easier navigation.',
  'Add a dark mode toggle for user preference.',
  'Add a loading spinner for async actions.',
  'Add a progress bar for long operations.',
  'Add a notification bell for updates.',
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Generate a persistent mapping from suggestion id to position
function generateAuditPoints(count: number, docHeight = 2000, docWidth = 1200): AuditPoint[] {
  const points: AuditPoint[] = [];
  for (let i = 0; i < count; i++) {
    let y;
    if (i < count / 3) {
      y = getRandomInt(40, Math.floor(docHeight * 0.33));
    } else if (i < (2 * count) / 3) {
      y = getRandomInt(Math.floor(docHeight * 0.33) + 40, Math.floor(docHeight * 0.66));
    } else {
      y = getRandomInt(Math.floor(docHeight * 0.66) + 40, docHeight - 120);
    }
    const x = getRandomInt(40, docWidth - 320);
    points.push({
      id: i + 1,
      key: `suggestion-${i + 1}`,
      top: y,
      left: x,
      suggestion: SUGGESTIONS[i % SUGGESTIONS.length],
    });
  }
  return points;
}


// Persist audit points in state so coordinates don't change on rerender

export function usePersistentAuditPoints(count: number): AuditPoint[] {
  // Always [] on server, hydrate on client
  const [points, setPoints] = React.useState<AuditPoint[]>([]);
  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const saved = window.localStorage.getItem('auditPoints');
    if (saved) {
      setPoints(JSON.parse(saved));
    } else {
      const docHeight = document.body.scrollHeight;
      const docWidth = document.body.scrollWidth;
      const pts = generateAuditPoints(count, docHeight, docWidth);
      window.localStorage.setItem('auditPoints', JSON.stringify(pts));
      setPoints(pts);
    }
  }, [count]);
  return points;
}

interface AuditOverlayProps {
  showAll: boolean;
  onBubbleClick: (id: number) => void;
  openIds: number[];
}


const AuditOverlay: React.FC<AuditOverlayProps> = ({ showAll, onBubbleClick, openIds }) => {
  const auditPoints = usePersistentAuditPoints(18);
  const [rejected, setRejected] = useState<number[]>([]);
  // Only one box open at a time (by id), or null for all bubbles
  const [openBoxId, setOpenBoxId] = useState<number | null>(null);

  // Close box on outside click
  useEffect(() => {
    if (openBoxId === null) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.audit-suggestion-box')) {
        setOpenBoxId(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openBoxId]);

  // Remove rejected points
  const visiblePoints = auditPoints.filter((p: AuditPoint) => !rejected.includes(p.id));


  // For scroll-to-suggestion: assign a ref to each suggestion by id
  const suggestionRefs = React.useRef<{ [id: number]: HTMLDivElement | null }>({});


  // Listen for custom scroll-to-suggestion event (by id)
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const el = suggestionRefs.current[e.detail.id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setOpenBoxId(e.detail.id); // Always open the box at the exact bubble
      }
    };
    window.addEventListener('scroll-to-suggestion', handler as EventListener);
    return () => window.removeEventListener('scroll-to-suggestion', handler as EventListener);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40">
      {visiblePoints.map((point: AuditPoint) => {
        // If showAll is true, all boxes are open; otherwise, only the selected one
        const isBoxOpen = showAll || openBoxId === point.id;
        return (
          <div
            key={point.id}
            ref={el => { suggestionRefs.current[point.id] = el; }}
            style={{ position: 'absolute', top: point.top, left: point.left, zIndex: 50 }}
          >
            {/* Bubble: only show if box is not open for this point */}
            {!isBoxOpen && (
              <div
                className="w-8 h-8 bg-blue-500 shadow-lg rounded-full flex items-center justify-center scale-100 opacity-90 cursor-pointer hover:scale-110 audit-suggestion-bubble pointer-events-auto select-none"
                onClick={() => {
                  setOpenBoxId(point.id);
                  onBubbleClick(point.id);
                }}
                style={{ minHeight: '32px', minWidth: '32px' }}
              >
                <span className="w-3 h-3 bg-white rounded-full block border-2 border-blue-500"></span>
              </div>
            )}
            {/* Box: show if box is open for this point, or showAll is true */}
            {isBoxOpen && (
              <div
                className="audit-suggestion-box w-80 max-w-xs bg-white/95 shadow-2xl rounded-xl p-4 scale-100 opacity-100 border border-blue-200 transition-all duration-500 ease-[cubic-bezier(.4,2,.6,1)] pointer-events-auto select-none relative group"
                style={{ minHeight: '64px', minWidth: '180px', boxShadow: '0 8px 32px 0 rgba(0, 80, 255, 0.10)' }}
              >
                {/* Only show close button if not showAll */}
                {!showAll && (
                  <button
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                    onClick={e => {
                      e.stopPropagation();
                      setOpenBoxId(null);
                    }}
                    aria-label="Close suggestion"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                )}
                <div className="absolute -top-3 left-6 w-4 h-4 rotate-45 bg-white border-l border-t border-blue-200 z-10"></div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">UI Suggestion</span>
                </div>
                <div className="text-sm text-gray-800 font-medium leading-snug mb-3">
                  {point.suggestion}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold text-xs hover:bg-green-200 transition"
                    onClick={e => {
                      e.stopPropagation();
                      if (!showAll) setOpenBoxId(null);
                    }}
                  >Accept</button>
                  <button
                    className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold text-xs hover:bg-red-200 transition"
                    onClick={e => {
                      e.stopPropagation();
                      setRejected(r => [...r, point.id]);
                      if (!showAll) setOpenBoxId(null);
                    }}
                  >Reject</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AuditOverlay;
