import React, { type FC, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  show: boolean;
};

const Footer: FC<Props> = ({ show }) => {
  const ref = useRef(null);

  return (
    <footer ref={ref}>
      <motion.div
        animate={{ translateY: show ? 0 : 110 }}
        transition={{ duration: 0.2 }}
        className="fixed z-10 bottom-0 left-0 -z-10 w-full px-4 md:px-8 py-4 flex justify-center items-center bg-zinc-900 border-t border-zinc-800 border-solid"
      >
        <span className="text-sm text-zinc-400 text-center">
          Designed and developed 2022 © Atanas Dimitrov
        </span>
      </motion.div>
    </footer>
  );
};

export default Footer;
