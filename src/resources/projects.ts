// TODO Create different img exports from Figma for different screens sizes
import workoutBuilderImg from "../assets/images/project-thumb-workouts-mobile.jpg";
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
    codeUrl: "https://github.com/atanas-dim/workout-builder",
    liveUrl: "https://workout-builder.vercel.app/",
    imageSrc: workoutBuilderImg,
    bgIcon: BgIcon.ArmFlex,
  },
  {
    title: "BeachShop",
    codeUrl: "https://github.com/atanas-dim/ecommerce-PERN",
    liveUrl: "https://beachshop.netlify.app/",
    imageSrc: beachShopImg,
    bgIcon: BgIcon.ShoppingBag,
  },
  {
    title: "Reddit Client",
    codeUrl: "https://github.com/atanas-dim/reddit-client",
    liveUrl: "https://reddit-atanas.netlify.app/",
    imageSrc: redditClientImg,
    bgIcon: BgIcon.Comment,
  },
];
