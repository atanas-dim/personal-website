import { MotionValue } from "framer-motion";
import { MutableRefObject } from "react";
import { create } from "zustand";
import { BgIcon } from "../resources/background";
import { Section } from "../resources/sections";

type Store = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  bgIcon: BgIcon;
  setBgIcon: (bgIcon: BgIcon) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const useStore = create<Store>((set) => ({
  activeSection: Section.Hero,
  setActiveSection: (activeSection) => set({ activeSection }),
  bgIcon: BgIcon.Map,
  setBgIcon: (bgIcon) => set({ bgIcon }),
  isDarkMode: false,
  toggleDarkMode: () =>
    set(({ isDarkMode }) => ({
      isDarkMode: !isDarkMode,
    })),
}));

export default useStore;
