import { useEffect, useRef, useState } from "react";

const Watermark = ({ content, containerRef }) => {
  const { heading, subheading } = content;
  const watermarkRef = useRef(null);

  const [position, setPosition] = useState({ top: 100, left: 100 });

  useEffect(() => {
    const moveRandomly = () => {
      const watermark = watermarkRef.current;
      const container = containerRef.current;
      if (!watermark || !container) return;

      const { offsetWidth: wmWidth, offsetHeight: wmHeight } = watermark;
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        container;

      const maxLeft = containerWidth - wmWidth;
      const maxTop = containerHeight - wmHeight;

      const newLeft = Math.floor(Math.random() * maxLeft);
      const newTop = Math.floor(Math.random() * maxTop);

      setPosition({ top: newTop, left: newLeft });
    };

    moveRandomly(); // Initial position
    const interval = setInterval(moveRandomly, 3000); // Move every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={watermarkRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        pointerEvents: "none",
        opacity: 0.3,
        fontSize: "20px",
        fontWeight: "bold",
        zIndex: 9999,
        color: "#000",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      <div>{heading}</div>
      <div style={{ fontSize: "16px" }}>{subheading}</div>
    </div>
  );
};

export default Watermark;
