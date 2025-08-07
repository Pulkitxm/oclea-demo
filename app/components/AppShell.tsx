"use client";
import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import AuditOverlay from "./AuditOverlay";
import SuggestionsModal from "./SuggestionsModal";
import { usePersistentAuditPoints } from "./AuditOverlay";

// Type for audit point (duplicate from AuditOverlay for typing)
type AuditPoint = {
  id: number;
  key: string;
  top: number;
  left: number;
  suggestion: string;
};


export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showAll, setShowAll] = useState(false);
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // For visible suggestions
  const auditPoints: AuditPoint[] = usePersistentAuditPoints(18);
  const [rejected, setRejected] = useState<number[]>([]);
  const visiblePoints = (auditPoints || []).filter((p: AuditPoint) => !rejected.includes(p.id));

  // Handler for single bubble click
  const handleBubbleClick = (id: number) => {
    setOpenIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  // Handler for nav bar Show All/Hide All
  const handleShowAllToggle = () => {
    setShowAll((prev) => {
      if (!prev) {
        setOpenIds(visiblePoints.map((p: AuditPoint) => p.id));
      } else {
        setOpenIds([]);
      }
      return !prev;
    });
  };

  // Handler for nav bar Suggestions click
  const handleSuggestionsClick = () => {
    setModalOpen(true);
  };

  // Handler for closing modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handler for clicking a suggestion in modal
  const handleSuggestionSelect = (id: number) => {
    setOpenIds((prev) => prev.includes(id) ? prev : [...prev, id]);
    setModalOpen(false);
  };

  // Handler for nav bar open/close
  const handleNavOpenChange = (open: boolean) => {
    setNavOpen(open);
    if (!open) {
      setShowAll(false);
      setOpenIds([]);
    }
  };

  return (
    <>
      {children}
      {navOpen && (
        <AuditOverlay showAll={showAll} onBubbleClick={handleBubbleClick} openIds={openIds} />
      )}
      <BottomNavBar
        showAll={showAll}
        onShowAllToggle={handleShowAllToggle}
        onNavOpenChange={handleNavOpenChange}
        onSuggestionsClick={handleSuggestionsClick}
      />
      {modalOpen && (
        <SuggestionsModal
          onClose={handleModalClose}
          onSelect={handleSuggestionSelect}
          suggestions={visiblePoints.map((p: AuditPoint) => ({ id: p.id, suggestion: p.suggestion }))}
        />
      )}
    </>
  );
}
