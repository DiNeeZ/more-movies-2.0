import { Children, ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoreLessBtn } from "../UI";

import "./collapsible.grid.scss";

interface CollapsibleGridProps {
  children: ReactNode;
}

const CollapsibleGrid = ({ children }: CollapsibleGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const INITIAL_ITEMS_QTY = 5;

  const executeScroll = () => {
    if (!listRef.current) return;
    listRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCollapseGrid = () => {
    if (isOpen) executeScroll();
    setIsOpen(!isOpen);
  };

  const items = Children.map(children, (child, i) => (
    <AnimatePresence>
      <motion.li
        initial={i >= INITIAL_ITEMS_QTY && { x: -20, opacity: 0 }}
        animate={i >= INITIAL_ITEMS_QTY && { x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: isOpen ? (i + 1 - INITIAL_ITEMS_QTY) * 0.05 : 0,
        }}
      >
        {child}
      </motion.li>
    </AnimatePresence>
  ));

  return (
    <ul ref={listRef} className="collapsible-grid">
      {isOpen ? items : items?.slice(0, INITIAL_ITEMS_QTY)}
      <li
        className={`collapsible-grid__item ${
          isOpen ? "collapsible-grid__item--opened" : ""
        }`}
      >
        <MoreLessBtn handleClick={toggleCollapseGrid} isOpen={isOpen} />
      </li>
    </ul>
  );
};

export default CollapsibleGrid;
