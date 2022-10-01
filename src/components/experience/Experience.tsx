import React, { FC, Dispatch, SetStateAction } from "react";
import { motion, MotionValue } from "framer-motion";

type Props = {
  scrollY: MotionValue<number>;
};

const Experience: FC<Props> = ({ scrollY }) => {
  return (
    <motion.section
      id="experience"
      className="h-screen snap-start pt-16 flex justify-center items-center"
    >
      Experience
    </motion.section>
  );
};

export default Experience;
