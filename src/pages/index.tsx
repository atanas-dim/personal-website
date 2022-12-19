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

export const SECTION_LABEL_WRAPPER =
  "w-full mx-auto sticky top-20 xl:top-1/2 px-4 md:px-8 ";
export const SECTION_LABEL = "block mx-auto max-w-5xl md:text-2xl font-bold ";

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
      <Background pathIndex={bgIcon} />
      <div id="scroll-container" ref={scrollContainer}>
        <Hero setBgIcon={setBgIcon} setActiveSection={setActiveSection} />
        <Header activeSection={activeSection} />
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
        <Footer show={activeSection === Section.Experience} />
      </div>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <Helmet defer={false} htmlAttributes={{ lang: "en" }}>
      <meta name="theme-color" content="#18181b" />
      <title>Atanas Dimitrov - Portfolio</title>
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />

      <meta name="description" content="Web developer based in UK." />
      <meta
        name="keywords"
        content="JavaScript, ReactJS, React, Developer, Web, UK, Brighton & Hove, Portfolio, Web Apps"
      ></meta>

      <meta property="og:title" content="Atanas Dimitrov - Portfolio" />
      <meta property="og:type" content="Personal website" />
      <meta property="og:url" content="http://atanas.codes/" />
      <meta property="og:image" content="/social-card.jpg" />
      <meta property="og:description" content="Web developer based in UK." />
      <meta property="og:site_name" content="Atanas Dimitrov" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Atanas Dimitrov - Portfolio" />
      <meta name="twitter:description" content="Web developer based in UK." />
      <meta name="twitter:image" content="/social-card.jpg" />
    </Helmet>
  </>
);
