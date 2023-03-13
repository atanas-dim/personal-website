// import workoutBuilderImg from "../assets/images/workouts-mobile.jpg";
// import beachShopImg from "../assets/images/beachshop-mobile.jpg";
import redditClientImg from "../assets/images/reddit-mobile.jpg";
import reactCalendarImg from "../assets/images/react-calendar.jpg";
import mapImg from "../assets/images/mapbox-mobile.jpg";

import { BgIcon } from "../components/background/Background";

export type ProjectData = {
  title: string;
  technologies: string;
  description?: string;
  links: { href: string; label: string }[];
  image: {
    isMobile?: boolean;
    src: string;
  };
  bgIcon: BgIcon;
  textStyle: string;
  buttonStyle: string;
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Searching Mapbox",
    technologies: "ReactJS, SASS, Mapbox GL",
    description:
      "Using Mapbox GL API to search for nearby places. Custom features include search bar, theme toggler, collapsible list of nearby places.",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/searching-mapbox",
      },
      {
        label: "Live",
        href: "https://searching-mapbox.netlify.app/",
      },
    ],
    image: {
      isMobile: true,
      src: mapImg,
    },
    bgIcon: BgIcon.Map,
    textStyle: "text-sky-500 dark:text-sky-400",
    buttonStyle: "bg-sky-300 dark:bg-sky-600",
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
    textStyle: "text-cyan-500 dark:text-cyan-300",
    buttonStyle: "bg-cyan-300 dark:bg-cyan-500",
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
      src: reactCalendarImg,
    },
    bgIcon: BgIcon.Calendar,
    textStyle: "text-purple-500 dark:text-purple-400",
    buttonStyle: "bg-purple-300 dark:bg-purple-500",
  },
];
