import React from "react";
import { cn } from "~/lib/utils";

const skills = [
  {
    groupName: "Frontend",
    primary: ["React", "Tailwind", "Typescript"],
    secondary: ["Next.js", "Redux", "Zustand", "HTML", "CSS"],
  },
  {
    groupName: "Backend",
    primary: ["Django", "Node.js"],
    secondary: ["REST APIs", "JWT", "OAuth"],
  },
  {
    groupName: "Database",
    primary: ["PostgreSQL", "MongoDB"],
    secondary: ["SQLite"],
  },
  {
    groupName: "Dev Tools",
    primary: ["Eslint", "Git", "Github", "CI/CD"],
    secondary: ["Github Actions", "Bun", "Pnpm"],
  },
  {
    groupName: "Hosting & Deployment",
    primary: ["GitHub Pages", "Vercel"],
    secondary: ["Netlify", "Domain Setup"],
  },
  {
    groupName: "UI/UX Design",
    primary: ["Figma", "Responsive Designs", "SEO"],
    secondary: ["Accessibility Best Practices"],
  },
  {
    groupName: "Cross-Platform & Misc",
    primary: [],
    secondary: [
      "Flutter",
      "Tauri",
      "Tkinter",
      "Linux CLI & Bash Scripting",
      "Neovim",
    ],
  },
];

export default function Skills() {
  return (
    <>
      {skills.map((group) => (
        <React.Fragment key={group.groupName}>
          <h4 className="text-foreground">{group.groupName}:</h4>
          <span className="flex flex-wrap gap-2">
            {group.primary.map((item) => (
              <React.Fragment key={item}>
                <span className="px-2 py-1 text-xs rounded-sm bg-foreground text-primary-foreground">
                  {item}
                </span>
                <span className="sr-only">{", "}</span>
              </React.Fragment>
            ))}
            {group.secondary.map((item, index, items) => (
              <React.Fragment key={item}>
                <span className="px-2 py-1 text-xs rounded-sm border text-secondary-foreground">
                  {item}
                </span>
                {index === items.length - 1 && (
                  <span className={cn("sr-only")}>{", "}</span>
                )}
              </React.Fragment>
            ))}
          </span>
        </React.Fragment>
      ))}
    </>
  );
}
