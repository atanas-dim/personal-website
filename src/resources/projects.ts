import workoutBuilderImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import beachShopImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import redditClientImg from "../assets/images/project-thumb-reddit-mobile.jpg";
import { BgIcon } from "../components/background/Background";

export type ProjectData = {
  title: string;
  codeUrl: string;
  liveUrl: string;
  imageSrc: string;
  bgIcon: BgIcon;
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Workout Builder Demo",
    codeUrl: "https://www.google.com",
    liveUrl: "https://www.google.com",
    imageSrc: workoutBuilderImg,
    bgIcon: BgIcon.ArmFlex,
  },
  {
    title: "BeachShop",
    codeUrl: "https://www.google.com",
    liveUrl: "https://www.google.com",
    imageSrc: beachShopImg,
    bgIcon: BgIcon.ShoppingBag,
  },
  {
    title: "Reddit Client",
    codeUrl: "https://www.reddit.com",
    liveUrl: "https://www.reddit.com",
    imageSrc: redditClientImg,
    bgIcon: BgIcon.Comment,
  },
];
