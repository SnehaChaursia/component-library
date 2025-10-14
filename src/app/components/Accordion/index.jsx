import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/utils"; // optional helper for merging classes
import PropTypes from 'prop-types';

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
  id,
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

  // Handle keyboard events for accordion items
  const handleKeyDown = (event, id) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        toggleItem(id);
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Focus next item
        const currentIndex = items.findIndex((item, idx) => (item.id ?? idx) === id);
        const nextIndex = (currentIndex + 1) % items.length;
        const nextId = items[nextIndex].id ?? nextIndex;
        document.getElementById(`accordion-header-${nextId}`)?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Focus previous item
        const currentIdx = items.findIndex((item, idx) => (item.id ?? idx) === id);
        const prevIndex = (currentIdx - 1 + items.length) % items.length;
        const prevId = items[prevIndex].id ?? prevIndex;
        document.getElementById(`accordion-header-${prevId}`)?.focus();
        break;
      case 'Home':
        event.preventDefault();
        // Focus first item
        const firstId = items[0].id ?? 0;
        document.getElementById(`accordion-header-${firstId}`)?.focus();
        break;
      case 'End':
        event.preventDefault();
        // Focus last item
        const lastId = items[items.length - 1].id ?? items.length - 1;
        document.getElementById(`accordion-header-${lastId}`)?.focus();
        break;
      default:
        break;
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
    <div 
      className="w-full max-w-2xl mx-auto"
      id={id}
      role="region"
      aria-label={headingTitle || "Accordion"}
    >
      {headingTitle && (
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {headingTitle}
        </h2>
      )}
      {items.map((item, idx) => {
        const itemId = item.id ?? idx;
        const isOpen = alwaysOpen || openItems.includes(itemId);
        const headerId = `accordion-header-${itemId}`;
        const panelId = `accordion-panel-${itemId}`;

        return (
          <div 
            key={itemId} 
            className={`mb-2 ${getVariantClasses()}`}
          >
            <h3>
              <button
                id={headerId}
                onClick={() => toggleItem(itemId)}
                onKeyDown={(e) => handleKeyDown(e, itemId)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg"
                aria-expanded={isOpen}
                aria-controls={panelId}
                type="button"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
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

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })).isRequired,
  allowMultiple: PropTypes.bool,
  alwaysOpen: PropTypes.bool,
  defaultOpen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  variant: PropTypes.oneOf(['bordered', 'shadow', 'minimal']),
  headingTitle: PropTypes.string,
  id: PropTypes.string,
};

Accordion.defaultProps = {
  items: [],
  allowMultiple: false,
  alwaysOpen: false,
  defaultOpen: [],
  variant: 'bordered',
  headingTitle: '',
  id: undefined,
};

export default Accordion;