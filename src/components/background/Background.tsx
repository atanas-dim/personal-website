import React, { FC, useState, useEffect } from "react";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";

import { useFlubber, getIndex } from "../../hooks/useFlubber";

const ARM_FLEX =
  "M11 7C8 11.09 7 22.34 7 22.34C9.9 24.31 13.08 25 15.87 25C18.86 25 21.39 24.21 22.64 23.36C25.64 21.32 25.94 16.71 22.64 15.18C22 14.89 21.26 14.75 20.47 14.75C18.17 14.75 15.5 15.96 14 18.25H13V11.09H15L16 8L11 7Z";
const SHOPPING_BAG =
  "M23 10H21C21 7.2 18.8 5 16 5C13.2 5 11 7.2 11 10H9C7.9 10 7 10.9 7 12V24C7 25.1 7.9 26 9 26H23C24.1 26 25 25.1 25 24V12C25 10.9 24.1 10 23 10Z";
const COMMENT =
  "M16 7C10.5 7 6 10.58 6 15C6.05 17.15 7.06 19.17 8.75 20.5C8.75 21.1 8.33 22.67 6 25C8.37 24.89 10.64 24 12.47 22.5C13.61 22.83 14.81 23 16 23C21.5 23 26 19.42 26 15C26 10.58 21.5 7 16 7Z";
const STACK =
  "M14.8729 1L23.9939 10.9973C24.7144 11.787 24.6865 13.0036 23.9306 13.7595L16.2871 21.403C15.5061 22.184 14.2397 22.184 13.4587 21.403L7.41421 15.3585C6.63317 14.5775 6.63317 13.3111 7.41421 12.5301L13.3924 6.55191C14.1989 5.74544 15.5154 5.77559 16.2841 6.61814L23.9939 15.0687C24.7144 15.8584 24.6865 17.075 23.9306 17.8309L16.2871 25.4744C15.5061 26.2554 14.2397 26.2554 13.4587 25.4744L7.41421 19.4299C6.63317 18.6489 6.63317 17.3825 7.41421 16.6015L13.3957 10.62C14.2009 9.81476 15.515 9.84338 16.2844 10.6829L23.991 19.0919C24.7131 19.8798 24.6882 21.0963 23.9343 21.8539L16.2871 29.5388C15.5066 30.3231 14.2376 30.3247 13.4552 29.5423L7.41421 23.5013C6.63317 22.7202 6.63317 21.4539 7.41421 20.6729L14.8729 13.2142";
const LAPTOP =
  "M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20V10C26 8.89 25.1 8 24 8H8C6.89 8 6 8.89 6 10V20C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22H4V24H28V22H24Z";

export enum BgIcon {
  ArmFlex,
  ShoppingBag,
  Comment,
  Stack,
  Laptop,
}

const ICONS: { [key in BgIcon]: { path: string; colour: string } } = {
  [BgIcon.ArmFlex]: { path: ARM_FLEX, colour: "#093d58" },
  [BgIcon.ShoppingBag]: { path: SHOPPING_BAG, colour: "#004240" },
  [BgIcon.Comment]: { path: COMMENT, colour: "#063d51" },
  [BgIcon.Stack]: {
    path: STACK,
    colour: "#432335",
  },
  [BgIcon.Laptop]: { path: LAPTOP, colour: "#224a56" },
};

type Props = {
  pathIndex: BgIcon;
  scrollY: MotionValue;
};
const Background: FC<Props> = ({ pathIndex, scrollY }) => {
  const progress = useMotionValue(pathIndex);
  const stroke = useTransform(
    progress,
    Object.keys(ICONS).map(getIndex),
    Object.keys(ICONS).map((key) => ICONS[+key as BgIcon].colour)
  );
  const fill = useTransform(
    progress,
    Object.keys(ICONS).map(getIndex),
    Object.keys(ICONS).map((key) => ICONS[+key as BgIcon].colour + "40")
  );
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
        className="w-screen h-screen bg-zinc-900 fixed -z-10 -top-0 left-0"
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
                style={{ border: "1px solid red" }}
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
