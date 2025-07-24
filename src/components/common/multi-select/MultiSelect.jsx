import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import useOutsideClick from "../../../hooks/useOutside";
import { MdArrowDropDown } from "react-icons/md";
import { useResponsive } from "../../../hooks/useResponsive";
import Button from "../Button";

let timeOut = null;

const MultiSelect = ({
  id,
  children,
  placeholder,
  onChange,
  values,
  className,
  textClasses = "text-sm",
}) => {
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const [currentElem, setCurrentElem] = useState(null);
  const [triangleLeft, setTriangleLeft] = useState("50%");

  const buttonRef = useRef(null);
  const targetRef = useRef(null);

  const { isMobile } = useResponsive();

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: isMobile ? 0 : rect.left,
        width: isMobile ? "95%" : rect.width,
        marginLeft: isMobile ? "2.5%" : "0px",
        marginRight: isMobile ? "2.5%" : "0px",
        zIndex: 1000,
      });

      // Calculate triangle left position
      setTriangleLeft(
        isMobile ? `${rect.left + (rect.width / 2 - 20)}px` : "50%"
      );
    }
    setShow((prev) => !prev);
  };

  const closeMenu = () => {
    setShow(false);
  };

  const onOptionSelect = (data) => {
    const exists = values?.find((item) => item?.value === data?.value);
    if (exists) {
      const filteredValues = values?.filter(
        (item) => item?.value !== data?.value
      );
      onChange(filteredValues);
    } else {
      onChange([...values, data]);
    }
  };

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  useOutsideClick(targetRef, closeMenu);

  useEffect(() => {
    const elem = document.createElement("div");
    elem.style.visibility = "none";
    const existingElem = document.getElementById(id);
    if (existingElem) {
      existingElem.appendChild(elem);
    }
    setCurrentElem(elem);
    return () => {
      if (existingElem) {
        existingElem.removeChild(elem);
      }
    };
  }, [id]);

  useEffect(() => {
    clearTimeout(timeOut);
    if (show) {
      setIsVisible(true); // Ensure dropdown is in DOM before fading in
    } else {
      setIsVisible(false);
    }
  }, [show]);

  return (
    <div
      id={id}
      ref={targetRef}
      className={twMerge("w-full duration-300", className)}
    >
      <div className={twMerge("border border-[#D5D7DA] rounded-md w-full")}>
        <div
          ref={buttonRef}
          onClick={handleClick}
          className="w-full flex items-center justify-center cursor-pointer"
        >
          <button
            className={twMerge(
              "w-fit text-sm outline-none border-none p-2 whitespace-nowrap",
              textClasses
            )}
          >
            {placeholder}
          </button>
          {values?.length > 0 && (
            <div className="rounded-full bg-primary w-4 h-4 font-bold text-xs flex items-center justify-center text-white">
              {values?.length}
            </div>
          )}
          <span>
            <MdArrowDropDown />
          </span>
        </div>
      </div>

      {show &&
        currentElem &&
        createPortal(
          <>
            <div
              style={dropdownStyle}
              className={twMerge(
                "relative border shadow-lg p-1 rounded-md w-full h-[400px] bg-white transition-all ease-linear duration-300",
                isVisible
                  ? "opacity-100 translate-y-1"
                  : "-translate-y-2 opacity-50"
              )}
            >
              {/* Triangle Indicator */}
              <div
                className="absolute h-0 w-0"
                style={{
                  left: triangleLeft,
                  transform: "translateX(-50%)",
                  top: "-10px",
                }}
              >
                {/* Triangle Border */}
                <div className="absolute border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-300 top-[-1px] left-0"></div>

                {/* Triangle Fill */}
                <div className="absolute border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
              </div>

              {/* Search Input */}
              <div className="w-full h-[40px]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-sm text-gray-500 border rounded-md p-2"
                  value={searchText}
                  onChange={onChangeSearchText}
                />
              </div>

              {/* Options List */}
              <div className="h-[calc(100%-50px)] flex flex-col">
                <div className="w-full h-[calc(100%-40px)] overflow-y-scroll">
                  {Children.map(children, (child) => {
                    const isValid = child?.props?.name
                      ?.toLowerCase()
                      ?.includes(searchText?.toLowerCase());
                    return (
                      isValid &&
                      cloneElement(child, {
                        isSelected: values?.some(
                          (item) => item?.value === child?.props?.value
                        ),
                        onChange: onOptionSelect,
                        setShow,
                      })
                    );
                  })}
                </div>
                <div className="h-[50px] flex items-center justify-between w-full px-1 border-t mt-3">
                  <Button color="neutral" size="small">
                    Reset
                  </Button>
                  <Button color="primary" size="small">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </>,
          currentElem
        )}
    </div>
  );
};

export default MultiSelect;
