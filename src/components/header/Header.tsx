import React, { FC } from "react";

import { PERFORATED_BG } from "../../styles/constants";

const Header: FC = () => {
  return (
    <header
      className={`sticky top-0 z-10 h-16 w-full flex justify-between items-center ${PERFORATED_BG} bg-left-top px-4 md:px-8 border-solid border-b border-zinc-800`}
    >
      <h1>Atanas Dimitrov</h1>
      <nav>
        Menu
        {/* <a>Section 1</a>
        <a>Section 2</a>
        <a>Section 3</a> */}
      </nav>
    </header>
  );
};

export default Header;
