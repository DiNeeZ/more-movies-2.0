import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

import "./modal.scss";

interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

interface ModalProps {
  children: ReactNode;
  handleClose: () => void;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
};

const ReactPortal = ({ children, wrapperId }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systenCreated = false;

    if (!element) {
      systenCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systenCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

const Modal = ({ children, handleClose }: ModalProps) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: globalThis.KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    const closeOnModalBgClick = (e: globalThis.MouseEvent) => {
      if ((e.target as Element).classList?.contains("modal-close")) {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    document.body.addEventListener("click", closeOnModalBgClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscapeKey);
      document.removeEventListener("click", closeOnModalBgClick);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="root-modal">
      <div className="modal modal-close" ref={nodeRef}>
        <div className="modal__content">
          <button className="modal__close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;