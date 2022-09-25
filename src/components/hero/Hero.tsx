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
        x: [
          0, 100, -260, 40, -80, -290, -40, 30, 120, 100, -260, -100, 50, -50,
        ],
        y: [
          0, 100, -220, -40, 40, -70, -180, 30, 340, 300, -360, -100, 50, -50,
        ],
        scale: [
          0.7, 1.1, 1.3, 1.2, 1.1, 1.3, 0.9, 1.2, 0.9, 1.2, 1, 1.1, 0.9, 1.3,
        ],
        transition: {
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    else controls.stop();
  }, [isInView]);

  return (
    <div className="w-full h-full relative flex justify-center items-center flex-col z-10">
      <div className="w-full absolute top-0 left-0 z-[-20] h-full overflow-hidden hero-mask flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={controls}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
          className=" origin-center w-[100vmin] h-[100vmin] bg-radial-gradient-pink bg-no-repeat bg-center bg-100vmin "
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
