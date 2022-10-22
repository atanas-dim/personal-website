import React, { FC } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";
import { Section, SECTIONS } from "../../pages";

type Props = {
  sectionName?: string;
};

const Header: FC<Props> = ({ sectionName }) => {
  return (
    <header
      className={`sticky top-0 z-50 h-16 w-full  flex justify-between items-center ${PERFORATED_BG} bg-left-top px-4 md:px-8 border-solid border-b border-zinc-800`}
    >
      <motion.div
        initial="hidden"
        animate={
          sectionName !== SECTIONS[Section.Hero].title ? "visible" : undefined
        }
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="w-full  max-w-5xl mx-auto flex justify-between items-center"
      >
        <div className="relative h-full">
          <AnimatePresence>
            <motion.h2
              key={sectionName}
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "-50%" }}
              exit={{ opacity: 0, y: "50%" }}
              transition={{
                ease: "backInOut",
                duration: 0.6,
              }}
              className="absolute top-[50%] left-0"
            >
              {sectionName ?? "Portfolio"}
            </motion.h2>
          </AnimatePresence>
        </div>
        <div
          onClick={() => {
            const section = document.getElementById("stack");

            document
              .getElementById("scroll-container")
              ?.scroll({ top: section?.offsetTop, behavior: "smooth" });
          }}
        >
          Menu
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
