import React, { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full px-4 md:px-8 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 border-solid colour-transition">
      <div className="max-w-5xl  mx-auto py-4 flex items-center justify-center ">
        <span className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          Designed and developed 2023 © Atanas Dimitrov
        </span>
      </div>
    </footer>
  );
};

export default Footer;
