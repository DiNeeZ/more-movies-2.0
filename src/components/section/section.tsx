import { ReactNode } from "react";
import "./section.scss";

const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  if (className)
    return (
      <section className={className}>
        <div className="container section__container">{children}</div>
      </section>
    );

  return (
    <section className="section">
      <div className="container section__container">{children}</div>
    </section>
  );
};

export default Section;
