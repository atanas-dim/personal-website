import React, {
  FC,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { BgIcon } from "../background/Background";
import {
  SECTION,
  SECTION_CONTENT,
  SECTION_LABEL,
  SECTION_LABEL_WRAPPER,
} from "../../pages";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Experience: FC<Props> = ({ scrollY, setBgIcon }) => {
  const target = useRef<HTMLDivElement>(null);

  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setFullOpacityScrollTop(target.current?.offsetTop ?? 0);
    };
    // Need to set this on mount to fix stuck sections
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () => {
      window.removeEventListener("resize", updateValuesFromContainerRect);
    };
  }, []);

  const scrollSpring = useSpring(scrollY, {
    damping: 10,
  });

  const opacity = useTransform(
    scrollSpring,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight * 1.5,
      fullOpacityScrollTop - containerHeight / 4,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 4,
      fullOpacityScrollTop + containerHeight * 1.5,
    ],
    // Into these values:
    [0, 1, 1, 1, 0]
  );

  const translateY = useTransform(
    scrollSpring,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 2,
      fullOpacityScrollTop + containerHeight,
    ],
    // Into these values:
    ["32px", "24px", "0px", "-24px", "-32px"]
  );

  return (
    <>
      <section
        id="experience"
        ref={target}
        className={
          SECTION +
          " w-full h-[calc(100vh_-_190px)] pointer-events-none flex justify-center items-center min-h-fit mb-4"
        }
      >
        <div className={SECTION_LABEL_WRAPPER + " mb-[38vh]"}>
          <span className={SECTION_LABEL}>Experience</span>
        </div>
        <div
          className={
            SECTION_CONTENT + " grow flex justify-center flex-col px-8 md:px-0"
          }
        >
          <motion.span
            className="mb-3 text-md md:text-lg whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
            onViewportEnter={() => {
              setBgIcon(BgIcon.Laptop);
            }}
          >
            2021 - Present
          </motion.span>
          <motion.span
            className="mb-3 text-3xl md:text-4xl font-bold text-pink-500 dark:text-pink-400 whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
          >
            Software Developer
          </motion.span>
          <motion.span
            className="mb-3 text-xl md:text-2xl font-bold whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
          >
            @ Loopspeed
          </motion.span>
          <motion.span
            className="mt-16 mb-3 text-md md:text-lg whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
          >
            2021 - 2022
          </motion.span>
          <motion.span
            className="mb-3 text-3xl md:text-4xl font-bold text-yellow-500 dark:text-yellow-400 whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
          >
            Software Developer
          </motion.span>
          <motion.span
            className="mb-3 text-xl md:text-2xl font-bold whitespace-nowrap"
            style={{
              opacity,
              translateY,
            }}
          >
            @ Wingcard.io
          </motion.span>
        </div>

        {/* Needed to make the last sticky label move up when the footer appears*/}
      </section>
      {/* <div
        role="presentation"
        className={
          SECTION_LABEL_WRAPPER +
          " w-10 h-10 border border-solid border-red-500"
        }
      /> */}
    </>
  );
};

export default Experience;
