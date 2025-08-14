import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

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
import { FaChevronDown } from "react-icons/fa";

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
      // Don't close if clicking on the export button itself
      const target = e.target as Element;
      const exportBtn = target.closest("[data-export-btn]");
      if (exportBtn) return;

      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  // Download JSON (with full suggestion objects)
  function handleDownloadJSON() {
    const suggestionObjects = generateSuggestionObjects(suggestions);
    const blob = new Blob([JSON.stringify(suggestionObjects, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suggestions.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Download PDF (with full suggestion objects)
  function handleDownloadPDF() {
    const suggestionObjects = generateSuggestionObjects(suggestions);

    // Create a new PDF document
    const doc = new jsPDF();

    // Set up document properties
    doc.setProperties({
      title: "Website Audit Suggestions",
      subject: "Audit Report",
      author: "Website Audit Tool",
      creator: "Oclea",
    });

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue color
    doc.text("Website Audit Suggestions", 20, 25);

    // Add a line under the title
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);

    let yPosition = 45;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;

    suggestionObjects.forEach((obj, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - marginBottom - 40) {
        doc.addPage();
        yPosition = 25;
      }

      // Suggestion header with ID and priority
      doc.setFontSize(14);
      doc.setTextColor(30, 64, 175); // Dark blue
      doc.text(`Suggestion #${obj.id}`, 20, yPosition);

      // Priority badge
      const priorityColors = {
        high: [220, 38, 38], // Red
        medium: [217, 119, 6], // Orange
        low: [22, 163, 74], // Green
      };
      const [r, g, b] =
        priorityColors[obj.priority as keyof typeof priorityColors];
      doc.setTextColor(r, g, b);
      doc.setFontSize(10);
      doc.text(`[${obj.priority.toUpperCase()}]`, 150, yPosition);

      yPosition += 8;

      // Suggestion content
      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51); // Dark gray

      // Split long text into multiple lines
      const maxWidth = 170;
      const lines = doc.splitTextToSize(obj.suggestion, maxWidth);
      doc.text(lines, 20, yPosition);
      yPosition += lines.length * 5 + 5;

      // Metadata
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // Gray
      doc.text(`Type: ${obj.type}`, 20, yPosition);
      doc.text(`Section: ${obj.section}`, 80, yPosition);
      doc.text(`Position: (${obj.x}, ${obj.y})`, 140, yPosition);

      yPosition += 15;

      // Add a subtle separator line
      if (index < suggestionObjects.length - 1) {
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.line(20, yPosition - 5, 190, yPosition - 5);
      }
    });

    // Add footer with generation date
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        20,
        pageHeight - 10
      );
      doc.text(`Page ${i} of ${totalPages}`, 170, pageHeight - 10);
    }

    // Save the PDF
    doc.save("website-audit-suggestions.pdf");
  }

  // Position modal above Export nav button
  const [coords, setCoords] = useState<{ left: number; bottom: number } | null>(
    null
  );
  useEffect(() => {
    const btn = document.querySelector("[data-export-btn]");
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 24,
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
          ${
            show
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-4"
          }`}
        style={{
          left: `calc(${coords.left}px - 110px)`,
          bottom: `${coords.bottom}px`,
          transformOrigin: "bottom center",
        }}
      >
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 group z-20"
          onClick={onClose}
          aria-label="Close export menu"
        >
          <FaChevronDown className="text-sm transition-transform duration-200 group-hover:transform group-hover:translate-y-0.5" />
        </button>
        <div
          className={`relative z-10 transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <ul className="flex flex-col items-stretch gap-2 m-0 p-0 list-none">
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-2 py-1 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 relative"
              style={{ fontWeight: 500, letterSpacing: "0.01em" }}
              onClick={handleDownloadJSON}
            >
              <span role="img" aria-label="Export as JSON">
                📄
              </span>{" "}
              Export as JSON
            </li>
            <li
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-full px-2 py-1 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontWeight: 500, letterSpacing: "0.01em" }}
              onClick={handleDownloadPDF}
            >
              <span role="img" aria-label="Export as PDF">
                📄
              </span>{" "}
              Export as PDF
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
