import React, { FC, Dispatch, SetStateAction } from "react";
import { motion, MotionValue } from "framer-motion";
import { BgIcon } from "../background/Background";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Experience: FC<Props> = ({ scrollY, setBgIcon }) => {
  return (
    <motion.section
      id="experience"
      onViewportEnter={() => setBgIcon(BgIcon.Laptop)}
      className="h-screen snap-start pt-16 flex justify-center items-center"
    >
      Experience
    </motion.section>
  );
};

export default Experience;
