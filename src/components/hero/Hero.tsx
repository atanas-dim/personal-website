import React, { FC, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";

import photo from "../../assets/images/atanas.jpg";

const Hero: FC = () => {
  const [isInView, setIsInView] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView)
      controls.start({
        x: [-260, 40, -80, 30, -280, -120, -260],
        y: [-260, -40, 40, 20, -280, 0, -360],
        scale: [1, 1.5, 1.7, 1.2, 0.9, 1.2, 1.5],
        transition: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    else controls.stop();
  }, [isInView]);

  return (
    <div className="w-full h-full relative flex justify-center items-center flex-col">
      <div className="w-full absolute top-0 left-0 z-[-20] h-full overflow-hidden hero-mask ">
        <motion.div
          animate={controls}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
          className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] origin-center w-[100vmin] h-[100vmin] bg-radial-gradient-pink bg-no-repeat bg-center bg-100vmin "
        />
      </div>
      <div
        className={`absolute z-[-10] top-0 left-0 w-full h-full ${PERFORATED_BG} bg-left-bottom`}
      />
      <img
        src={photo}
        alt="Atanas' photo"
        className="w-40 h-40 border-2 border-solid border-white rounded-full mb-4"
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
