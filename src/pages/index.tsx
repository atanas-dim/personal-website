import * as React from "react";
import type { HeadFC } from "gatsby";

import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";

const IndexPage = () => {
  return (
    <main className="w-full h-full overflow-y-auto">
      <Hero />
      <Header />

      <div className="min-h-[200vh] ">
        <h1 className="text-3xl font-bold underline text-purple-500">
          Hello world!
        </h1>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
