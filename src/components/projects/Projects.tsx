import React, {
  FC,
  useRef,
  useState,
  useLayoutEffect,
  HTMLAttributes,
} from "react";
import { motion, useTransform, useSpring, useScroll } from "framer-motion";

import IPhone14 from "../devices/IPhone14";

import { ProjectData, PROJECTS } from "../../resources/projects";

import {
  SECTION,
  SECTION_CONTENT,
  SECTION_LABEL_WRAPPER,
  SECTION_LABEL,
} from "../../pages";

import useStore from "../../hooks/useStore";
import useScrollContainer from "../../hooks/useScrollContainer";
import { Section } from "../../resources/sections";

const Projects: FC = () => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.section
        id="projects"
        ref={target}
        className={
          SECTION +
          " h-auto md:mb-60 mt-16 relative w-full scroll-mt-16 md:scroll-mt-0"
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
                data={project}
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
  data: ProjectData;
};

const Project: FC<ProjectProps> = ({ index, data }) => {
  const target = useRef<HTMLDivElement>(null);
  const [fullOpacityScrollTop, setFullOpacityScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const { setBgIcon, setActiveSection } = useStore();
  const { scrollerRef } = useScrollContainer();

  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const updateValuesFromContainerRect = () => {
      setContainerHeight(target.current?.getBoundingClientRect()?.height ?? 0);
      setFullOpacityScrollTop(
        (scrollerRef?.current?.scrollTop ?? 0) +
          (target.current?.getBoundingClientRect()?.top ?? 0)
      );
    };
    // Need to set this on mount to fix stuck sections
    updateValuesFromContainerRect();
    window.addEventListener("resize", updateValuesFromContainerRect);
    return () => {
      window.removeEventListener("resize", updateValuesFromContainerRect);
    };
  }, [scrollerRef]);

  const { scrollY } = useScroll({
    container: scrollerRef,
  });

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
      fullOpacityScrollTop - containerHeight / 2,
      fullOpacityScrollTop,
      fullOpacityScrollTop + containerHeight / 2,
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

  if (!scrollerRef) return null;

  return (
    <motion.div
      id={"project-" + index}
      ref={target}
      className={`w-full h-[110vh] md:h-screen min-h-[900px] max-h-[1000px] px-6 md:px-0 flex flex-col ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } justify-center items-center gap-8`}
    >
      <motion.div
        style={{
          translateY: imageTranslateY,
        }}
        className="mb-16 md:mb-0 origin-center flex justify-center items-center"
      >
        {data.image.isMobile ? (
          <IPhone14 imageSrc={data.image.src} />
        ) : (
          <img
            src={data.image.src}
            alt=""
            className="w-full h-auto rounded-2xl min-w-[50%] md:w-[30vw] lg:w-full max-w-[400px]"
          />
        )}
      </motion.div>
      <motion.div
        style={{
          translateY: textTranslateY,
        }}
        className={`
        h-fit w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center
        bg-white dark:bg-zinc-900
        border border-solid border-zinc-200 rounded-2xl dark:border-zinc-800
        colour-transition
        `}
      >
        <motion.h3
          onViewportEnter={() => {
            setBgIcon(data.bgIcon);
            if (index === 0) setActiveSection(Section.Projects);
          }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          {data.title}
        </motion.h3>
        <span
          className={`${data.textStyle} text-md md:text-xl font-bold block mb-4 leading-tight`}
        >
          {data.technologies}
        </span>
        <p className="mb-4 leading-tight">{data.description}</p>
        <div className="flex">
          {data.links.map((link, linkIndex) => {
            return (
              <a
                key={"project-" + index + "-link-" + linkIndex}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`mr-2 px-3 py-2 w-fit font-bold rounded-xl ${data.buttonStyle} flex items-center justify-center`}
              >
                <span>{link.label} </span>
                <ExternalLinkIcon className="inline-block scale-75 fill-zinc-900 dark:fill-white" />
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
      <path d="M14.4615 3.15381V5.15381H18.0515L8.22155 14.9838L9.63155 16.3938L19.4615 6.56381V10.1538H21.4615V3.15381M19.4615 19.1538H5.46155V5.15381H12.4615V3.15381H5.46155C4.35155 3.15381 3.46155 4.05381 3.46155 5.15381V19.1538C3.46155 19.6842 3.67226 20.1929 4.04733 20.568C4.42241 20.9431 4.93111 21.1538 5.46155 21.1538H19.4615C19.992 21.1538 20.5007 20.9431 20.8758 20.568C21.2508 20.1929 21.4615 19.6842 21.4615 19.1538V12.1538H19.4615V19.1538Z" />
    </svg>
  );
};
