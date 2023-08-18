import { Children, ReactNode } from "react";
import "./colorful.section.title.scss";

const ColorfulSectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="colorful-section-title">
      {Children.map(children, (child) => {
        if (!child || typeof child !== "string") return "";

        return child.split(" ").map((word, index) => {
          return (
            <>
              <span
                className={`
                  colorful-section-title__substring 
                  colorful-section-title__substring--${
                    (index + 1) % 2 === 0 ? "red" : "yellow"
                  }`}
              >
                {word}
              </span>
              {index !== word.length - 1 && " "}
            </>
          );
        });
      })}
    </h2>
  );
};

export default ColorfulSectionTitle;
