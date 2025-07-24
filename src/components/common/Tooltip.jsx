import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({
  description,
  position = "top",
  children,
  classNames = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltipEl = tooltipRef.current;
      const triggerEl = triggerRef.current;
      const { width: tooltipWidth, height: tooltipHeight } =
        tooltipEl.getBoundingClientRect();
      const { top, left, width, height } = triggerEl.getBoundingClientRect();

      let topPos, leftPos;

      switch (position) {
        case "top":
          topPos = top - tooltipHeight - 8;
          leftPos = left + width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          topPos = top + height + 8;
          leftPos = left + width / 2 - tooltipWidth / 2;
          break;
        case "left":
          topPos = top + height / 2 - tooltipHeight / 2;
          leftPos = left - tooltipWidth - 8;
          break;
        case "right":
          topPos = top + height / 2 - tooltipHeight / 2;
          leftPos = left + width + 8;
          break;
        default:
          topPos = top - tooltipHeight - 8;
          leftPos = left + width / 2 - tooltipWidth / 2;
      }

      // Prevent tooltip from going off-screen
      if (leftPos < 8) leftPos = 8;
      if (leftPos + tooltipWidth > window.innerWidth)
        leftPos = window.innerWidth - tooltipWidth - 8;
      if (topPos < 8) topPos = 8;
      if (topPos + tooltipHeight > window.innerHeight)
        topPos = window.innerHeight - tooltipHeight - 8;

      setTooltipPosition({ top: topPos, left: leftPos });
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={triggerRef}
        className="relative flex items-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible &&
        description &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`absolute z-50 min-w-[200px] max-w-[300px] px-2 py-1 text-xs bg-gray-900 text-white shadow-lg rounded-md ${classNames}`}
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
          >
            <div
              className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
              style={{
                ...(position === "top" && {
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                }),
                ...(position === "bottom" && {
                  top: "-4px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                }),
                ...(position === "left" && {
                  right: "-4px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                }),
                ...(position === "right" && {
                  left: "-4px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                }),
              }}
            />
            {description}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
