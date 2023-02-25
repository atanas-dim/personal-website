import React, { ReactNode } from "react";
import GitHubIcon from "../components/icons/GitHub";
import InstagramIcon from "../components/icons/Instagram";
import LinkedInIcon from "../components/icons/LinkedIn";
import MailIcon from "../components/icons/Mail";

type SocialLink = {
  icon: ReactNode;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <MailIcon />,
    href: "mailto:hi.atanasdim@gmail.com",
  },
  {
    icon: <GitHubIcon />,
    href: "https://github.com/atanas-dim",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/atanas.dim/",
  },
  {
    icon: <LinkedInIcon />,
    href: "https://www.linkedin.com/in/atanas-dim/",
  },
];
