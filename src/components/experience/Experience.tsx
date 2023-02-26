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
          " w-full h-[50vh] md:h-[calc(100vh_-_190px)] min-h-[500px] max-h-[800px] pointer-events-none flex justify-center items-center mb-4"
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
                  setBgIcon(BgIcon.Laptop);
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
