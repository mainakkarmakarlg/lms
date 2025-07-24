import { useEffect, useState } from "react";

export const useResponsive = () => {
  const [width, setWidth] = useState(0);

  const handleWindowSizeChange = () => {
    setWidth(window?.innerWidth);
  };

  useEffect(() => {
    setWidth(window?.innerWidth);
    window?.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 767;
  const isTablet = width <= 1023;
  const customSmallScreen = width < 1366;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop, customSmallScreen };
};
