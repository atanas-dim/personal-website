import React, {
  FC,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
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
        className="relative w-full mt-[50vh] mb-[100vh]"
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
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Need to set this on mount to fix blank sections
    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setContainerWidth(target.current?.getBoundingClientRect()?.width ?? 0);
      setFullOpacityScrollTop(target.current?.getBoundingClientRect()?.y ?? 0);
    };
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () =>
      window.removeEventListener("resize", updateValuesFromContainerRect);
  }, []);

  const scrollSpring = useSpring(scrollY, {
    damping: 2000,
    mass: 80,
    stiffness: 20000,
  });

  const scale = useTransform(
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
    [0.9, 1, 1, 1, 1.1]
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
    ["16px", "10px", "0px", "-10px", "-16px"]
  );

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
    [0, 0.8, 1, 0.8, 0]
  );

  const textOpacity = useTransform(
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
    [0, 1, 1, 1, 0]
  );

  const textTranslateY = useTransform(
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
    [60, 0, 0, 0, -60]
  );

  const textRotateX = useTransform(
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
    ["-90deg", "0deg", "0deg", "0deg", "90deg"]
  );

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      onViewportEnter={() => setBgIcon(data.bgIcon)}
      className="w-full h-screen md:h-[150vh] flex flex-col justify-center items-center p-4 md:p-8 mb-[100vh] md:mb-[150vh]  overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          translateY,
          opacity,
          scale,
        }}
        className="origin-center w-full h-full fixed bottom-0 left-0 flex justify-center items-center -z-10"
      >
        <IPhone14
          width={containerWidth < 424 ? containerWidth * 0.5 : 300}
          imageSrc={data.imageSrc}
        />
      </motion.div>
      <div
        style={{
          perspective: "60rem",
        }}
        className="fixed bottom-0 left-[50%] translate-x-[-50%] mb-[4vh] w-full max-w-[200px]"
      >
        <motion.div
          className="p-4 flex flex-col justify-center items-center rounded-2xl bg-zinc-800 w-full opacity-0"
          style={{
            opacity: textOpacity,
            translateY: textTranslateY,
            rotateX: textRotateX,
            transformStyle: "preserve-3d",
          }}
        >
          <h3 className="mb-2 whitespace-nowrap">{data.title}</h3>
          <div className="pointer-events-auto">
            <a
              target="_blank"
              rel="noopener norefferer"
              className="mr-2 underline p-2"
              href={data.liveUrl}
            >
              Live
            </a>
            <a
              target="_blank"
              rel="noopener norefferer"
              className="underline p-2"
              href={data.codeUrl}
            >
              Code
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
