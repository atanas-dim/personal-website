// TODO Create different img exports from Figma for different screens sizes
import workoutBuilderImg from "../assets/images/project-thumb-workouts-mobile.jpg";
import beachShopImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import redditClientImg from "../assets/images/project-thumb-reddit-mobile.jpg";
import { BgIcon } from "../components/background/Background";

export type ProjectData = {
  title: string;
  technologies: string;
  description?: string;
  codeUrl: string;
  liveUrl: string;
  imageSrc: string;
  bgIcon: BgIcon;
  accentColour: string;
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Workout Builder Demo",
    technologies: "PWA, NextJS, TypeScript, MUI, Firebase",
    description:
      "This is a demo project for a workout builder app. It is a full-stack app with a NextJS frontend and a Firebase backend.",
    codeUrl: "https://github.com/atanas-dim/workout-builder",
    liveUrl: "https://workout-builder.vercel.app/",
    imageSrc: workoutBuilderImg,
    bgIcon: BgIcon.ArmFlex,
    accentColour: "sky-400",
  },
  {
    title: "BeachShop",
    technologies: "React, NodeJS, Express, PostgreSQL",
    description:
      "This is a demo project for an e-commerce app. It is a full-stack app with a React frontend and a NodeJS backend.",
    codeUrl: "https://github.com/atanas-dim/ecommerce-PERN",
    liveUrl: "https://beachshop.netlify.app/",
    imageSrc: beachShopImg,
    bgIcon: BgIcon.ShoppingBag,
    accentColour: "cyan-400",
  },
  {
    title: "Reddit Client",
    technologies: "React, Redux, Reddit JSON API",
    description:
      "This is a demo project for a Reddit client. It is a client-side app that uses the Reddit JSON API.",
    codeUrl: "https://github.com/atanas-dim/reddit-client",
    liveUrl: "https://reddit-atanas.netlify.app/",
    imageSrc: redditClientImg,
    bgIcon: BgIcon.Comment,
    accentColour: "sky-300",
  },
];
