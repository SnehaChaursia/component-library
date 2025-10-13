import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/utils"; // optional helper for merging classes

/**
 * Accordion Component
 *
 * Props:
 * - items: Array<{ id?: string|number, title: string, content: ReactNode }>
 * - allowMultiple: boolean (default: false)
 * - alwaysOpen: boolean (default: false)
 * - defaultOpen: string | number | string[] | number[] (default: none)
 * - variant: 'bordered' | 'shadow' | 'minimal' (default: 'bordered')
 */

const Accordion = ({
  items = [],
  allowMultiple = false,
  alwaysOpen = false,
  defaultOpen = [],
  variant = "bordered",
  headingTitle = "",
}) => {
  // Normalize defaultOpen into an array
  const defaultOpenArray = Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen];
  const [openItems, setOpenItems] = useState(defaultOpenArray);

  const toggleItem = (id) => {
    if (alwaysOpen) return; // cannot close items in alwaysOpen mode

    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "shadow":
        return "bg-white dark:bg-gray-800 shadow-md rounded-lg";
      case "minimal":
        return "border-b border-gray-300 dark:border-gray-700";
      default:
        return "border border-gray-300 dark:border-gray-700 rounded-lg";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900 dark:text-white">{headingTitle}</span>
      </div>
      {items.map((item, idx) => {
        const id = item.id ?? idx;
        const isOpen = alwaysOpen || openItems.includes(id);

        return (
          <div key={id} className={`mb-2 ${getVariantClasses()}`}>
            <button
              onClick={() => toggleItem(id)}
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-expanded={isOpen}
            >
              <div>
                <span>{item.title}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 py-3 text-gray-700 dark:text-gray-300">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
