import React, { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-4 md:px-8 py-4 flex justify-center items-center bg-zinc-900 border-t border-zinc-800 border-solid ">
      <span className="text-sm text-zinc-400 text-center">
        Designed and developed 2022 © Atanas Dimitrov
      </span>
    </footer>
  );
};

export default Footer;
