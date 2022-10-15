import React, { useEffect, useRef, useState, FC } from "react";
import type { HeadFC } from "gatsby";

import Background, { BgIcon } from "../components/background/Background";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Stack from "../components/stack/Stack";
import Experience from "../components/experience/Experience";

import { useScroll } from "framer-motion";

enum Section {
  Projects,
  Stack,
  Experience,
  Contact,
}

const SECTIONS = {
  [Section.Projects]: {
    title: "Projects",
  },
  [Section.Stack]: {
    title: "Stack",
  },
  [Section.Experience]: {
    title: "Experience",
  },
  [Section.Contact]: {
    title: "Contact",
  },
};

type Props = {
  //
};
const IndexPage: FC<Props> = ({}) => {
  const scrollContainer = useRef(null);
  const [activeSection, setActiveSection] = useState<Section>();
  const [bgIcon, setBgIcon] = useState<BgIcon>(BgIcon.ArmFlex);

  const { scrollY } = useScroll({
    container: scrollContainer,
  });

  useEffect(() => {
    scrollY.onChange((v) => {
      //TODO Refactor. Set value from onViewportEnter on motion els
      if (v < 100) setActiveSection(undefined);
      if (
        (document.getElementById("projects")?.getBoundingClientRect().y ?? 0) <=
          300 &&
        activeSection !== Section.Projects
      )
        setActiveSection(Section.Projects);
      if (
        (document.getElementById("stack")?.getBoundingClientRect().y ?? 0) <=
          300 &&
        activeSection !== Section.Stack
      )
        setActiveSection(Section.Stack);
      if (
        (document.getElementById("experience")?.getBoundingClientRect().y ??
          0) <= 300 &&
        activeSection !== Section.Experience
      )
        setActiveSection(Section.Experience);
    });
  }, [scrollY]);

  return (
    <>
      <div id="scroll-container" ref={scrollContainer}>
        <Background pathIndex={bgIcon} />
        <Hero />
        <Header
          sectionName={
            activeSection !== undefined
              ? SECTIONS[activeSection].title
              : undefined
          }
        />
        <main className="w-full h-full ">
          <Projects scrollY={scrollY} setBgIcon={setBgIcon} />
          <Stack scrollY={scrollY} setBgIcon={setBgIcon} />
          <Experience scrollY={scrollY} setBgIcon={setBgIcon} />
        </main>
      </div>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <meta name="theme-color" content="#18181b" />
    <title>Atanas Dimitrov - Portfolio</title>
  </>
);
