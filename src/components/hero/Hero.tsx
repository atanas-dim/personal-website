import React, {
  type FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  HTMLAttributes,
} from "react";
import {
  ForwardRefComponent,
  motion,
  SVGMotionProps,
  useAnimationControls,
} from "framer-motion";

import { PERFORATED_BG } from "../../styles/constants";

import photo from "../../assets/images/atanas.jpg";

import { Section } from "../../pages";

type Props = {
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Hero: FC<Props> = ({ setActiveSection }) => {
  const [isInView, setIsInView] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.set({ opacity: 0 });
      controls.start({
        opacity: 1,
        transition: { duration: 0.5, delay: 0.75 },
      });
      controls.start({
        x: [
          0, 100, -260, 40, -80, -290, -40, 30, 120, 100, -260, -100, 50, -50,
        ],
        y: [
          0, 100, -220, -40, 40, -70, -180, 30, 340, 300, -360, -100, 50, -50,
        ],
        scaleX: [
          0.7, 1.1, 1.3, 1.2, 1.1, 1.6, 0.9, 1.2, 0.9, 1.2, 1, 1.1, 0.9, 1.3,
        ],
        scaleY: [
          0.7, 1.3, 1.1, 0.6, 1.4, 1.1, 1, 1.3, 0.9, 1, 1.2, 1.4, 0.9, 1.3,
        ],
        transition: {
          duration: 60,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.75,
        },
      });
    } else {
      controls.stop();
      controls.set({ opacity: 0, x: 0, y: 0, scaleX: 0.7, scaleY: 0.7 });
    }
  }, [isInView]);

  return (
    <motion.div
      id="start"
      onViewportEnter={() => setActiveSection(Section.Hero)}
      className="relative w-full h-[calc(100%_-_64px)] flex justify-center items-center flex-col z-50"
    >
      <div className="w-full absolute top-0 left-0 -z-20 h-full overflow-hidden hero-mask flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
          className=" origin-center w-[100vmin] h-[100vmin] bg-radial-gradient-pink bg-no-repeat bg-center bg-100vmin "
        />
      </div>
      <div
        className={`absolute -z-10 top-0 left-0 w-full h-full ${PERFORATED_BG} bg-left-bottom`}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
              delayChildren: 0.5,
              ease: "backOut",
            },
          },
        }}
        initial="hidden"
        animate="show"
        className=" flex justify-center items-center flex-col"
      >
        <motion.img
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            show: { opacity: 1, scale: 1 },
          }}
          src={photo}
          alt="Atanas' photo"
          width={160}
          height={160}
          className="border-2 border-solid border-white rounded-full mb-4"
        />
        <motion.h1
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
          className="text-4xl md:text-6xl font-bold"
        >
          Hi, <span className="text-blue-400">I'm Atanas</span>
        </motion.h1>
        <motion.h2
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          <span className="text-cyan-400">React</span> Developer
        </motion.h2>
        <div className="flex">
          {SOCIAL_LINKS.map(({ icon, href }, index) => {
            return (
              <motion.a
                key={"social-link-" + index}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mr-2 last-of-type:mr-0"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 },
                }}
              >
                {icon}
              </motion.a>
            );
          })}
        </div>

        <ArrowDown className="fill-zinc-400 absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </motion.div>
    </motion.div>
  );
};

export default Hero;

const ArrowDown: FC<
  HTMLAttributes<SVGSVGElement> & SVGMotionProps<SVGSVGElement>
> = (props) => {
  return (
    <motion.svg
      width="28"
      height="33"
      viewBox="0 0 28 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.15,
            staggerDirection: -1,
            delayChildren: 0.5,
            ease: "backOut",
          },
        },
      }}
      {...props}
    >
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.974121 21.0943L3.02594 18.9057L14 29.1939L24.9741 18.9057L27.0259 21.0943L14 33.3061L0.974121 21.0943Z"
      />
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 11H8V8H20V11Z"
      />
      <motion.path
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3.5H8V0.5H20V3.5Z"
      />
    </motion.svg>
  );
};

const MailIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12V36C4 38.2 5.8 40 8 40H40C42.2 40 44 38.2 44 36V12ZM40 12L24 22L8 12H40ZM40 36H8V16L24 26L40 16V36Z"
        fill="white"
      />
    </svg>
  );
};

const GitHubIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24 4C21.3736 4 18.7728 4.51732 16.3463 5.52241C13.9198 6.5275 11.715 8.00069 9.85786 9.85786C6.10714 13.6086 4 18.6957 4 24C4 32.84 9.74 40.34 17.68 43C18.68 43.16 19 42.54 19 42C19 41.54 19 40.28 19 38.62C13.46 39.82 12.28 35.94 12.28 35.94C11.36 33.62 10.06 33 10.06 33C8.24 31.76 10.2 31.8 10.2 31.8C12.2 31.94 13.26 33.86 13.26 33.86C15 36.9 17.94 36 19.08 35.52C19.26 34.22 19.78 33.34 20.34 32.84C15.9 32.34 11.24 30.62 11.24 23C11.24 20.78 12 19 13.3 17.58C13.1 17.08 12.4 15 13.5 12.3C13.5 12.3 15.18 11.76 19 14.34C20.58 13.9 22.3 13.68 24 13.68C25.7 13.68 27.42 13.9 29 14.34C32.82 11.76 34.5 12.3 34.5 12.3C35.6 15 34.9 17.08 34.7 17.58C36 19 36.76 20.78 36.76 23C36.76 30.64 32.08 32.32 27.62 32.82C28.34 33.44 29 34.66 29 36.52C29 39.2 29 41.36 29 42C29 42.54 29.32 43.18 30.34 43C38.28 40.32 44 32.84 44 24C44 21.3736 43.4827 18.7728 42.4776 16.3463C41.4725 13.9198 39.9993 11.715 38.1421 9.85786C36.285 8.00069 34.0802 6.5275 31.6537 5.52241C29.2272 4.51732 26.6264 4 24 4Z"
        fill="white"
      />
    </svg>
  );
};

const InstagramIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.6 4H32.4C38.8 4 44 9.2 44 15.6V32.4C44 35.4765 42.7779 38.427 40.6024 40.6024C38.427 42.7779 35.4765 44 32.4 44H15.6C9.2 44 4 38.8 4 32.4V15.6C4 12.5235 5.22214 9.57298 7.39756 7.39756C9.57298 5.22214 12.5235 4 15.6 4ZM15.2 8C13.2904 8 11.4591 8.75857 10.1088 10.1088C8.75857 11.4591 8 13.2904 8 15.2V32.8C8 36.78 11.22 40 15.2 40H32.8C34.7096 40 36.5409 39.2414 37.8912 37.8912C39.2414 36.5409 40 34.7096 40 32.8V15.2C40 11.22 36.78 8 32.8 8H15.2ZM34.5 11C35.163 11 35.7989 11.2634 36.2678 11.7322C36.7366 12.2011 37 12.837 37 13.5C37 14.163 36.7366 14.7989 36.2678 15.2678C35.7989 15.7366 35.163 16 34.5 16C33.837 16 33.2011 15.7366 32.7322 15.2678C32.2634 14.7989 32 14.163 32 13.5C32 12.837 32.2634 12.2011 32.7322 11.7322C33.2011 11.2634 33.837 11 34.5 11ZM24 14C26.6522 14 29.1957 15.0536 31.0711 16.9289C32.9464 18.8043 34 21.3478 34 24C34 26.6522 32.9464 29.1957 31.0711 31.0711C29.1957 32.9464 26.6522 34 24 34C21.3478 34 18.8043 32.9464 16.9289 31.0711C15.0536 29.1957 14 26.6522 14 24C14 21.3478 15.0536 18.8043 16.9289 16.9289C18.8043 15.0536 21.3478 14 24 14ZM24 18C22.4087 18 20.8826 18.6321 19.7574 19.7574C18.6321 20.8826 18 22.4087 18 24C18 25.5913 18.6321 27.1174 19.7574 28.2426C20.8826 29.3679 22.4087 30 24 30C25.5913 30 27.1174 29.3679 28.2426 28.2426C29.3679 27.1174 30 25.5913 30 24C30 22.4087 29.3679 20.8826 28.2426 19.7574C27.1174 18.6321 25.5913 18 24 18Z"
        fill="white"
      />
    </svg>
  );
};

const LinkedIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M38 6C39.0609 6 40.0783 6.42143 40.8284 7.17157C41.5786 7.92172 42 8.93913 42 10V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H38ZM37 37V26.4C37 24.6708 36.3131 23.0124 35.0903 21.7897C33.8676 20.5669 32.2092 19.88 30.48 19.88C28.78 19.88 26.8 20.92 25.84 22.48V20.26H20.26V37H25.84V27.14C25.84 25.6 27.08 24.34 28.62 24.34C29.3626 24.34 30.0748 24.635 30.5999 25.1601C31.125 25.6852 31.42 26.3974 31.42 27.14V37H37ZM13.76 17.12C14.6511 17.12 15.5058 16.766 16.1359 16.1359C16.766 15.5058 17.12 14.6511 17.12 13.76C17.12 11.9 15.62 10.38 13.76 10.38C12.8636 10.38 12.0039 10.7361 11.37 11.37C10.7361 12.0039 10.38 12.8636 10.38 13.76C10.38 15.62 11.9 17.12 13.76 17.12ZM16.54 37V20.26H11V37H16.54Z"
        fill="white"
      />
    </svg>
  );
};

const SOCIAL_LINKS = [
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
    icon: <LinkedIcon />,
    href: "https://www.linkedin.com/in/atanas-dim/",
  },
];
