import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import Menu from "../menu/Menu";

import { Section } from "../../resources/sections";

import DeskLampOn from "../icons/DeskLampOn";
import DeskLamp from "../icons/DeskLamp";

import useStore from "../../hooks/useStore";

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeSection, isDarkMode, toggleDarkMode } = useStore();

  const showHeaderContent = activeSection !== Section.Hero;

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 w-full flex justify-between items-center perforated px-4 md:px-8 border-solid border-b border-zinc-200 dark:border-zinc-800 colour-transition`}
      >
        <motion.div
          initial="hidden"
          animate={showHeaderContent ? "visible" : undefined}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="w-full  max-w-5xl mx-auto flex justify-between items-center"
        >
          <motion.button
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              ease: "backInOut",
              duration: 0.6,
            }}
            className="font-bold"
            onClick={() => {
              document
                .getElementById("scroll-container")
                ?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Atanas Dimitrov
          </motion.button>

          <AnimatePresence>
            {showHeaderContent && (
              <div className="flex">
                <button onClick={() => toggleDarkMode()} className="iconButton">
                  {isDarkMode ? <DeskLamp /> : <DeskLampOn />}
                </button>

                <button
                  onClick={() => {
                    setShowMenu((prev) => !prev);
                  }}
                  className="iconButton"
                >
                  <Hamburger />
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
      <Menu show={showMenu} hide={() => setShowMenu(false)} />
    </>
  );
};

export default Header;

const Hamburger: FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-zinc-900 dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.06 23H19.72C20.56 23 21.25 22.35 21.35 21.53L23 5.05H18V1H16.03V5.05H11.06L11.36 7.39C13.07 7.86 14.67 8.71 15.63 9.65C17.07 11.07 18.06 12.54 18.06 14.94V23ZM1 22V21H16.03V22C16.03 22.54 15.58 23 15 23H2C1.45 23 1 22.54 1 22ZM16.03 15C16.03 7 1 7 1 15H16.03ZM1 17H16V19H1V17Z" />
    </svg>
  );
};
