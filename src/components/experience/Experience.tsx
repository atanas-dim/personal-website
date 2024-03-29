import React, { FC, useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BgIcon } from "../../resources/background";
import {
  SECTION,
  SECTION_CONTENT,
  SECTION_LABEL,
  SECTION_LABEL_WRAPPER,
} from "../../pages";
import useStore from "../../hooks/useStore";
import useScrollContainer from "../../hooks/useScrollContainer";
import { Section } from "../../resources/sections";

type Job = {
  period: string;
  title: string;
  titleColour: string;
  company: string;
};

const JOBS: Job[] = [
  {
    period: "2021 - present",
    title: "Software Developer",
    titleColour: "text-pink-500 dark:text-pink-400",
    company: "@Loopspeed",
  },
  {
    period: "2021 - 2022",
    title: "Software Developer",
    titleColour: "text-yellow-500 dark:text-yellow-400",
    company: "@Wingcard.io",
  },
];

const Experience: FC = () => {
  const target = useRef<HTMLDivElement>(null);
  const { setBgIcon, setActiveSection } = useStore();
  const { scrollerRef } = useScrollContainer();

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

  const { scrollY } = useScroll({
    container: scrollerRef,
  });

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
          " w-full h-screen min-h-[600px] pointer-events-none flex justify-center items-center mb-4 pt-16"
        }
      >
        <div className={SECTION_LABEL_WRAPPER + " md:mb-[28vh]"}>
          <span className={SECTION_LABEL}>Experience</span>
        </div>
        <div
          className={
            SECTION_CONTENT + " grow flex justify-center flex-col px-6 md:px-0"
          }
        >
          {JOBS.map((job, index) => {
            return (
              <motion.div
                key={"job-" + index}
                style={{
                  opacity,
                  translateY,
                }}
                onViewportEnter={() => {
                  if (index !== 0) return;
                  setBgIcon(BgIcon.Laptop);
                  setActiveSection(Section.Experience);
                }}
                className="w-fit flex flex-col py-4 px-6 md:py-6 md:px-8 mb-8 bg-white dark:bg-zinc-900 border border-solid border-zinc-200 rounded-2xl dark:border-zinc-800 colour-transition"
              >
                <span className="mb-1 md:mb-3 text-md md:text-lg whitespace-nowrap">
                  {job.period}
                </span>
                <span
                  className={`mb-1 md:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold ${job.titleColour} whitespace-nowrap`}
                >
                  {job.title}
                </span>
                <span className="text-xl md:text-2xl font-bold whitespace-nowrap">
                  {job.company}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Experience;
