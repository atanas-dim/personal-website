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

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Projects: FC<Props> = ({ scrollY, setBgIcon }) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        id="projects"
        ref={target}
        className={`border-0 border-solid border-red-500 relative h-[${
          PROJECTS.length * 100
        }%] w-full mb-[50vh]`}
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

  const [show, setShow] = useState(false);
  const [enterScrollTop, setEnterScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Need to set this on mount to fix blank sections
    setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
    setContainerWidth(target.current?.getBoundingClientRect()?.width ?? 0);
    setEnterScrollTop(target.current?.getBoundingClientRect()?.y ?? 0);
  }, []);

  const scrollSpring = useSpring(scrollY, {
    damping: 2000,
    mass: 80,
    stiffness: 20000,
  });

  const rotate = useTransform(
    scrollSpring,
    // Map from these values:
    [enterScrollTop - containerHeight, enterScrollTop + containerHeight],
    // Into these values:
    ["-180deg", "180deg"]
  );

  const textOpacity = useTransform(
    scrollSpring,
    // Map from these values:
    [
      enterScrollTop - containerHeight,
      enterScrollTop - containerHeight / 4,
      enterScrollTop,
      enterScrollTop + containerHeight / 4,
      enterScrollTop + containerHeight,
    ],
    // Into these values:
    [0, 1, 1, 1, 0]
  );

  const textTranslateY = useTransform(
    scrollSpring,
    // Map from these values:
    [
      enterScrollTop - containerHeight,
      enterScrollTop - containerHeight / 4,
      enterScrollTop,
      enterScrollTop + containerHeight / 4,
      enterScrollTop + containerHeight,
    ],
    // Into these values:
    [60, 1, 1, 1, -60]
  );

  const textRotateX = useTransform(
    scrollSpring,
    // Map from these values:
    [
      enterScrollTop - containerHeight,
      enterScrollTop - containerHeight / 4,
      enterScrollTop,
      enterScrollTop + containerHeight / 4,
      enterScrollTop + containerHeight,
    ],
    // Into these values:
    ["-90deg", "0deg", "0deg", "0deg", "90deg"]
  );

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      onViewportEnter={() => setBgIcon(data.bgIcon)}
      className="w-full h-screen flex flex-col justify-center items-center p-4 md:p-8 mt-[25vh] overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          translateY: "50%",
          rotate,
        }}
        className="origin-bottom min-w-[100vw] min-h-screen fixed bottom-[55%] left-0 flex justify-center items-center -z-10"
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
        className="fixed bottom-0 left-[50%] translate-x-[-50%] mb-[6vh] w-full max-w-[200px]"
      >
        <motion.div
          className="p-4 flex flex-col justify-center items-center rounded-2xl bg-zinc-800 w-full"
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
