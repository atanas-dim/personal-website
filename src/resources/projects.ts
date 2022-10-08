import workoutBuilderImg from "../assets/images/atanas.jpg";
import beachShopImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import redditClientImg from "../assets/images/project-thumb-reddit-mobile.jpg";

export type ProjectData = {
  title: string;
  codeUrl: string;
  liveUrl: string;
  imageSrc: string;
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Workout Builder Demo",
    codeUrl: "https://www.google.com",
    liveUrl: "https://www.google.com",
    imageSrc: workoutBuilderImg,
  },
  {
    title: "BeachShop",
    codeUrl: "https://www.google.com",
    liveUrl: "https://www.google.com",
    imageSrc: beachShopImg,
  },
  {
    title: "Reddit Client",
    codeUrl: "https://www.reddit.com",
    liveUrl: "https://www.reddit.com",
    imageSrc: redditClientImg,
  },
];
