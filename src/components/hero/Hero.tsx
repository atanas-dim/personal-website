import React, { FC } from "react";

import { PERFORATED_BG } from "../../styles/constants";

const Hero: FC = () => {
  return (
    <div className="w-full h-full  relative">
      <div className="absolute z-[-20] top-0 left-0 w-full h-full bg-radial-gradient-pink bg-no-repeat bg-center" />
      <div
        className={`absolute z-[-10] top-0 left-0 w-full h-full ${PERFORATED_BG} bg-left-bottom`}
      />
      <h2>Hero</h2>
    </div>
  );
};

export default Hero;
