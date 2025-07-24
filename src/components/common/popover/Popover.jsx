import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import useOutsideClick from "../../../hooks/useOutside";

const Popover = ({ displayComponent, children, position = "left" }) => {
  const [show, setShow] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const portalRef = useRef(document.createElement("div"));
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    const elem = document.body.appendChild(portalRef.current);
    return () => document.body.removeChild(elem);
  }, []);

  useOutsideClick(containerRef, () => setShow(false));

  useEffect(() => {
    if (!show || !measureRef.current) return;

    const targetRect = targetRef.current?.getBoundingClientRect();
    const measureRect = measureRef.current.getBoundingClientRect();

    if (!targetRect) return;

    const positions = {
      left: {
        left: targetRect.left - measureRect.width,
        top: targetRect.bottom + 4,
      },
      right: {
        left: targetRect.left + targetRect.width,
        top: targetRect.bottom + 4,
      },
      bottom: {
        left: targetRect.left + targetRect.width - measureRect.width - 4,
        top: targetRect.bottom + 4,
      },
      top: {
        left: targetRect.left + targetRect.width - measureRect.width,
        top: targetRect.top - measureRect.height + targetRect.height - 4,
      },
    };

    let newStyle = positions[position] || positions.left;
    if (targetRect.bottom + measureRect.height > window.innerHeight) {
      newStyle.top = targetRect.top - measureRect.height - 4;
    }

    setDropdownStyle({ ...newStyle, position: "fixed", zIndex: 1000 });
  }, [show, position]);

  return (
    <div className="w-fit" ref={containerRef}>
      <div className="absolute -z-50 opacity-0" ref={measureRef}>
        {children}
      </div>

      <div
        ref={targetRef}
        className="cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        {displayComponent}
      </div>

      {show &&
        createPortal(
          <div
            style={dropdownStyle}
            className={twMerge(
              "border shadow-lg p-1 rounded-md bg-white transition-all ease-linear duration-300 scrollbar",
              show ? "opacity-100 translate-y-1" : "-translate-y-2 opacity-50"
            )}
          >
            {children}
          </div>,
          portalRef.current
        )}
    </div>
  );
};

export default Popover;
