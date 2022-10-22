import React, { FC, Dispatch, SetStateAction } from "react";
import { motion, MotionValue } from "framer-motion";
import { BgIcon } from "../background/Background";
import { Section } from "../../pages";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Experience: FC<Props> = ({ scrollY, setBgIcon, setActiveSection }) => {
  return (
    <motion.section
      id="experience"
      onViewportEnter={() => {
        setBgIcon(BgIcon.Laptop);
        setActiveSection(Section.Experience);
      }}
      className="h-screen pt-16 flex justify-center items-center"
    >
      Experience
    </motion.section>
  );
};

export default Experience;
