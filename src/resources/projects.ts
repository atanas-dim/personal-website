import workoutBuilderImg from "../assets/images/project-thumb-workouts-mobile.jpg";
// import beachShopImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import redditClientImg from "../assets/images/project-thumb-reddit-mobile.jpg";
import reactCalendarImg from "../assets/images/project-thumb-react-calendar.jpg";
import { BgIcon } from "../components/background/Background";

export type ProjectData = {
  title: string;
  technologies: string;
  description?: string;
  links: { href: string; label: string }[];
  image: {
    isMobile: boolean;
    src: string;
  };
  bgIcon: BgIcon;
  accentColour: string;
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Workout Builder Demo",
    technologies: "PWA, NextJS, TypeScript, MUI, Firebase",
    description:
      "Mobile first web app. Using React Context API and hooks to create a tool to organise exercises, workouts and routines. Features drag to reorder lists, online status provider, simple web hook to notify about updates on repo.",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/workout-builder",
      },
      {
        label: "Live",
        href: "https://workout-builder.vercel.app/",
      },
    ],
    image: {
      isMobile: true,
      src: workoutBuilderImg,
    },
    bgIcon: BgIcon.ArmFlex,
    accentColour: "sky-400",
  },
  // {
  //   title: "BeachShop",
  //   technologies: "React, NodeJS, Express, PostgreSQL",
  //   description:
  //     "This is a demo project for an e-commerce app. It is a full-stack app with a React frontend and a NodeJS backend.",
  //   codeUrl: "https://github.com/atanas-dim/ecommerce-PERN",
  //   liveUrl: "https://beachshop.netlify.app/",
  //   imageSrc: beachShopImg,
  //   bgIcon: BgIcon.ShoppingBag,
  //   accentColour: "cyan-400",
  // },
  {
    title: "Reddit Client",
    technologies: "React, Redux, Reddit JSON API",
    description:
      "Front-end web application using the unofficial JSON Reddit API to recreate a simplified read-only version of the platform, featuring popular subreddits, filters, posts and comments.",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/reddit-client",
      },
      {
        label: "Live",
        href: "https://reddit-atanas.netlify.app/",
      },
    ],
    image: {
      isMobile: true,
      src: redditClientImg,
    },
    bgIcon: BgIcon.Comment,
    accentColour: "sky-300",
  },
  {
    title: "React Calendar",
    technologies: "React, TypeScript, date-fns, GSAP, SCSS",
    description:
      "A sandbox app using date-fns and CSS grid to create a responsive calendar.",
    links: [
      {
        label: "CodeSandbox",
        href: "https://codesandbox.io/s/react-grid-calendar-egcn3f?file=/src/components/calendar/Calendar.tsx",
      },
    ],
    image: {
      isMobile: false,
      src: reactCalendarImg,
    },
    bgIcon: BgIcon.Calendar,
    accentColour: "purple-400",
  },
];
