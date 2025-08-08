import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from 'react-icons/fa';

interface SuggestionsJsonModalProps {
  onClose: () => void;
  suggestions: string[];
}

// Helper to generate random suggestion objects
function generateSuggestionObjects(suggestions: string[]) {
  const types = ["Accessibility", "UX", "Performance", "SEO", "Content"];
  const priorities = ["high", "medium", "low"];
  const sections = ["Navigation", "Banner", "Footer", "Sidebar", "Main"];
  return suggestions.map((suggestion, i) => ({
    id: i + 1,
    x: Math.floor(Math.random() * 1200),
    y: Math.floor(Math.random() * 600),
    type: types[Math.floor(Math.random() * types.length)],
    suggestion,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    section: sections[Math.floor(Math.random() * sections.length)],
  }));
}

const SuggestionsJsonModal: React.FC<SuggestionsJsonModalProps> = ({ onClose, suggestions }) => {
  const [coords, setCoords] = useState<{left: number, bottom: number} | null>(null);
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const suggestionObjects = generateSuggestionObjects(suggestions);

  // Find the JSON nav button and get its position
  useEffect(() => {
    const btn = document.querySelector('[data-json-btn]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 24
      });
      setTimeout(() => setShow(true), 10);
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  if (!coords) return null;

  // Modal: wide, just above navbar, full border radius, modern color, better padding
  return (
    <div className="fixed inset-0 bottom-3 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={modalRef}
        className={`absolute left-1/2 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] pointer-events-auto
          bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] shadow-2xl w-[540px] max-w-full max-h-[70vh] pb-6 pt-5 px-6 border border-blue-200 flex flex-col rounded-2xl
          ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
        style={{
          left: '50%',
          bottom: '90px', // just above navbar
          transform: 'translateX(-50%)',
          transformOrigin: 'bottom center',
        }}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 group z-20"
          onClick={onClose}
          aria-label="Close JSON modal"
        >
          <FaChevronDown className="text-sm transition-transform duration-200 group-hover:transform group-hover:translate-y-0.5" />
        </button>
        <h2 className="text-base font-bold mb-3 text-blue-800">Suggestions JSON View</h2>
        <div className="overflow-y-auto flex-1 pr-1">
          <pre className="bg-[#23263a] text-[#e6e6e6] rounded-xl p-4 text-xs whitespace-pre-wrap border border-[#2d3250]">
            {JSON.stringify(suggestionObjects, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsJsonModal;
