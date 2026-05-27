import type { IconType } from "react-icons";
import {
  SiFlutter,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type SkillItem = {
  label: string;
  Icon: IconType;
  color?: string;
};

export const skills: SkillItem[] = [
  { label: "Next.js", Icon: SiNextdotjs, color: "#f4f4f5" },
  { label: "React", Icon: SiReact, color: "#61dafb" },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
  { label: "Node.js", Icon: SiNodedotjs, color: "#68a063" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  { label: "Flutter", Icon: SiFlutter, color: "#54c5f8" },
  { label: "Swagger", Icon: SiSwagger, color: "#85ea2d" },
  { label: "GitHub", Icon: SiGithub, color: "#f4f4f5" },
  { label: "Framer Motion", Icon: SiFramer, color: "#a855f7" },
];

export const skillGroups: Record<string, SkillItem[]> = {
  Frontend: [
    { label: "Next.js", Icon: SiNextdotjs, color: "#f4f4f5" },
    { label: "React", Icon: SiReact, color: "#61dafb" },
    { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
    { label: "Framer Motion", Icon: SiFramer, color: "#a855f7" },
  ],
  Backend: [
    { label: "Node.js", Icon: SiNodedotjs, color: "#68a063" },
    { label: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  ],
  Tools: [
    { label: "GitHub", Icon: SiGithub, color: "#f4f4f5" },
    { label: "Swagger", Icon: SiSwagger, color: "#85ea2d" },
    { label: "Flutter", Icon: SiFlutter, color: "#54c5f8" },
  ],
};
