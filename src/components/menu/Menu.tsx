import React, { type FC } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";

import { Section, SECTIONS } from "../../pages";

type Props = {
  show: boolean;
  hide: () => void;
};

const Menu: FC<Props> = ({ show, hide }) => {
  const onMenuItemClick = (id: string) => {
    const section = document.getElementById(id);
    document
      .getElementById("scroll-container")
      ?.scroll({ top: section?.offsetTop });
    hide();
  };
  return (
    <AnimatePresence>
      {show && (
        <div
          className={`z-50 fixed top-0 left-0 w-full h-full p-8 flex justify-center items-center`}
        >
          <motion.div
            onClick={hide}
            className={`-z-10 absolute top-0 left-0 w-full h-full bg-opacity-75 ${PERFORATED_BG}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="relative rounded-xl w-full max-w-md bg-zinc-800 p-8 flex justify-center items-center flex-col"
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "110%" }}
            transition={{ duration: 0.6 }}
          >
            <button
              className="absolute top-1 right-1 w-12 h-12 flex justify-center items-center"
              onClick={hide}
            >
              <CloseIcon />
            </button>
            <span className="block mb-8">Jump to</span>
            {Object.keys(SECTIONS).map((key, index) => {
              const { title, target } = SECTIONS[+key as Section];
              return (
                <button
                  key={"menu-button-" + index}
                  className="rounded-md bg-zinc-900 p-4 w-full mb-4 flex justify-center items-center font-bold"
                  onClick={() => onMenuItemClick(target)}
                >
                  {title}
                </button>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Menu;

const CloseIcon: FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="white"
      />
    </svg>
  );
};
