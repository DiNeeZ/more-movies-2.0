import { TbMovieOff } from "react-icons/tb";

import "./error-indicator.scss";

interface ErrorIndicatorProps {
  errorMsg?: string;
}

const ErrorIndicator = ({
  errorMsg = "Very sad error",
}: ErrorIndicatorProps) => {
  return (
    <section className="error">
      <div className="container error__container">
        <h3 className="error__title">Something wrong was happened :-(</h3>
        <TbMovieOff className="error__icon" />
        <p className="error__message">{errorMsg}</p>
      </div>
    </section>
  );
};

export default ErrorIndicator;
