import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Icon from "../Icon";
import { useEffect, useState } from "react";

const Modal = ({
  children,
  open,
  handleClose,
  width,
  height,
  className,
  showCloseButton,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timeoutId1, timeoutId2;

    if (open) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10); // slight delay to trigger animation
    } else {
      setIsVisible(false); // triggers CSS animation
      timeoutId1 = setTimeout(() => {
        setIsMounted(false); // wait for animation to finish before unmount
      }, 300); // match your transition duration
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [open]);

  return createPortal(
    <>
      {isMounted && (
        <div
          className={twMerge(
            "h-[100vh] w-[100vw] fixed top-0 left-0 bottom-0 right-0 z-[999] duration-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className=" h-full w-full flex items-center justify-center">
            <div
              className={twMerge(
                "h-fit relative min-h-[200px] bg-white z-[950] shadow-md rounded-md p-5 duration-300",
                width === "auto" && "w-fit min-width-[200px]",
                height === "auto" && "h-fit min-height-[200px]",
                isVisible
                  ? "opacity-100 flex items-center justify-center translate-y-0"
                  : "opacity-0 translate-y-full",
                className
              )}
            >
              {showCloseButton && (
                <Icon
                  onClick={handleClose}
                  hoverClass={"hover:bg-gray-200"}
                  className="absolute top-2 right-2 z-[900]"
                >
                  <MdClose />
                </Icon>
              )}

              <div
                className={(showCloseButton ? "mt-5" : "mt-0", "w-fit h-fit")}
              >
                {children}
              </div>
            </div>
            <div
              onClick={handleClose}
              className="w-full h-full bg-black/50 z-[900] absolute top-0 left-0"
            ></div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
