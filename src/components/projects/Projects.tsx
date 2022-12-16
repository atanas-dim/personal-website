import React, {
  FC,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";

import IPhone14 from "../devices/IPhone14";

import { ProjectData, PROJECTS } from "../../resources/projects";

import { BgIcon } from "../background/Background";
import { Section } from "../../pages";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Projects: FC<Props> = ({ scrollY, setBgIcon, setActiveSection }) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        id="projects"
        ref={target}
        onViewportEnter={() => setActiveSection(Section.Projects)}
        className="relative w-full mt-[20vh] mb-[30vh] md:mb-[60vh]"
      >
        {PROJECTS.map((project, index) => {
          return (
            <Project
              key={"container-" + index}
              index={index}
              scrollY={scrollY}
              data={project}
              setBgIcon={setBgIcon}
            />
          );
        })}
      </motion.section>
    </>
  );
};

export default Projects;

type ProjectProps = {
  index: number;
  scrollY: MotionValue<number>;
  data: ProjectData;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Project: FC<ProjectProps> = ({ index, scrollY, data, setBgIcon }) => {
  const target = useRef<HTMLDivElement>(null);
  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    // Need to set this on mount to fix blank sections
    const scroller = document.getElementById("scroll-container");

    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setFullOpacityScrollTop(
        (scroller?.scrollTop ?? 0) +
          (target.current?.getBoundingClientRect()?.top ?? 0)
      );
    };
    // Need to set this on mount to fix stuck sections
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () => {
      window.removeEventListener("resize", updateValuesFromContainerRect);
    };
  }, []);

  const scrollSpring = useSpring(scrollY, {
    damping: 1000,
    mass: 80,
    stiffness: 1000,
  });

  const scale = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop - containerHeight / 4,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 4,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0.7, 1, 1, 1, 1.1]
  );

  const translateY = useTransform(
    scrollSpring,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight,
      fullOpacityScrollTop - containerHeight / 4,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 4,
      fullOpacityScrollTop + containerHeight,
    ],
    // Into these values:
    ["32px", "16px", "0px", "-16px", "-32px"]
  );

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop - containerHeight / 3,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 3,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0, 0.8, 1, 0.8, 0]
  );

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      onViewportEnter={() => {
        setBgIcon(data.bgIcon);
      }}
      className="w-full h-screen min-h-[600px] flex flex-col justify-center items-center p-4 md:p-8 pointer-events-none"
    >
      <motion.div
        style={{
          translateY,
          opacity,
          scale,
        }}
        className="origin-center h-full w-full flex justify-center items-center -z-10 opacity-0"
      >
        <IPhone14 imageSrc={data.imageSrc} />
      </motion.div>
      {/* TODO Here add description and links. Alternating layout */}
    </motion.div>
  );
};
