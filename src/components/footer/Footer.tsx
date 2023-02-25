import React, { type FC } from "react";
import { motion } from "framer-motion";
import photo from "../../assets/images/atanas.jpg";
import { SOCIAL_LINKS } from "../../resources/social-links";

const Footer: FC = () => {
  return (
    <footer className="w-full px-4 md:px-8 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 border-solid colour-transition">
      <div className="max-w-5xl mx-auto pt-8 pb-4 flex items-center justify-center flex-col">
        <motion.img
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            show: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          src={photo}
          alt="Atanas' photo"
          width={80}
          height={80}
          className="border-2 border-solid border-zinc-900 dark:border-white rounded-full mb-4"
        />
        {/* Speech bubble */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            show: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className={`
          colour-transition
          origin-[50%_-80px]
          relative flex flex-col bg-zinc-800 dark:bg-white px-5 py-2 mb-10 rounded-3xl
          before:absolute before:w-12 before:h-12 before:z-10 before:-top-10 before:left-8 before:border-zinc-800 dark:before:border-white before:border-t-0 before:border-r-0 before:border-b-[48px] before:border-l-[48px] before:border-l-transparent dark:before:border-l-transparent
          `}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="text-xl md:text-2xl font-bold text-white dark:text-zinc-900"
          >
            Let's connect
          </motion.span>
        </motion.div>

        <div className="flex mb-8">
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
        <span className="text-sm text-zinc-500 dark:text-zinc-400 text-center border-t border-solid border-zinc-100 dark:border-zinc-800 pt-4 w-full">
          Designed and developed 2023 © Atanas Dimitrov
        </span>
      </div>
    </footer>
  );
};

export default Footer;
