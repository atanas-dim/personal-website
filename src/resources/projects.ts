import workoutBuilderImg from "../assets/images/atanas.jpg";
import beachShopImg from "../assets/images/project-thumb-beachshop-mobile.jpg";
import redditClientImg from "../assets/images/project-thumb-reddit-mobile.jpg";
import { BgIcon } from "../components/background/Background";

const ARM_FLEX =
  "M11 7C8 11.09 7 22.34 7 22.34C9.9 24.31 13.08 25 15.87 25C18.86 25 21.39 24.21 22.64 23.36C25.64 21.32 25.94 16.71 22.64 15.18C22 14.89 21.26 14.75 20.47 14.75C18.17 14.75 15.5 15.96 14 18.25H13V11.09H15L16 8L11 7Z";
const SHOPPING_BAG =
  "M23 10H21C21 7.2 18.8 5 16 5C13.2 5 11 7.2 11 10H9C7.9 10 7 10.9 7 12V24C7 25.1 7.9 26 9 26H23C24.1 26 25 25.1 25 24V12C25 10.9 24.1 10 23 10Z";

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
