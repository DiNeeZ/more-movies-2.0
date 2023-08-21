import { Children, ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoreLessBtn } from "../UI";

import "./collapsible.grid.scss";

interface CollapsibleGridProps {
  children: ReactNode;
}

const CollapsibleGrid = ({ children }: CollapsibleGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (!myRef.current) return;
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCollapseGrid = () => {
    if (isOpen) executeScroll();
    setIsOpen(!isOpen);
  };

  const items = Children.map(children, (child, i) => (
    <AnimatePresence>
      <motion.li
        initial={i >= 5 && { x: -20, opacity: 0 }}
        animate={i >= 5 && { x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: isOpen ? (i - 4) * 0.05 : 0 }}
      >
        {child}
      </motion.li>
    </AnimatePresence>
  ));

  return (
    <ul className="collapsible-grid">
      {isOpen ? items : items?.slice(0, 5)}
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
