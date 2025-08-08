import React, { useEffect, useRef, useState } from "react";
// Helper to generate random suggestion objects (copied from SuggestionsJsonModal)
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
import { FaChevronDown } from 'react-icons/fa';

interface ExportModalProps {
  onClose: () => void;
  suggestions: string[];
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, suggestions }) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  // Close on click outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  // Download JSON (with full suggestion objects)
  function handleDownloadJSON() {
    const suggestionObjects = generateSuggestionObjects(suggestions);
    const blob = new Blob([JSON.stringify(suggestionObjects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suggestions.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Download PDF (with full suggestion objects)
  function handleDownloadPDF() {
    const suggestionObjects = generateSuggestionObjects(suggestions);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write('<html><head><title>Suggestions PDF</title></head><body>');
    win.document.write('<h2>Suggestions</h2>');
    win.document.write('<pre>' + suggestionObjects.map(obj =>
      `ID: ${obj.id}\nX: ${obj.x}\nY: ${obj.y}\nType: ${obj.type}\nSuggestion: ${obj.suggestion}\nPriority: ${obj.priority}\nSection: ${obj.section}\n\n`
    ).join('') + '</pre>');
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  }

  // Position modal above Export nav button
  const [coords, setCoords] = useState<{left: number, bottom: number} | null>(null);
  useEffect(() => {
    const btn = document.querySelector('[data-export-btn]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 24
      });
      setTimeout(() => setShow(true), 10);
    }
  }, []);

  if (!coords) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={modalRef}
        className={`absolute pointer-events-auto left-0 bg-white/95 shadow-2xl min-w-[200px] w-auto max-w-[240px] border border-blue-100 rounded-2xl
          transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          py-2 px-3
          ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}`}
        style={{
          left: `calc(${coords.left}px - 110px)`,
          bottom: `${coords.bottom}px`,
          transformOrigin: 'bottom center',
        }}
      >
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 group z-20"
          onClick={onClose}
          aria-label="Close export menu"
        >
          <FaChevronDown className="text-sm transition-transform duration-200 group-hover:transform group-hover:translate-y-0.5" />
        </button>
        <div className={`relative z-10 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="flex flex-col items-stretch gap-2 m-0 p-0 list-none">
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-2 py-1 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 relative"
              style={{ fontWeight: 500, letterSpacing: '0.01em' }}
              onClick={handleDownloadJSON}
            >
              <span role="img" aria-label="Export as JSON">📄</span> Export as JSON
            </li>
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-2 py-1 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontWeight: 500, letterSpacing: '0.01em' }}
              onClick={handleDownloadPDF}
            >
              <span role="img" aria-label="Export as PDF">📄</span> Export as PDF
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
