import { Children, ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useMeasure from "react-use-measure";
import { MoreLessBtn } from "../UI";

import "./collapsible.grid.scss";

interface CollapsibleGridProps {
  children: ReactNode;
}

const CollapsibleGrid = ({ children }: CollapsibleGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const [ref, { height }] = useMeasure();

  const containerVariants = {
    open: {
      height,
      transition: {
        staggerChildren: 0.05,
      },
    },
    closed: {
      height,
      transition: {
        duration: 3,
        staggerChildren: 0.1,
        // when: "afterChildren",
        staggerDirection: -1,
      },
    },
  };

  const childVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  // const executeScroll = () => {
  //   if (!myRef.current) return;
  //   myRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  const toggleCollapseGrid = () => {
    // if (isOpen) executeScroll();
    setIsOpen(!isOpen);
  };

  const renderClosed = () =>
    Children.map(children, (child) => <div>{child}</div>)?.slice(0, 5);

  const renderOpened = () => {
    return Children.map(children, (child) => (
      <motion.div initial={{ opacity: 0 }} variants={childVariants}>
        {child}
      </motion.div>
    ))?.slice(5);
  };

  console.log(height);

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? `open` : `closed`}
      variants={containerVariants}
    >
      <div ref={ref} className="collapsible-grid">
        {renderClosed()}
        <AnimatePresence>{isOpen && renderOpened()}</AnimatePresence>

        <div
          className={`collapsible-grid__item ${
            isOpen ? "collapsible-grid__item--opened" : ""
          }`}
        >
          <MoreLessBtn handleClick={toggleCollapseGrid} isOpen={isOpen} />
        </div>
      </div>
    </motion.div>
  );
};

export default CollapsibleGrid;
