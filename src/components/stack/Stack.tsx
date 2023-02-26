import React, {
  FC,
  useRef,
  HTMLAttributes,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useEffect,
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
  { label: "React", style: "text-cyan-400 " },
  { label: "TypeScript", style: "text-sky-300" },
  { label: "NextJS", style: "text-blue-400" },
  { label: "MUI", style: "text-blue-400" },
  { label: "TailwindCSS", style: "text-purple-400" },
  { label: "SASS", style: "text-fuchsia-400" },
  { label: "Firebase", style: "text-orange-400" },
  { label: "Supabase", style: "text-emerald-400" },
  { label: "React Native", style: "text-cyan-400" },
];

const ADDITIONAL_STACK: SkillDef[] = [
  { label: "GSAP", style: "text-lime-400" },
  { label: "Framer Motion", style: "text-purple-400" },
  { label: "Git", style: "text-orange-500" },
  { label: "styled-components", style: "text-fuchsia-400" },
  { label: "Gatsby", style: "text-violet-400" },
  { label: "PostgreSQL", style: "text-sky-400" },
  { label: "i18next", style: "text-teal-400" },
  { label: "NodeJS", style: "text-emerald-400" },
  // { label: "ExpressJS", style: "text-blue-400" },
];

const createSkillsWithTextSizes = () => {
  const skills: SkillDef[] = [];
  BASE_STACK.forEach((skill) => {
    skill.style = "text-2xl md:text-4xl " + skill.style;
    skills.push(skill);
  });
  MAIN_STACK.forEach((skill) => {
    skill.style = "text-4xl md:text-5xl mx-3 " + skill.style;
    skills.push(skill);
  });
  ADDITIONAL_STACK.forEach((skill) => {
    skill.style = "text-2xl md:text-3xl " + skill.style;
    skills.push(skill);
  });
  return skills;
};

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
};

const Stack: FC<Props> = ({ scrollY, setBgIcon }) => {
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

  const [skills, setSkills] = useState<SkillDef[]>([]);

  useEffect(() => {
    setSkills(createSkillsWithTextSizes());
  }, []);

  return (
    <section
      id="stack"
      ref={target}
      className={
        SECTION + " min-h-[600px] max-h-[800px] relative flex md:mb-60"
      }
    >
      <div className={SECTION_LABEL_WRAPPER + " self-start"}>
        <span className={SECTION_LABEL}>Stack</span>
      </div>

      <div
        className={
          SECTION_CONTENT +
          " grow flex flex-col justify-center items-center self-center px-6 md:px-0"
        }
      >
        <div className="flex flex-col justify-center items-center  w-full ">
          <motion.div className="w-full flex items-center flex-wrap ">
            {skills.map((skill, index) => {
              return (
                <Skill
                  key={"skill-" + index}
                  index={index}
                  setBgIcon={setBgIcon}
                  skill={skill}
                  scrollY={scrollY}
                  containerHeight={containerHeight}
                  fullOpacityScrollTop={fullOpacityScrollTop}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stack;

type SkillProps = {
  index: number;
  setBgIcon: (icon: BgIcon) => void;
  skill: SkillDef;
  scrollY: MotionValue<number>;
  containerHeight: number;
  fullOpacityScrollTop: number;
};

const Skill: FC<HTMLAttributes<HTMLHeadingElement> & SkillProps> = ({
  index,
  setBgIcon,
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
    damping: 10,
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
    ["32px", "24px", "0px", "-24px", "-32px"]
  );

  return (
    <motion.span
      style={{
        opacity,
        translateY,
      }}
      className={`skill block mx-2 align-center font-bold leading-tight md:leading-tight ${className} ${skill.style}`}
      onViewportEnter={() => {
        if (index === 0) setBgIcon(BgIcon.Stack);
      }}
    >
      {skill.label}
    </motion.span>
  );
};
