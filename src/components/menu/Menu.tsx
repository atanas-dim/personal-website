import React, { type FC } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";

import { Section, SECTIONS } from "../../pages";

type Props = {
  show: boolean;
  hide: () => void;
};

const Menu: FC<Props> = ({ show, hide }) => {
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
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="relative rounded-2xl w-full max-w-md bg-white dark:bg-zinc-900 p-8 flex justify-center items-center flex-col shadow-2xl shadow-black"
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "110%" }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="iconButton absolute top-1 right-1"
              onClick={hide}
            >
              <CloseIcon />
            </button>
            <span className="block mb-8">Jump to</span>
            {Object.keys(SECTIONS).map((key, index) => {
              const { title, target } = SECTIONS[+key as Section];
              return (
                <a
                  key={"menu-button-" + index}
                  className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4 w-full mb-4 flex justify-center items-center font-bold hover:bg-zinc-900 hover:bg-opacity-20 active:bg-opacity-30 dark:hover:bg-zinc-50 dark:hover:bg-opacity-20 dark:active:bg-opacity-30"
                  onClick={hide}
                  href={`/#${target}`}
                >
                  {title}
                </a>
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
      className="fill-zinc-900 dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
    </svg>
  );
};
