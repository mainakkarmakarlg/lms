import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const directionMap = {
  top: "-translate-y-16",
  bottom: "translate-y-16",
  left: "-translate-x-16",
  right: "translate-x-16",
};

const PopupWrapper = ({
  children,
  onClose,
  direction = "bottom",
  contentWidth,
}) => {
  const popupRef = useRef(null);
  const [show, setShow] = useState(false);
  const hiddenClass = directionMap[direction] || "translate-y-16";

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 500); // match transition duration
  };

  useEffect(() => {
    if (!show) return;

    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [show]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center  duration-300 ${
        show ? "bg-black bg-opacity-40 opacity-100" : "opacity-0 "
      }`}
    >
      <div
        ref={popupRef}
        className={`bg-white rounded-2xl p-6 shadow-xl ${contentWidth ? contentWidth : "max-w-lg"} w-full transform transition-all duration-500 ease-out
        ${show ? "translate-y-0 opacity-100" : `${hiddenClass} opacity-0`}`}
      >
        {React.cloneElement(children, { onRequestClose: handleClose })}
      </div>
    </div>,
    document.body
  );
};

export default PopupWrapper;
