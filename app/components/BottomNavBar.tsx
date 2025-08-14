"use client";
import React, { useState, useEffect } from "react";
import ChatModal from "./ChatModal";
import SuggestionsJsonModal from "./SuggestionsJsonModal";
import SuggestionsModal from "./SuggestionsModal";
import { SUGGESTIONS } from "./AuditOverlay";
import ExportModal from "./ExportModal";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  List,
  MessageSquare,
  Download,
  RefreshCw,
  FileText,
  LayoutList,
} from "lucide-react";

interface BottomNavBarProps {
  showAll: boolean;
  onShowAllToggle: () => void;
  onNavOpenChange?: (open: boolean) => void;
}

const navOptions = [
  // The first option will be replaced dynamically
  { label: "", icon: LayoutList, isShowAll: true },
  { label: "Suggestions", icon: List },
  { label: "Chat", icon: MessageSquare },
  { label: "JSON", icon: FileText },
  { label: "Export", icon: Download },
  { label: "Refresh", icon: RefreshCw },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  showAll,
  onShowAllToggle,
  onNavOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationStage, setAnimationStage] = useState<
    "closed" | "capsule" | "expanding" | "open" | "collapsing"
  >("closed");
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [suggestionsModalOpen, setSuggestionsModalOpen] = useState(false);

  // Refresh button loader state
  const [refreshLoading, setRefreshLoading] = useState(false);
  const handleRefreshClick = () => {
    if (refreshLoading) return;
    setRefreshLoading(true);
    setTimeout(() => setRefreshLoading(false), 1000);
  };

  // Use canonical SUGGESTIONS array from AuditOverlay
  const allSuggestions = SUGGESTIONS;

  // Close modals i</div>f nav closes
  useEffect(() => {
    if (!isOpen) setChatModalOpen(false);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setAnimationStage("capsule");
    if (onNavOpenChange) onNavOpenChange(true);
  };

  const handleClose = () => {
    setAnimationStage("collapsing");
    if (onNavOpenChange) onNavOpenChange(false);
    setChatModalOpen(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (animationStage === "capsule") {
      timeout = setTimeout(() => {
        setAnimationStage("expanding");
      }, 100);
    } else if (animationStage === "expanding") {
      timeout = setTimeout(() => {
        setAnimationStage("open");
      }, 50);
    } else if (animationStage === "collapsing") {
      timeout = setTimeout(() => {
        setAnimationStage("closed");
        setIsOpen(false);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [animationStage]);

  const FloatingButton = () => (
    <button
      className={`fixed right-6 bottom-6 w-12 h-12 rounded-full bg-black/95 backdrop-blur-xl 
        border border-[#333] shadow-sm shadow-[#5e5e5e] flex items-center justify-center z-50 
        transition-all duration-300 hover:scale-110 active:scale-95 group 
        ${
          isOpen
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100 animate-pulse"
        }
      `}
      aria-label="Open bottom nav"
      onClick={handleOpen}
    >
      <FaChevronUp
        className="text-sm text-white relative z-10 transition-transform duration-200
        group-hover:transform group-hover:-translate-y-0.5"
      />
    </button>
  );

  const getNavStyles = () => {
    const capsuleHeight = "60px";
    const capsuleRadius = "30px";
    switch (animationStage) {
      case "capsule":
        return {
          width: "60px",
          height: capsuleHeight,
          borderRadius: "30px",
          opacity: 1,
          transform: "translateX(-50%) scale(1)",
        };
      case "expanding":
      case "open":
        return {
          width: "auto",
          minWidth: "60px",
          height: capsuleHeight,
          borderRadius: capsuleRadius,
          opacity: 1,
          transform: "translateX(-50%) scale(1)",
        };
      case "collapsing":
        return {
          width: "60px",
          height: capsuleHeight,
          borderRadius: "30px",
          opacity: 0,
          transform: "translateX(-50%) scale(0.8)",
        };
      default:
        return {
          width: "60px",
          height: capsuleHeight,
          borderRadius: "30px",
          opacity: 0,
          transform: "translateX(-50%) scale(0)",
        };
    }
  };

  return (
    <>
      <FloatingButton />

      {isOpen && (
        <nav
          className="fixed left-1/2 bottom-8 bg-black/95 backdrop-blur-xl 
            shadow-sm border border-[#333] shadow-[#000]/20 z-50 overflow-hidden
            transition-all duration-500 ease-out"
          style={getNavStyles()}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-800/20"></div>

          <div
            className={`relative z-10 h-full flex items-center justify-center transition-opacity duration-300 ${
              animationStage === "open" ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul className="flex items-center gap-3 m-0 p-0 list-none px-4">
              {navOptions.map((opt, index) => {
                // First option is Show All/Hide All
                if (opt.isShowAll) {
                  return (
                    <li
                      key={showAll ? "Hide All" : "Show All"}
                      className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                        px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                        transition-all duration-300
                        hover:scale-105 active:scale-95 hover:bg-white/10
                        transform ${
                          animationStage === "open"
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                      onClick={onShowAllToggle}
                    >
                      <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                      {showAll ? "Hide All" : "Show All"}
                    </li>
                  );
                }
                // Chat option: open submenu
                if (opt.label === "Chat") {
                  return (
                    <li
                      key={opt.label}
                      data-chat-btn
                      className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                        px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                        transition-all duration-300
                        hover:scale-105 active:scale-95 hover:bg-white/10
                        transform ${
                          animationStage === "open"
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }
                        relative
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChatModalOpen((open) => {
                          if (open) return false; // If open, close only
                          return true; // If closed, open
                        });
                      }}
                    >
                      {opt.icon && (
                        <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                      )}
                      {opt.label}
                    </li>
                  );
                }
                // JSON option: open/close JSON modal
                if (opt.label === "JSON") {
                  return (
                    <li
                      key={opt.label}
                      data-json-btn
                      className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                        px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                        transition-all duration-300
                        hover:scale-105 active:scale-95 hover:bg-white/10
                        transform ${
                          animationStage === "open"
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }
                        relative
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setJsonModalOpen((open) => {
                          if (open) return false;
                          return true;
                        });
                      }}
                    >
                      {opt.icon && (
                        <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                      )}
                      {opt.label}
                    </li>
                  );
                }
                // Export option: open/close Export modal
                if (opt.label === "Export") {
                  return (
                    <li
                      key={opt.label}
                      data-export-btn
                      className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                        px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                        transition-all duration-300
                        hover:scale-105 active:scale-95 hover:bg-white/10
                        transform ${
                          animationStage === "open"
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }
                        relative
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExportModalOpen((open) => {
                          if (open) return false;
                          return true;
                        });
                      }}
                    >
                      {opt.icon && (
                        <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                      )}
                      {opt.label}
                    </li>
                  );
                }
                // Refresh option: show loader on click
                if (opt.label === "Refresh") {
                  return (
                    <li
                      key={opt.label}
                      className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                        px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                        transition-all duration-300
                        hover:scale-105 active:scale-95 hover:bg-white/10
                        transform ${
                          animationStage === "open"
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }
                        relative
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRefreshClick();
                      }}
                    >
                      {refreshLoading ? (
                        <span className="w-4 h-4 mr-1 flex items-center justify-center">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
                        </span>
                      ) : (
                        opt.icon && (
                          <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                        )
                      )}
                      {opt.label}
                    </li>
                  );
                }
                return (
                  <li
                    key={opt.label}
                    data-suggestions-btn={
                      opt.label === "Suggestions" ? true : undefined
                    }
                    className={`flex items-center gap-2 text-sm font-medium text-white rounded-full 
                      px-3 py-1.5 cursor-pointer select-none whitespace-nowrap
                      transition-all duration-300
                      hover:scale-105 active:scale-95 hover:bg-white/10
                      transform ${
                        animationStage === "open"
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-0"
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 30}ms`,
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}
                    onClick={
                      opt.label === "Suggestions"
                        ? (e) => {
                            e.stopPropagation();
                            setSuggestionsModalOpen((prev) => !prev);
                          }
                        : undefined
                    }
                  >
                    {opt.icon && (
                      <opt.icon className="w-4 h-4 mr-1 text-gray-300" />
                    )}
                    {opt.label}
                  </li>
                );
              })}

              <li className="ml-2">
                <button
                  className={`bg-white/10 hover:bg-white/20 border border-white/20 rounded-full 
                    w-8 h-8 flex items-center justify-center text-white shadow-sm 
                    cursor-pointer transition-all duration-300 hover:shadow-md
                    hover:scale-110 active:scale-95 group
                    transform ${
                      animationStage === "open"
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }
                  `}
                  style={{ transitionDelay: `${navOptions.length * 30}ms` }}
                  aria-label="Close bottom nav"
                  onClick={handleClose}
                >
                  <FaChevronDown
                    className="text-sm transition-transform duration-200 
                    group-hover:transform group-hover:translate-y-0.5"
                  />
                </button>
              </li>
            </ul>
          </div>

          {animationStage === "capsule" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-6 h-6 border-2 border-white border-t-transparent 
                rounded-full animate-spin"
              ></div>
            </div>
          )}
        </nav>
      )}
      {/* Chat modal rendered at root level for correct animation and click-away */}
      {chatModalOpen && <ChatModal onClose={() => setChatModalOpen(false)} />}
      {/* JSON modal rendered at root level for correct animation and click-away */}
      {jsonModalOpen && (
        <SuggestionsJsonModal
          suggestions={allSuggestions}
          onClose={() => setJsonModalOpen(false)}
        />
      )}
      {/* Export modal rendered at root level for correct animation and click-away */}
      {exportModalOpen && (
        <ExportModal
          suggestions={allSuggestions}
          onClose={() => setExportModalOpen(false)}
        />
      )}
      {/* Suggestions modal rendered at root level for correct animation and click-away */}
      {suggestionsModalOpen && (
        <SuggestionsModal
          suggestions={allSuggestions.map((suggestion, index) => ({
            id: index + 1,
            suggestion,
          }))}
          onClose={() => setSuggestionsModalOpen(false)}
          onSelect={() => setSuggestionsModalOpen(false)}
        />
      )}
    </>
  );
};

export default BottomNavBar;
