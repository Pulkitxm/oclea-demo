"use client";
import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import AuditOverlay from "./AuditOverlay";
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
  // Removed unused openIds state
  const [navOpen, setNavOpen] = useState(false);
  // For visible suggestions
  const auditPoints: AuditPoint[] = usePersistentAuditPoints(18);
  const [rejected] = useState<number[]>([]);
  const visiblePoints = (auditPoints || []).filter(
    (p: AuditPoint) => !rejected.includes(p.id)
  );

  // Handler for single bubble click (no-op, openIds removed)
  const handleBubbleClick = () => {};

  // Handler for nav bar Show All/Hide All
  const handleShowAllToggle = () => {
    setShowAll((prev) => !prev);
  };

  // Handler for nav bar open/close
  const handleNavOpenChange = (open: boolean) => {
    setNavOpen(open);
    if (!open) {
      setShowAll(false);
    }
  };

  return (
    <>
      {children}
      {navOpen && (
        <AuditOverlay showAll={showAll} onBubbleClick={handleBubbleClick} />
      )}
      <BottomNavBar
        showAll={showAll}
        onShowAllToggle={handleShowAllToggle}
        onNavOpenChange={handleNavOpenChange}
      />
    </>
  );
}
