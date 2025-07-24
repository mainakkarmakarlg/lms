import { useEffect, useRef, useState } from "react";

const TimeFilter = ({ statsTimeLine, setStatsTimeLine }) => {
  const options = ["Today", "Yesterday", "7D", "30D"];
  const [sliderStyle, setSliderStyle] = useState({
    width: 0,
    transform: "translateX(0px)",
  });
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  useEffect(() => {
    if (containerRef.current && btnRefs.current.length > 0) {
      const index = options.indexOf(statsTimeLine);
      if (btnRefs.current[index]) {
        const btn = btnRefs.current[index];

        // Use transform instead of left
        setSliderStyle({
          width: btn.offsetWidth,
          transform: `translateX(${btn.offsetLeft}px)`,
        });
      }
    }
  }, [statsTimeLine]);

  return (
    <div
      ref={containerRef}
      className="relative w-fit flex border rounded-md bg-gray-100"
    >
      {/* Sliding Background */}
      <span
        className="absolute top-0 h-full bg-primary transition-transform duration-300"
        style={{
          width: sliderStyle.width,
          transform: sliderStyle.transform, // Apply transform instead of left
        }}
      />

      {options.map((option, index) => (
        <button
          key={option}
          ref={(el) => (btnRefs.current[index] = el)}
          className={`relative ${index !== options.length - 1 && "border-r border-gray-200"} outline-none h-full py-2 px-4 text-sm font-medium z-10 
            ${statsTimeLine === option ? "text-white" : "text-primary"} 
            transition-all duration-300`}
          onClick={() => setStatsTimeLine(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
