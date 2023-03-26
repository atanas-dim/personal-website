export enum Section {
  Hero,
  Projects,
  Stack,
  Experience,
}

type SectionDef = {
  title: string;
  id: string;
};

export const SECTIONS: { [key in Section]: SectionDef } = {
  [Section.Hero]: {
    title: "Start",
    id: "start",
  },
  [Section.Projects]: {
    title: "Projects",
    id: "projects",
  },
  [Section.Stack]: {
    title: "Stack",
    id: "stack",
  },
  [Section.Experience]: {
    title: "Experience",
    id: "experience",
  },
};
