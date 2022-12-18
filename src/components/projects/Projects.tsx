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
        className="relative w-full mt-[20vh] mb-[30vh] md:mb-[60vh] pt-12"
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

  const isEven = index % 2 === 0;

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
      fullOpacityScrollTop - containerHeight / 1.5,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 3,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0.7, 1, 1, 1, 0.7]
  );

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight / 1.5,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 3,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0, 0.8, 1, 0.8, 0]
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

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      onViewportEnter={() => {
        setBgIcon(data.bgIcon);
      }}
      className={`w-full h-screen min-h-[600px] flex flex-col ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } justify-center items-center p-8 md:p-16 pointer-events-none`}
    >
      <motion.div
        style={{
          translateY,
          opacity,
          scale,
        }}
        className={`max-w-sm mb-8 md:mb-0 md:mr-16 ${
          isEven ? "md:mr-0" : "md:mr-16"
        } origin-center flex justify-center items-center opacity-0`}
      >
        <IPhone14 imageSrc={data.imageSrc} />
      </motion.div>
      <motion.div
        style={{
          translateY,
          opacity,
          scale,
        }}
        className={`origin-top w-full md:w-1/2 max-w-sm md:self-stretch flex flex-col justify-center ${
          isEven ? "md:mr-16" : "md:mr-0"
        }`}
      >
        <h3 className="text-2xl md:text-4xl font-bold mb-2">{data.title}</h3>
        <span
          className={`text-${data.accentColour} text-md md:text-xl font-bold block mb-4 leading-tight`}
        >
          {data.technologies}
        </span>
        <p className="mb-4 leading-tight">{data.description}</p>
        <div className="">
          <a>Link</a>
          <a>Link</a>
        </div>
      </motion.div>
    </motion.div>
  );
};
