import * as React from "react";
import type { HeadFC } from "gatsby";

import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import IPhone14 from "../components/devices/IPhone14";

const IndexPage = () => {
  return (
    <main className="w-full h-full overflow-y-auto">
      <Hero />
      <Header />

      <div className="min-h-[200vh] px-4 md:px8">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 32,
          }}
        >
          <h2 className="text-purple-500 text-4xl font-bold mb-8">Projects</h2>
          <IPhone14 width={300} />
          <IPhone14 width={300} />
          <IPhone14 width={300} />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
