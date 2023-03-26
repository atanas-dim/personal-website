import React, { FC, useState, useEffect, useRef } from "react";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";

import { useFlubber, getIndex } from "../../hooks/useFlubber";
import useStore from "../../hooks/useStore";

import { BgIcon, ICONS } from "../../resources/background";
import useScrollContainer from "../../hooks/useScrollContainer";

const Background: FC = () => {
  const { isDarkMode, bgIcon: pathIndex } = useStore();
  const { scrollerRef } = useScrollContainer();
  const progress = useMotionValue(pathIndex);

  const iconIndexes = Object.keys(ICONS).map(getIndex);
  const iconColours = Object.keys(ICONS).map(
    (key) => ICONS[+key as BgIcon].colour[isDarkMode ? "darkMode" : "lightMode"]
  );
  const iconsStrokeColourArray = Object.keys(ICONS).map(
    (key) =>
      ICONS[+key as BgIcon].colour[isDarkMode ? "darkMode" : "lightMode"] + "40"
  );

  const stroke = useTransform(progress, iconIndexes, iconColours);
  const fill = useTransform(progress, iconIndexes, iconsStrokeColourArray);

  const path = useFlubber(
    progress,
    Object.keys(ICONS).map((key) => ICONS[+key as BgIcon].path)
  );

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.6,
      ease: "easeInOut",
    });
    return () => animation.stop();
  }, [pathIndex, progress]);

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setSvgWidth(window.innerWidth);
      setSvgHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { scrollY } = useScroll({
    container: scrollerRef,
  });

  const scrollSpring = useSpring(scrollY, {
    damping: 20,
    mass: 2,
    stiffness: 100,
    bounce: 0.0015,
  });

  const pageHeight =
    typeof window !== "undefined"
      ? document?.getElementsByTagName("main")?.[0]?.getBoundingClientRect()
          ?.height
      : 0;

  const translateY = useTransform(
    scrollSpring,
    // Map from these values:
    [0, pageHeight / 2, pageHeight],
    // Into these values:
    ["48px", "0px", "-48px"]
  );

  if (!svgWidth || !svgHeight) return null;

  return (
    <>
      <motion.div
        className="w-screen h-screen fixed -z-10 -top-0 left-0 colour-transition"
        role="presentation"
        style={{ translateY, scale: 1.15 }}
      >
        <svg
          width={"100vw"}
          height={"100vh"}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          <g>
            <defs>
              <pattern
                id="transform-pattern"
                viewBox="0,0,80,80"
                width={(8 / svgWidth) * 10}
                height={(8 / svgHeight) * 10}
              >
                <motion.path
                  stroke={stroke}
                  fill={fill}
                  d={path}
                  strokeLinecap="round"
                  strokeWidth="1"
                />
                <motion.path
                  stroke={stroke}
                  fill={fill}
                  d={path}
                  strokeLinecap="round"
                  strokeWidth="1"
                  transform="translate(40 40)"
                  style={{ opacity: 0.5 }}
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#transform-pattern)" />
          </g>
        </svg>
      </motion.div>
    </>
  );
};

export default Background;
