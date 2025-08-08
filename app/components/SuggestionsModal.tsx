import React, { useEffect, useRef, useState } from "react";

interface SuggestionsModalProps {
  onClose: () => void;
  onSelect: (id: number) => void;
  suggestions: { id: number; suggestion: string }[];
}


const SuggestionsModal: React.FC<SuggestionsModalProps> = ({ onClose, onSelect, suggestions }) => {
  const [coords, setCoords] = useState<{left: number, bottom: number} | null>(null);
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Find the Suggestions nav button and get its position
  useEffect(() => {
    const btn = document.querySelector('[data-suggestions-btn]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 24 // 24px gap above nav for more space
      });
      setTimeout(() => setShow(true), 10); // trigger animation
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

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* lighter overlay, pointer-events only for modal */}
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={modalRef}
        className={`absolute pointer-events-auto left-0 duration-400 ease-[cubic-bezier(.22,1,.36,1)] bg-white/95 shadow-2xl max-w-md w-[340px] max-h-[60vh] p-4 border border-blue-100 flex flex-col rounded-2xl
          ${show ? 'modal-premium-in' : 'modal-premium-out'}`}
        style={{
          left: `calc(${coords.left}px - 170px)`, // center modal above button
          bottom: `${coords.bottom}px`,
          transformOrigin: 'bottom center',
        }}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close suggestions modal"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M5 5l10 10m0-10L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <h2 className="text-lg font-bold mb-4 text-blue-700">All Suggestions</h2>
        <div className="overflow-y-auto flex-1 pr-2">
          {suggestions.map(({ id, suggestion }) => (
            <div
              key={id}
              className="mb-3 last:mb-0 p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('scroll-to-suggestion', { detail: { id } }));
                onSelect(id);
              }}
            >
              <div className="text-sm text-gray-800 font-medium">{suggestion}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};







const style = document.createElement('style');
style.innerHTML = `
.modal-premium-in {
  animation: modalPopIn 340ms cubic-bezier(.33,1.2,.68,1);
  animation-fill-mode: forwards;
}
.modal-premium-out {
  animation: modalPopOut 220ms cubic-bezier(.33,1.2,.68,1);
  animation-fill-mode: forwards;
}
@keyframes modalPopIn {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(40px);
  }
  60% {
    opacity: 1;
    transform: scale(1.04) translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes modalPopOut {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.92) translateY(40px);
  }
}
`;
if (typeof window !== 'undefined' && !document.getElementById('modal-premium-style')) {
  style.id = 'modal-premium-style';
  document.head.appendChild(style);
}

export default SuggestionsModal;
