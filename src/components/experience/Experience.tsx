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
  Section,
  SECTION_CONTENT,
  SECTION_LABEL,
  SECTION_LABEL_WRAPPER,
} from "../../pages";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Experience: FC<Props> = ({ scrollY, setBgIcon, setActiveSection }) => {
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
    damping: 340,
    mass: 40,
    stiffness: 1000,
  });

  const opacity = useTransform(
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
    ["16px", "10px", "0px", "-10px", "-16px"]
  );

  return (
    <motion.section
      id="experience"
      ref={target}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        setBgIcon(BgIcon.Laptop);
        setActiveSection(Section.Experience);
      }}
      className={
        SECTION +
        " w-full pointer-events-none flex justify-center items-center h-[calc(100vh_-_138px)] min-h-fit"
      }
    >
      <div className={SECTION_LABEL_WRAPPER}>
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
        >
          2021 - Present
        </motion.span>
        <motion.span
          className="mb-3 text-3xl md:text-4xl font-bold text-pink-400 whitespace-nowrap"
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
      </div>
    </motion.section>
  );
};

export default Experience;
