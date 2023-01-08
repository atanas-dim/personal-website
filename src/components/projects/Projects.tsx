import React, {
  FC,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useEffect,
  HTMLAttributes,
} from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";

import IPhone14 from "../devices/IPhone14";

import { ProjectData, PROJECTS } from "../../resources/projects";

import { BgIcon } from "../background/Background";
import {
  SECTION,
  Section,
  SECTION_CONTENT,
  SECTION_LABEL_WRAPPER,
  SECTION_LABEL,
} from "../../pages";

type Props = {
  scrollY: MotionValue<number>;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Projects: FC<Props> = ({ scrollY, setBgIcon, setActiveSection }) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        id="projects"
        ref={target}
        className={
          SECTION +
          " mt-16 relative w-full mb-[30vh] scroll-mt-16 md:scroll-mt-0"
        }
      >
        <div className={SECTION_LABEL_WRAPPER}>
          <span className={SECTION_LABEL}>Projects</span>
        </div>

        <div className={SECTION_CONTENT}>
          {PROJECTS.map((project, index) => {
            return (
              <Project
                key={"container-" + index}
                index={index}
                scrollY={scrollY}
                data={project}
                setBgIcon={setBgIcon}
                setActiveSection={setActiveSection}
              />
            );
          })}
        </div>
      </motion.section>
    </>
  );
};

export default Projects;

type ProjectProps = {
  index: number;
  scrollY: MotionValue<number>;
  data: ProjectData;
  setBgIcon: Dispatch<SetStateAction<BgIcon>>;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

const Project: FC<ProjectProps> = ({
  index,
  scrollY,
  data,
  setBgIcon,
  setActiveSection,
}) => {
  const target = useRef<HTMLDivElement>(null);
  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    // Need to set this on mount to fix blank sections
    const scroller = document.getElementById("scroll-container");

    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setFullOpacityScrollTop(
        (scroller?.scrollTop ?? 0) +
          (target.current?.getBoundingClientRect()?.top ?? 0)
      );
    };
    // Need to set this on mount to fix stuck sections
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () => {
      window.removeEventListener("resize", updateValuesFromContainerRect);
    };
  }, []);

  const scale = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight / 1.5,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 3,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0.7, 1, 1, 1, 0.7]
  );

  const opacity = useTransform(
    scrollY,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight / 1.5,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 3,
      fullOpacityScrollTop + containerHeight / 2,
    ],
    // Into these values:
    [0, 0.8, 1, 0.8, 0]
  );

  const scrollSpring = useSpring(scrollY, {
    damping: 15,
    mass: 2,
    stiffness: 100,
    bounce: 0.0015,
  });

  const imageScrollSpring = useSpring(scrollY, {
    damping: 15,
    mass: 2,
    stiffness: 70,
    bounce: 0.0015,
  });

  const imageTranslateY = useTransform(
    imageScrollSpring,
    // Map from these values:
    [
      // fullOpacityScrollTop - containerHeight,
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 2,
      // fullOpacityScrollTop + containerHeight,
    ],
    // Into these values:
    ["64px", "0px", "-64px"]
  );

  const textTranslateY = useTransform(
    scrollSpring,
    // Map from these values:
    [
      fullOpacityScrollTop - containerHeight,
      fullOpacityScrollTop - containerHeight / 4,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 4,
      fullOpacityScrollTop + containerHeight,
    ],
    // Into these values:
    ["32px", "16px", "0px", "-16px", "-32px"]
  );

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      className={`w-full h-screen min-h-[600px] flex flex-col ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } justify-center items-center`}
    >
      <motion.div
        style={{
          translateY: imageTranslateY,
          opacity,
          scale,
        }}
        className={`max-w-sm mb-16 md:mb-0 md:mr-16 ${
          isEven ? "md:mr-0" : "md:mr-16"
        } origin-center flex justify-center items-center opacity-0`}
      >
        {/* TODO Add alt */}
        {data.image.isMobile ? (
          <IPhone14 imageSrc={data.image.src} />
        ) : (
          <img
            src={data.image.src}
            alt=""
            className="w-full h-fit rounded-2xl max-w-[90%] md:max-w-none"
          />
        )}
      </motion.div>
      <motion.div
        style={{
          translateY: textTranslateY,
          opacity,
        }}
        className={`origin-top w-full md:w-1/2 px-8 md:px-0 md:self-stretch flex flex-col justify-center ${
          isEven ? "md:mr-16" : "md:mr-0"
        }`}
      >
        <motion.h3
          onViewportEnter={() => {
            setBgIcon(data.bgIcon);
            index === 0 && setActiveSection(Section.Projects);
          }}
          className="text-2xl md:text-4xl font-bold mb-2"
        >
          {data.title}
        </motion.h3>
        <span
          className={`text-${data.accentColour} text-md md:text-xl font-bold block mb-4 leading-tight`}
        >
          {data.technologies}
        </span>
        <p className="mb-4 leading-tight">{data.description}</p>
        <div className="flex">
          {data.links.map((link, index) => {
            return (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mr-2 px-3 py-2 hover:bg-zinc-700 active:bg-zinc-600 w-fit font-bold rounded-xl bg-zinc-800 flex items-center justify-center"
              >
                <span>{link.label} </span>
                <ExternalLinkIcon className="inline-block scale-75" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExternalLinkIcon: FC<HTMLAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.4615 3.15381V5.15381H18.0515L8.22155 14.9838L9.63155 16.3938L19.4615 6.56381V10.1538H21.4615V3.15381M19.4615 19.1538H5.46155V5.15381H12.4615V3.15381H5.46155C4.35155 3.15381 3.46155 4.05381 3.46155 5.15381V19.1538C3.46155 19.6842 3.67226 20.1929 4.04733 20.568C4.42241 20.9431 4.93111 21.1538 5.46155 21.1538H19.4615C19.992 21.1538 20.5007 20.9431 20.8758 20.568C21.2508 20.1929 21.4615 19.6842 21.4615 19.1538V12.1538H19.4615V19.1538Z"
        fill="white"
      />
    </svg>
  );
};
