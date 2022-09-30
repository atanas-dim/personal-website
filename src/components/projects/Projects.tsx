import React, { useState, useEffect, FC } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

import IPhone14 from "../devices/IPhone14";

const PROJECTS = [{}, {}, {}];

type Props = { scrollContainer: any; scrollYProgress: any; scrollY: any };

const Projects: FC<Props> = ({ scrollY }) => {
  return (
    <>
      <motion.section className="border-0 border-solid border-red-500 relative">
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
  const [bodyHeight, setBodyHeight] = useState(0);
  useEffect(() => {
    setBodyHeight(document.body.offsetHeight);
  }, []);

  const translateX = useTransform(
    scrollY,
    // Map from these values:
    [bodyHeight * index, bodyHeight * (index + 2)],
    // Into these values:
    ["-100%", "100%"]
  );

  const rotate = useTransform(
    scrollY,
    // Map from these values:
    [bodyHeight * index, bodyHeight * (index + 2)],
    // Into these values:
    ["-45deg", "45deg"]
  );

  return (
    <>
      <motion.div
        style={{
          pointerEvents: "none",
        }}
        className=" border-0 border-dashed border-blue-500 min-w-[100vw] min-h-[100vh] flex flex-col justify-center items-center p-4 md:p-8 snap-center snap-mt-8"
      >
        <motion.div
          style={{
            translateX: translateX,
            translateY: "-50%",
            rotate,
          }}
          className="origin-bottom border border-dashed border-purple-500 min-w-[100vw] min-h-[100vh] fixed top-[50%] left-0 flex justify-center items-center"
        >
          <IPhone14 width={260} />
        </motion.div>
      </motion.div>
    </>
  );
};
