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
import { Section } from "../../pages";

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
    // Need to set this on mount to fix blank sections
    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);

      setFullOpacityScrollTop(target.current?.offsetTop ?? 0);
    };
    updateValuesFromContainerRect();
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
      className="h-screen w-full pointer-events-none flex justify-center items-center"
    >
      <div className="fixed top-0 left-1/2 translate-x-[-50%] h-full w-fit pt-16 flex justify-center items-center flex-col">
        <motion.span
          className="mb-3 text-sm md:text-md whitespace-nowrap"
          style={{
            opacity,
            translateY,
          }}
        >
          2021 - Present
        </motion.span>
        <motion.span
          className="mb-3 text-2xl md:text-4xl font-bold text-pink-400 whitespace-nowrap"
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
