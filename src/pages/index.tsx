import * as React from "react";
import type { HeadFC } from "gatsby";

import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import IPhone14 from "../components/devices/IPhone14";

const IndexPage = () => {
  return (
    <>
      <Hero />
      <Header />
      <main className="w-full h-full ">
        <section className="min-h-[200vh] px-4 md:px-8 snap-start scroll-mt-8">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 32,
            }}
          >
            <h2 className="text-purple-500 text-4xl font-bold mb-8">
              Projects
            </h2>
            <IPhone14 width={300} />
            <IPhone14 width={300} />
            <IPhone14 width={300} />
          </div>
        </section>
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <meta name="theme-color" content="#18181b" />
    <title>Home Page</title>
  </>
);
