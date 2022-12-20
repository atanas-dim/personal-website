import React, { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full px-4 md:px-8 bg-zinc-900 border-t border-zinc-800 border-solid">
      <div className="max-w-5xl  mx-auto py-4 flex items-center ">
        <span className="text-sm text-zinc-400 text-center">
          Designed and developed 2022 © Atanas Dimitrov
        </span>
      </div>
    </footer>
  );
};

export default Footer;
