import React, { FC } from "react";

import { PERFORATED_BG } from "../../styles/constants";

const Hero: FC = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center flex-col">
      <div className="w-full absolute top-0 left-0 z-[-20] h-[calc(100vh_+_64px)] overflow-hidden hero-mask">
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient-pink bg-no-repeat bg-center bg-100vh opacity-70 " />
      </div>
      <div
        className={`absolute z-[-10] top-0 left-0 w-full h-full ${PERFORATED_BG} bg-left-bottom`}
      />
      <h2 className="text-4xl md:text-6xl font-bold">
        Hi, <span className="text-blue-400">I'm Atanas</span>
      </h2>
      <h2 className="text-3xl md:text-5xl font-bold">
        <span className="text-cyan-400">React</span> Developer
      </h2>
    </div>
  );
};

export default Hero;
