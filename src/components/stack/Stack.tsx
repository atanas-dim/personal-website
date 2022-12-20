import React, {
  FC,
  useRef,
  HTMLAttributes,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { BgIcon } from "../background/Background";
import {
  SECTION,
  Section,
  SECTION_CONTENT,
  SECTION_LABEL,
  SECTION_LABEL_WRAPPER,
} from "../../pages";

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
  { label: "MUI", style: "text-blue-400" },
  { label: "TailwindCSS", style: "text-purple-400" },
  { label: "SASS", style: "text-fuchsia-400" },
  { label: "Firebase", style: "text-orange-400" },
  { label: "Supabase", style: "text-emerald-400" },
];

const ADDITIONAL_STACK: SkillDef[] = [
  { label: "styled-components", style: "text-fuchsia-400" },
  { label: "GSAP", style: "text-lime-400" },
  { label: "Framer Motion", style: "text-purple-400" },
  { label: "Gatsby", style: "text-violet-400" },
  { label: "PostgreSQL", style: "text-sky-400" },
  { label: "i18next", style: "text-teal-400" },
  { label: "NodeJS", style: "text-emerald-400" },
  { label: "ExpressJS", style: "text-blue-400" },
];

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Stack: FC<Props> = ({ scrollY, setBgIcon, setActiveSection }) => {
  const target = useRef<HTMLDivElement>(null);

  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setFullOpacityScrollTop(target.current?.offsetTop ?? 0);
    };
    // Need to set this on mount to fix stuck sections
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () => {
      window.removeEventListener("resize", updateValuesFromContainerRect);
    };
  }, []);

  return (
    <motion.section
      id="stack"
      ref={target}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        setBgIcon(BgIcon.Stack);
        setActiveSection(Section.Stack);
      }}
      className={SECTION + " relative mb-[30vh] flex "}
    >
      <div className={SECTION_LABEL_WRAPPER + " self-start"}>
        <span className={SECTION_LABEL}>Stack</span>
      </div>

      <div
        className={
          SECTION_CONTENT +
          " grow flex flex-col justify-center items-center self-center px-8 md:px-0"
        }
      >
        <div className="flex flex-col justify-center items-center mb-2 w-full ">
          <div className="w-full flex items-center flex-wrap mb-2">
            {BASE_STACK.map((skill, index) => {
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
          <div className="w-full flex items-center flex-wrap">
            {MAIN_STACK.map((skill, index) => {
              return (
                <Skill
                  key={"skill-" + index}
                  skill={skill}
                  scrollY={scrollY}
                  containerHeight={containerHeight}
                  fullOpacityScrollTop={fullOpacityScrollTop}
                  className="text-4xl md:text-5xl mx-3"
                />
              );
            })}
          </div>
        </div>
        <div className="w-full flex items-center flex-wrap">
          {ADDITIONAL_STACK.map((skill, index) => {
            return (
              <Skill
                key={"skill-" + index}
                skill={skill}
                scrollY={scrollY}
                containerHeight={containerHeight}
                fullOpacityScrollTop={fullOpacityScrollTop}
                className="text-2xl md:text-3xl"
              />
            );
          })}
        </div>
      </div>
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
  const maxDiff = containerHeight * 0.6;
  const difference = useMemo(
    () => Math.floor(Math.random() * (maxDiff - minDiff + 1) + minDiff),
    [maxDiff, minDiff]
  );

  const scrollSpring = useSpring(scrollY, {
    damping: 20,
    mass: 10,
    stiffness: 20,
  });

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - difference,
      fullOpacityScrollTop - difference / 3,
      fullOpacityScrollTop,
      fullOpacityScrollTop + difference / 3,
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
      className={`skill mx-2 align-center font-bold leading-tight md:leading-tight ${skill.style} ${className}`}
    >
      {skill.label}
    </motion.h3>
  );
};
