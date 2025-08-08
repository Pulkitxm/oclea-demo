import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from 'react-icons/fa';

interface ChatModalProps {
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [coords, setCoords] = useState<{left: number, bottom: number} | null>(null);
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Find the Chat nav button and get its position
  useEffect(() => {
    const btn = document.querySelector('[data-chat-btn]');
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


  // Mock suggestions array for copy in LLM
  const allSuggestions = [
    'Suggestion 1',
    'Suggestion 2',
    'Suggestion 3',
  ];

  const [copied, setCopied] = useState(false);
  const handleCopyInLLM = async () => {
    try {
      await navigator.clipboard.writeText(allSuggestions.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {}
  };

  if (!coords) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={modalRef}
        className={`absolute pointer-events-auto left-0 bg-white/95 shadow-2xl w-[200px] max-h-[40vh] p-4 border border-blue-100 flex flex-col rounded-2xl
          transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}`}
        style={{
          left: `calc(${coords.left}px - 100px)`,
          bottom: `${coords.bottom}px`,
          transformOrigin: 'bottom center',
        }}
      >
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 group z-20"
          onClick={onClose}
          aria-label="Close chat menu"
        >
          <FaChevronDown className="text-sm transition-transform duration-200 group-hover:transform group-hover:translate-y-0.5" />
        </button>
        <div className={`relative z-10 h-full flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="flex flex-col items-stretch gap-3 m-0 p-0 list-none px-2 py-2">
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-3 py-1.5 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 relative"
              style={{ fontWeight: 500, letterSpacing: '0.01em' }}
              onClick={handleCopyInLLM}
            >
              <span role="img" aria-label="Copy in LLM">📋</span> Copy for LLM
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs shadow">Copied!</span>
              )}
            </li>
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-3 py-1.5 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontWeight: 500, letterSpacing: '0.01em' }}
              onClick={() => window.open('https://chat.openai.com', '_blank')}
            >
              <span role="img" aria-label="Open in ChatGPT">🌐</span> Open in ChatGPT
            </li>
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-3 py-1.5 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontWeight: 500, letterSpacing: '0.01em' }}
              onClick={() => window.open('https://claude.ai/', '_blank')}
            >
              <span role="img" aria-label="Open in Claude">☁️</span> Open in Claude
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
