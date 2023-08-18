import { ReactNode } from "react";

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
        <div className="container">{children}</div>
      </section>
    );

  return (
    <section>
      <div className="container">{children}</div>
    </section>
  );
};

export default Section;
