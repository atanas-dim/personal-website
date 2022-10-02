import React, {
  FC,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

import IPhone14 from "../devices/IPhone14";

const PROJECTS = [{}, {}, {}];

type Props = {
  scrollY: MotionValue<number>;
};

const Projects: FC<Props> = ({ scrollY }) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        id="projects"
        ref={target}
        className={`border-0 border-solid border-red-500 relative h-[${
          PROJECTS.length * 100
        }%] w-full mb-96`}
      >
        {PROJECTS.map((project, index) => {
          return (
            <Project
              key={"container-" + index}
              index={index}
              scrollY={scrollY}
            />
          );
        })}
      </motion.section>
    </>
  );
};

export default Projects;

type ProjectProps = { index: number; scrollY: MotionValue<number> };

const Project: FC<ProjectProps> = ({ index, scrollY }) => {
  const target = useRef<HTMLDivElement>(null);

  const [enterScrollTop, setEnterScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Need to set this on mount to fix blank sections
    setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
    setContainerWidth(target.current?.getBoundingClientRect()?.width ?? 0);
    setEnterScrollTop(target.current?.getBoundingClientRect()?.y ?? 0);
  }, []);

  const translateX = useTransform(
    scrollY,
    // Map from these values:
    [enterScrollTop - containerHeight, enterScrollTop + containerHeight],
    // Into these values:
    ["-100%", "100%"]
  );

  const rotate = useTransform(
    scrollY,
    // Map from these values:
    [enterScrollTop - containerHeight, enterScrollTop + containerHeight],
    // Into these values:
    ["-75deg", "75deg"]
  );

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      enterScrollTop - containerHeight,
      enterScrollTop,
      enterScrollTop + containerHeight,
    ],
    // Into these values:
    [0, 1, 0]
  );

  return (
    <>
      <div
        ref={target}
        style={{
          pointerEvents: "none",
        }}
        className="w-full h-screen flex flex-col justify-center items-center p-4 md:p-8 snap-start mb-[70vh]"
      >
        <motion.div
          style={{
            translateY: "50%",
            rotate,
            opacity,
          }}
          className="origin-bottom min-w-[100vw] min-h-screen fixed bottom-[50%] left-0 flex justify-center items-center -z-10 "
        >
          <IPhone14 width={containerWidth < 424 ? containerWidth * 0.6 : 300} />
        </motion.div>
      </div>
    </>
  );
};
