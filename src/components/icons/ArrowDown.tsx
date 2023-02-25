import React, { type FC, type HTMLAttributes } from "react";
import { motion, SVGMotionProps } from "framer-motion";

const ArrowDown: FC<
  HTMLAttributes<SVGSVGElement> & SVGMotionProps<SVGSVGElement>
> = (props) => {
  return (
    <motion.svg
      width="28"
      height="33"
      viewBox="0 0 28 33"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.15,
            staggerDirection: -1,
            delayChildren: 0.5,
            ease: "backOut",
          },
        },
      }}
      {...props}
    >
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.974121 21.0943L3.02594 18.9057L14 29.1939L24.9741 18.9057L27.0259 21.0943L14 33.3061L0.974121 21.0943Z"
      />
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 11H8V8H20V11Z"
      />
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3.5H8V0.5H20V3.5Z"
      />
    </motion.svg>
  );
};

export default ArrowDown;
