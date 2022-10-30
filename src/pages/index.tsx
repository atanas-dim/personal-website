import React, { useRef, useState, FC } from "react";
import type { HeadFC } from "gatsby";

import { Helmet } from "react-helmet";

import Background, { BgIcon } from "../components/background/Background";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Stack from "../components/stack/Stack";
import Experience from "../components/experience/Experience";
import Footer from "../components/footer/Footer";

import { useScroll } from "framer-motion";

export enum Section {
  Hero,
  Projects,
  Stack,
  Experience,
  // Contact,
}

export const SECTIONS = {
  [Section.Hero]: {
    title: "Start",
    target: "start",
  },
  [Section.Projects]: {
    title: "Projects",
    target: "projects",
  },
  [Section.Stack]: {
    title: "Stack",
    target: "stack",
  },
  [Section.Experience]: {
    title: "Experience",
    target: "experience",
  },
  // [Section.Contact]: {
  //   title: "Contact",
  // },
};

const IndexPage: FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<Section>(Section.Hero);
  const [bgIcon, setBgIcon] = useState<BgIcon>(BgIcon.ArmFlex);

  const { scrollY } = useScroll({
    container: scrollContainer,
  });

  return (
    <>
      <Helmet defer={false} htmlAttributes={{ lang: "en" }}>
        <meta
          name="description"
          content="Personal website with projects and skills showcase."
        />
      </Helmet>
      <Background pathIndex={bgIcon} />
      <div id="scroll-container" ref={scrollContainer}>
        <Hero setActiveSection={setActiveSection} />
        <Header
          sectionName={
            activeSection !== undefined
              ? SECTIONS[activeSection].title
              : undefined
          }
        />
        <main className="w-full">
          <Projects
            scrollY={scrollY}
            setBgIcon={setBgIcon}
            setActiveSection={setActiveSection}
          />
          <Stack
            scrollY={scrollY}
            setBgIcon={setBgIcon}
            setActiveSection={setActiveSection}
          />
          <Experience
            scrollY={scrollY}
            setBgIcon={setBgIcon}
            setActiveSection={setActiveSection}
          />
        </main>
        <Footer />
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
