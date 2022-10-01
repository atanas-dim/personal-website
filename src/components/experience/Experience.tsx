import React, { FC, Dispatch, SetStateAction } from "react";
import { motion, MotionValue } from "framer-motion";

type Props = {
  scrollY: MotionValue<number>;
  setSectionName: Dispatch<SetStateAction<string>>;
};

const Experience: FC<Props> = ({ scrollY, setSectionName }) => {
  return (
    <motion.section
      viewport={{
        margin: `${
          (typeof window !== "undefined" ? -window.screen.height : 0) / 3
        }px 0px`,
      }}
      onViewportEnter={() => setSectionName("Experience")}
      className="h-screen snap-start pt-16 flex justify-center items-center"
    >
      Experience
    </motion.section>
  );
};

export default Experience;
