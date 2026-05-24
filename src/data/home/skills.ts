export type Skill = {
  name: string;
  category: string;
  experience: number;
  highlights: string[];
  href?: string;
};

export const skills: Skill[] = [
  {
    name: "Frontend Engineering",
    category: "Web Development",
    experience: 4,
    highlights: [
      "Complex UI state, forms, async data",
      "Responsive layouts, accessibility",
    ],
  },
  {
    name: "Type-Safe Programming",
    category: "Programming",
    experience: 3,
    highlights: [
      "Static typing, generics, interfaces",
      "Designing safe, predictable APIs",
    ],
  },
  {
    name: "Backend & API Development",
    category: "Backend",
    experience: 3,
    highlights: ["REST APIs, auth flows", "Database modeling, validation"],
  },
  {
    name: "Application Architecture",
    category: "Engineering",
    experience: 3,
    highlights: [
      "Structuring maintainable codebases",
      "Performance-aware design",
    ],
  },
  {
    name: "System Tooling",
    category: "Systems",
    experience: 2,
    highlights: [
      "CLI utilities and desktop integrations",
      "Process control, IPC workflows",
    ],
  },
  {
    name: "Automation & Scripting",
    category: "Systems",
    experience: 2,
    highlights: [
      "Shell scripting and workflow automation",
      "Developer productivity tooling",
    ],
  },
];
