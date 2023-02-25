import React, { type FC, type HTMLAttributes } from "react";

const MailIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-90 fill-zinc-900 dark:fill-white"
      {...props}
    >
      <path d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12V36C4 38.2 5.8 40 8 40H40C42.2 40 44 38.2 44 36V12ZM40 12L24 22L8 12H40ZM40 36H8V16L24 26L40 16V36Z" />
    </svg>
  );
};

export default MailIcon;
