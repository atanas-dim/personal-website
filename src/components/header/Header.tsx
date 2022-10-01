import React, { FC } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";

type Props = {
  sectionName: string;
};

const Header: FC<Props> = ({ sectionName }) => {
  return (
    <header
      className={`sticky top-0 z-10 h-16 w-full flex justify-between items-center ${PERFORATED_BG} bg-left-top px-4 md:px-8 border-solid border-b border-zinc-800`}
    >
      <AnimatePresence>
        {!!sectionName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex justify-between items-center"
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
                  {sectionName}
                </motion.h2>
              </AnimatePresence>
            </div>
            <div>Menu</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
