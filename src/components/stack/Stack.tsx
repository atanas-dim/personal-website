import React, {
  FC,
  useRef,
  HTMLAttributes,
  useEffect,
  useState,
  useMemo,
} from "react";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

type SkillDef = {
  label: string;
  style?: string;
};

const BASE_STACK: SkillDef[] = [
  { label: "HTML", style: "text-red-400" },
  { label: "CSS", style: "text-blue-400" },
  { label: "JavaScript", style: "text-yellow-400" },
];

const MAIN_STACK: SkillDef[] = [
  { label: "React", style: "text-cyan-400" },
  { label: "TypeScript", style: "text-sky-300" },
  { label: "NextJS", style: "text-blue-400" },
  { label: "TailwindCSS", style: "text-purple-400" },
  { label: "MUI", style: "text-blue-400" },
  { label: "SASS", style: "text-fuchsia-400" },
  { label: "Firebase", style: "text-orange-400" },
  { label: "Supabase", style: "text-emerald-500" },
];

const ADDITIONAL_STACK: SkillDef[] = [
  { label: "styled-components", style: "" },
  { label: "GSAP", style: "" },
  { label: "Framer Motion", style: "" },
  { label: "Gatsby", style: "" },
  { label: "PostgreSQL", style: "" },
  { label: "i18next", style: "" },
  { label: "NodeJS", style: "" },
  { label: "ExpressJS", style: "" },
];

type Props = {
  scrollY: MotionValue<number>;
};

const Stack: FC<Props> = ({ scrollY }) => {
  const target = useRef<HTMLDivElement>(null);

  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Need to set this on mount to fix blank sections
    setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
    setFullOpacityScrollTop(target.current?.getBoundingClientRect()?.y ?? 0);
  }, []);

  useEffect(() => {
    scrollY.onChange((v) => {
      if (!target.current) return;

      if (
        v >=
        target.current?.offsetTop -
          target.current?.getBoundingClientRect()?.height
      )
        setShow(true);
    });
  }, [scrollY]);

  return (
    <motion.section
      id="stack"
      ref={target}
      className="relative h-full md:mt-[80%] md:h-[200%] w-full snap-center"
    >
      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center pt-16 px-4 md:px-8 pb-4 md:pb-8 pointer-events-none">
          <div className="flex flex-col justify-center items-center mb-4 w-full max-w-2xl">
            <div className="w-full flex justify-center items-center flex-wrap mb-4">
              {BASE_STACK.map((skill, index) => {
                return (
                  <Skill
                    key={"skill-" + index}
                    skill={skill}
                    scrollY={scrollY}
                    containerHeight={containerHeight}
                    fullOpacityScrollTop={fullOpacityScrollTop}
                    className="text-xl md:text-2xl"
                  />
                );
              })}
            </div>
            <div className="w-full flex justify-center items-center flex-wrap ">
              {MAIN_STACK.map((skill, index) => {
                return (
                  <Skill
                    key={"skill-" + index}
                    skill={skill}
                    scrollY={scrollY}
                    containerHeight={containerHeight}
                    fullOpacityScrollTop={fullOpacityScrollTop}
                    className="text-2xl md:text-4xl"
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-wrap  max-w-xs md:max-w-xl">
            {ADDITIONAL_STACK.map((skill, index) => {
              return (
                <Skill
                  key={"skill-" + index}
                  skill={skill}
                  scrollY={scrollY}
                  containerHeight={containerHeight}
                  fullOpacityScrollTop={fullOpacityScrollTop}
                  className="text-base md:text-xl"
                />
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Stack;

type SkillProps = {
  skill: SkillDef;
  scrollY: MotionValue<number>;
  containerHeight: number;
  fullOpacityScrollTop: number;
};

const Skill: FC<HTMLAttributes<HTMLHeadingElement> & SkillProps> = ({
  skill,
  scrollY,
  containerHeight,
  fullOpacityScrollTop,
  className,
}) => {
  const minDiff = containerHeight * 0.2;
  const maxDiff = containerHeight * 0.8;
  const difference = useMemo(
    () => Math.floor(Math.random() * (maxDiff - minDiff + 1) + minDiff),
    [maxDiff, minDiff]
  );

  const scrollSpring = useSpring(scrollY, {
    damping: 240,
    mass: 40,
    stiffness: 1000,
  });

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - difference,
      fullOpacityScrollTop - difference / 1.5,
      fullOpacityScrollTop,
      fullOpacityScrollTop + difference / 1.5,
      fullOpacityScrollTop + difference,
    ],
    // Into these values:
    [0, 1, 1, 1, 0]
  );

  const translateY = useTransform(
    scrollSpring,
    // Map from these values:
    [
      fullOpacityScrollTop - difference,
      fullOpacityScrollTop - difference / 3,
      fullOpacityScrollTop,
      fullOpacityScrollTop + difference / 3,
      fullOpacityScrollTop + difference,
    ],
    // Into these values:
    ["16px", "10px", "0px", "-10px", "-16px"]
  );

  return (
    <motion.h3
      style={{
        opacity,
        translateY,
      }}
      className={`mx-2 align-center font-bold ${skill.style} ${className}`}
    >
      {skill.label}
    </motion.h3>
  );
};
