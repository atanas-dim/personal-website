import { useLayoutEffect, useRef } from "react";

const useScrollContainer = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const scroller = document.getElementById(
      "scroll-container"
    ) as HTMLDivElement;
    if (!scroller) return;
    scrollerRef.current = scroller;
  }, []);

  return { scrollerRef };
};

export default useScrollContainer;
