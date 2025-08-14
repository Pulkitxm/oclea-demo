import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SuggestionsModalProps {
  onClose: () => void;
  onSelect: (id: number) => void;
  suggestions: { id: number; suggestion: string }[];
}

const SuggestionsModal: React.FC<SuggestionsModalProps> = ({
  onClose,
  onSelect,
  suggestions,
}) => {
  const [coords, setCoords] = useState<{ left: number; bottom: number } | null>(
    null
  );
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Find the Suggestions nav button and get its position
  useEffect(() => {
    const btn = document.querySelector("[data-suggestions-btn]");
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 24, // 24px gap above nav for more space
      });
      setTimeout(() => setShow(true), 10); // trigger animation
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      // Don't close if clicking on the suggestions button itself
      const target = e.target as Element;
      const suggestionsBtn = target.closest("[data-suggestions-btn]");
      if (suggestionsBtn) return;

      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  if (!coords) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* lighter overlay, pointer-events only for modal */}
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={modalRef}
        className={`absolute pointer-events-auto left-0 bg-white/95 shadow-2xl max-w-md w-[340px] max-h-[60vh] p-4 border border-blue-100 flex flex-col rounded-2xl
          transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          ${
            show
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-4"
          }`}
        style={{
          left: `calc(${coords.left}px - 170px)`, // center modal above button
          bottom: `${coords.bottom}px`,
          transformOrigin: "bottom center",
        }}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 group z-20"
          onClick={onClose}
          aria-label="Close suggestions modal"
        >
          <FaChevronDown className="text-sm transition-transform duration-200 group-hover:transform group-hover:translate-y-0.5" />
        </button>
        <h2 className="text-lg font-bold mb-4 text-blue-700">
          All Suggestions
        </h2>
        <div className="overflow-y-auto flex-1 pr-2">
          {suggestions.map(({ id, suggestion }) => (
            <div
              key={id}
              className="mb-3 last:mb-0 p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("scroll-to-suggestion", { detail: { id } })
                );
                onSelect(id);
              }}
            >
              <div className="text-sm text-gray-800 font-medium">
                {suggestion}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsModal;
