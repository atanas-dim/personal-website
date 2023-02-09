import React, { useRef, useState, FC, useEffect } from "react";
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

//TODO create class names in global.css and remove consts from here
export const SECTION =
  "w-full min-h-screen h-full mx-auto max-w-5xl flex flex-col md:flex-row";
export const SECTION_LABEL_WRAPPER =
  "w-full md:max-w-[20%] mr-4 sticky top-20 md:top-1/2 self-start z-10 xl:-mt-8";
export const SECTION_LABEL =
  "block px-3 py-1 w-fit text-lg md:text-2xl font-bold rounded-xl bg-zinc-200 dark:bg-zinc-800";
export const SECTION_CONTENT = "w-full h-full mx-auto";

export enum Section {
  Hero,
  Projects,
  Stack,
  Experience,
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
};

const IndexPage: FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<Section | undefined>(
    Section.Hero
  );
  const [bgIcon, setBgIcon] = useState<BgIcon>(BgIcon.ArmFlex);
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const { scrollY } = useScroll({
    container: scrollContainer,
  });

  useEffect(() => {
    const updateMode = (event: MediaQueryListEvent) => {
      const isDark = !!event.matches;
      setIsDarkMode(isDark);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateMode);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    const meta = document.getElementsByName(
      "theme-color"
    )[0] as HTMLMetaElement;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      if (meta) meta.content = "#18181b";
    } else {
      document.documentElement.classList.remove("dark");
      if (meta) meta.content = "#fff";
    }
  }, [isDarkMode]);

  useEffect(() => {
    scrollY.onChange((v) => {
      if (v > window.innerHeight - 80)
        setActiveSection(() => {
          return undefined;
        });
    });
  }, [scrollY]);

  return (
    <>
      <Background
        pathIndex={bgIcon}
        scrollY={scrollY}
        isDarkMode={isDarkMode}
      />
      <div id="scroll-container" ref={scrollContainer}>
        <Hero {...{ setBgIcon, setActiveSection }} />
        <Header {...{ activeSection, isDarkMode, setIsDarkMode }} />
        <main className="w-full px-4 md:px-8">
          <Projects {...{ scrollY, setBgIcon }} />
          <Stack {...{ scrollY, setBgIcon }} />
          <Experience {...{ scrollY, setBgIcon }} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <Helmet defer={false} htmlAttributes={{ lang: "en" }}>
      <meta name="theme-color" content="#fff" />
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
