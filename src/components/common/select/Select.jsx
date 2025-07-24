// import { Children, cloneElement, useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { twMerge } from "tailwind-merge";
// import useOutsideClick from "../../../hooks/useOutside";
// import { MdArrowDropDown } from "react-icons/md";

// const Select = ({
//   children,
//   placeholder,
//   onChange,
//   value,
//   className,
//   id,
//   textClasses,
// }) => {
//   const [show, setShow] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [dropdownStyle, setDropdownStyle] = useState(null);
//   const [displayValue, setDisplayValue] = useState("");
//   const buttonRef = useRef(null);
//   const targetRef = useRef(null);
//   const portalRef = useRef(null);

//   const handleClick = () => {
//     if (buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       setDropdownStyle({
//         position: "fixed",
//         top: rect.bottom + 4,
//         left: rect.left,
//         width: rect.width,
//         zIndex: 1000,
//       });
//     }
//     setShow((prev) => !prev);
//   };

//   const closeMenu = () => setShow(false);

//   const onOptionSelect = (data) => {
//     onChange(data.value);
//     setDisplayValue(data.name);
//     closeMenu();
//   };

//   useOutsideClick(targetRef, closeMenu);

//   useEffect(() => {
//     const elem = document.createElement("div");
//     document.body.appendChild(elem);
//     portalRef.current = elem;

//     return () => {
//       if (portalRef.current) {
//         document.body.removeChild(portalRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (show) {
//       setIsVisible(true);
//     } else {
//       setTimeout(() => setIsVisible(false), 300);
//     }
//   }, [show]);

//   useEffect(() => {
//     Children.forEach(children, (child) => {
//       if (child?.props?.value === value) {
//         setDisplayValue(child?.props?.name);
//       }
//     });
//   }, [value, children]);

//   return (
//     <div
//       id={id}
//       ref={targetRef}
//       className={twMerge("w-full duration-300", className)}
//     >
//       <div className="border border-[#D5D7DA] rounded-md w-full">
//         <div
//           ref={buttonRef}
//           onClick={handleClick}
//           className="w-full flex items-center justify-between cursor-pointer"
//         >
//           <button
//             className={twMerge(
//               "w-fit text-sm outline-none border-none p-2 whitespace-nowrap truncate",
//               textClasses
//             )}
//           >
//             {displayValue ? displayValue : placeholder}
//           </button>
//           <span className="pr-1">
//             <MdArrowDropDown />
//           </span>
//         </div>
//       </div>

//       {show &&
//         portalRef.current &&
//         createPortal(
//           <div
//             style={dropdownStyle}
//             className={twMerge(
//               "border shadow-lg p-1 rounded-md w-full h-fit bg-white transition-all ease-linear duration-300",
//               isVisible
//                 ? "opacity-100 translate-y-1"
//                 : "-translate-y-2 opacity-50"
//             )}
//           >
//             <div className="h-full overflow-y-scroll">
//               {Children.map(children, (child) =>
//                 cloneElement(child, {
//                   isSelected: value === child?.props?.value,
//                   onChange: onOptionSelect,
//                   setShow,
//                 })
//               )}
//             </div>
//           </div>,
//           portalRef.current
//         )}
//     </div>
//   );
// };

// export default Select;

import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import useOutsideClick from "../../../hooks/useOutside";
import { MdArrowDropDown } from "react-icons/md";

let timeOut = null;
const Select = ({
  children,
  placeholder,
  onChange,
  value,
  className,
  id,
  textClasses,
  width = "auto",
  disabled,
}) => {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [maxWidth, setMaxWidth] = useState(null);

  const buttonRef = useRef(null);
  const targetRef = useRef(null);
  const portalRef = useRef(null);
  const measureRef = useRef(null);

  const handleClick = () => {
    if (disabled) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: width === "auto" ? "w-fit" : rect.width,
        maxHeight: "350px",
        height: "fit-content",
        overflow: "auto",
        zIndex: 1000,
      });
    }
    setShow((prev) => !prev);
  };

  const closeMenu = () => setShow(false);

  const onOptionSelect = (data) => {
    onChange(data.value);
    setDisplayValue(data.name);
    closeMenu();
  };

  useOutsideClick(targetRef, closeMenu);

  useEffect(() => {
    const elem = document.createElement("div");
    document.body.appendChild(elem);
    portalRef.current = elem;

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    clearTimeout(timeOut);
    if (show) {
      setIsVisible(true);
    } else {
      timeOut = setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  useEffect(() => {
    if (measureRef.current) {
      const childrenWidths = Array.from(measureRef.current.children).map(
        (child) => child.getBoundingClientRect().width
      );

      const maxChildWidth = Math.max(...childrenWidths);
      setMaxWidth(width === "auto" ? maxChildWidth : width);
    }
  }, [children, width]);

  useEffect(() => {
    Children.forEach(children, (child) => {
      if (child?.props?.value === value) {
        setDisplayValue(child?.props?.name);
      }
    });
  }, [value, children]);

  return (
    <div
      id={id}
      ref={targetRef}
      className={twMerge("w-full duration-300", className)}
    >
      {/* Hidden Element for Measuring Max Width */}
      <div className="absolute -z-50 opacity-0" ref={measureRef}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            "data-measure": true, // Marks elements for measuring
          })
        )}
      </div>

      <div
        className={twMerge(
          "border border-[#D5D7DA] rounded-md ",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        style={{ width: maxWidth }}
      >
        <div
          ref={buttonRef}
          onClick={handleClick}
          className="w-full flex items-center justify-between"
        >
          <button
            type="button"
            disabled={disabled}
            className={twMerge(
              "w-fit text-sm outline-none border-none p-2 whitespace-nowrap truncate disabled:cursor-not-allowed",
              textClasses
            )}
          >
            {displayValue ? displayValue : placeholder}
          </button>
          <span className="pr-1">
            <MdArrowDropDown />
          </span>
        </div>
      </div>

      {show &&
        portalRef.current &&
        createPortal(
          <div
            style={dropdownStyle}
            className={twMerge(
              "border shadow-lg p-1 rounded-md h-fit bg-white transition-all ease-linear duration-300 scrollbar",
              isVisible
                ? "opacity-100 translate-y-1"
                : "-translate-y-2 opacity-50"
            )}
          >
            <div className="h-full overflow-y-scroll">
              {Children.map(children, (child) =>
                cloneElement(child, {
                  isSelected: value === child?.props?.value,
                  onChange: onOptionSelect,
                  setShow,
                })
              )}
            </div>
          </div>,
          portalRef.current
        )}
    </div>
  );
};

export default Select;
