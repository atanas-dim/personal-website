import React, { useRef, useEffect } from "react";
import type { HeadFC } from "gatsby";

import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";

import { useScroll } from "framer-motion";

const IndexPage = () => {
  const scrollContainer = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    container: scrollContainer,
  });

  useEffect(() => {
    // scrollYProgress.onChange((v) => console.log(v));
  }, [scrollYProgress]);

  return (
    <div id="scroll-container" ref={scrollContainer}>
      <Hero />
      <Header />
      <main className="w-full h-full">
        <Projects
          scrollContainer={scrollContainer}
          scrollYProgress={scrollYProgress}
          scrollY={scrollY}
        />
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
