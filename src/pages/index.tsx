import React, { useEffect, useRef, useState } from "react";
import type { HeadFC } from "gatsby";

import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Stack from "../components/stack/Stack";
import Experience from "../components/experience/Experience";

import { useScroll } from "framer-motion";

const IndexPage = () => {
  const scrollContainer = useRef(null);
  const [sectionName, setSectionName] = useState("");

  const { scrollY } = useScroll({
    container: scrollContainer,
  });

  useEffect(() => {
    scrollY.onChange((v) => {
      if (v < 100) setSectionName("");
    });
  }, [scrollY]);

  return (
    <div id="scroll-container" ref={scrollContainer}>
      <Hero />
      <Header sectionName={sectionName} />
      <main className="w-full h-full">
        <Projects scrollY={scrollY} setSectionName={setSectionName} />
        <Stack scrollY={scrollY} setSectionName={setSectionName} />
        <Experience scrollY={scrollY} setSectionName={setSectionName} />
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <meta name="theme-color" content="#18181b" />
    <title>Home Page</title>
  </>
);
