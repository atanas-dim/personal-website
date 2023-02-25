import React, {
  type FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { motion, useAnimationControls } from "framer-motion";

import photo from "../../assets/images/atanas.jpg";

import { Section } from "../../pages";

import { BgIcon } from "../background/Background";
import { SOCIAL_LINKS } from "../../resources/social-links";
import ArrowDown from "../icons/ArrowDown";

type Props = {
  setActiveSection: Dispatch<SetStateAction<Section | undefined>>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Hero: FC<Props> = ({ setActiveSection, setBgIcon }) => {
  const [isInView, setIsInView] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.set({ opacity: 0 });
      controls.start({
        opacity: 1,
        transition: { duration: 0.5, delay: 0.75 },
      });
      controls.start({
        x: [
          0, 100, -260, 40, -80, -290, -40, 30, 120, 100, -260, -100, 50, -50,
        ],
        y: [
          0, 100, -220, -40, 40, -70, -180, 30, 340, 300, -360, -100, 50, -50,
        ],
        scaleX: [
          0.7, 1.1, 1.3, 1.2, 1.1, 1.6, 0.9, 1.2, 0.9, 1.2, 1, 1.1, 0.9, 1.3,
        ],
        scaleY: [
          0.7, 1.3, 1.1, 0.6, 1.4, 1.1, 1, 1.3, 0.9, 1, 1.2, 1.4, 0.9, 1.3,
        ],
        transition: {
          duration: 60,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.75,
        },
      });
    } else {
      controls.stop();
      controls.set({ opacity: 0, x: 0, y: 0, scaleX: 0.7, scaleY: 0.7 });
    }
  }, [isInView]);

  return (
    <motion.div
      id="start"
      className="relative w-full h-[calc(100%_-_64px)] min-h-[490px] flex justify-center items-center flex-col z-50"
    >
      <div className="w-full absolute top-0 left-0 -z-20 h-full overflow-hidden hero-mask flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
          className=" origin-center w-[100vmin] h-[100vmin] bg-radial-gradient-pink-light dark:bg-radial-gradient-pink-dark bg-no-repeat bg-center bg-100vmin "
        />
      </div>
      <div className="absolute -z-10 top-0 left-0 w-full h-full perforated" />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className=" flex justify-center items-center flex-col"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            show: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className={
            "origin-[50%_-80px] relative flex flex-col bg-zinc-800 dark:bg-white px-6 py-4 mb-10 rounded-3xl"
          }
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="text-3xl md:text-4xl font-bold text-white dark:text-zinc-900 text-center"
            onViewportEnter={() => {
              setActiveSection(Section.Hero);
              setBgIcon(BgIcon.ArmFlex);
            }}
            onViewportLeave={() => setActiveSection(undefined)}
          >
            <span className="text-blue-300 dark:text-blue-500">
              Atanas Dimitrov
            </span>
          </motion.h1>
          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="text-2xl md:text-3xl font-bold text-white dark:text-zinc-900 text-center"
          >
            <span className="text-cyan-300 dark:text-cyan-500">React</span>{" "}
            Developer
          </motion.h2>
        </motion.div>

        <div className="flex">
          {SOCIAL_LINKS.map(({ icon, href }, index) => {
            return (
              <motion.a
                key={"social-link-" + index}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mr-2 last-of-type:mr-0 iconButton"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                {icon}
              </motion.a>
            );
          })}
        </div>
        <a
          className="absolute bottom-0 left-1/2 translate-x-[-50%] iconButton"
          href="/#projects"
        >
          <ArrowDown className="fill-zinc-900 dark:fill-zinc-500" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
