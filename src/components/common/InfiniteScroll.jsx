import { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
  fetchData,
  hasMore,
  children,
  loader = "Loading...",
  endMessage = "No more data",
  threshold = 300,
}) => {
  const observerRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  // console.log(hasMore);

  useEffect(() => {
    if (isFetching || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          fetchData().finally(() => setIsFetching(false));
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (observerRef.current && observerRef.current.observe) {
      observerRef.current.observe(
        document.getElementById("infinite-scroll-trigger")
      );
    }

    return () => observerRef.current?.disconnect();
  }, [fetchData, hasMore, isFetching, threshold]);

  return (
    <div className="w-full">
      {children}
      {hasMore ? (
        <div
          id="infinite-scroll-trigger"
          className="h-fit w-full flex justify-center items-center"
        >
          {isFetching && <div className="py-1 w-full">{loader}</div>}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">{endMessage}</div>
      )}
    </div>
  );
};

export default InfiniteScroll;
