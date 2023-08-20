import { Children, ReactNode, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { MoreLessBtn } from "../UI";

import "./collapsible.grid.scss";

interface CollapsibleGridProps {
  children: ReactNode;
}

const CollapsibleGrid = ({ children }: CollapsibleGridProps) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [parent, enable] = useAutoAnimate();

  const executeScroll = () => {
    if (!myRef.current) return;
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCollapseGrid = () => {
    if (isOpen) executeScroll();
    enable(!isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div ref={myRef}>
      <ul ref={parent} className="collapsible-grid">
        {Children.map(children, (child, index) => {
          if (!isOpen) {
            return index <= 4 ? <li>{child}</li> : null;
          }

          return <li>{child}</li>;
        })}
        <li
          className={`collapsible-grid__item ${
            isOpen ? "collapsible-grid__item--opened" : ""
          }`}
        >
          <MoreLessBtn handleClick={toggleCollapseGrid} isOpen={isOpen} />
        </li>
      </ul>
    </div>
  );
};

export default CollapsibleGrid;
