const Container = ({ className = "", children }) => {
  return (
    <div
      className={`h-full w-[98%] px-1 py-4 md:p-[20px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
