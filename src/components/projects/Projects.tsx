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
  setSectionName: Dispatch<SetStateAction<string>>;
};

const Projects: FC<Props> = ({ scrollY, setSectionName }) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        ref={target}
        viewport={{
          margin: `${
            (typeof window !== "undefined" ? -window.screen.height : 0) / 3
          }px 0px`,
        }}
        onViewportEnter={() => setSectionName("Projects")}
        className={`border-0 border-solid border-red-500 relative h-[${
          PROJECTS.length * 100
        }%] w-full`}
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

  useEffect(() => {
    // Need to set this on mount to fix blank sections
    setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
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
    ["-45deg", "45deg"]
  );

  // useEffect(() => {
  //   translateX.onChange((v) => console.log("HERE", v));
  // }, [translateX]);

  // useEffect(() => {
  //   if (index === 2) translateX.onChange((v) => console.log("HERE 2", v));
  // }, [translateX]);

  return (
    <>
      <div
        ref={target}
        style={{
          pointerEvents: "none",
        }}
        className="w-full h-screen flex flex-col justify-center items-center p-4 md:p-8 snap-start snap-mt-8"
      >
        <motion.div
          style={{
            translateX,
            translateY: "-50%",
            rotate,
          }}
          className="origin-bottom min-w-[100vw] min-h-screen fixed top-[50%] left-0 flex justify-center items-center -z-10 "
        >
          <IPhone14
            width={
              typeof window !== "undefined" && window.screen.width < 424
                ? window.screen.width * 0.6
                : 300
            }
          />
        </motion.div>
      </div>
    </>
  );
};
