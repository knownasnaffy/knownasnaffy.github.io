const skills = [
  {
    groupName: "Frontend",
    primary: ["React", "Tailwind", "Typescript"],
    secondary: ["Next.js", "Redux", "Zustand", "HTML", "CSS"],
  },
  {
    groupName: "Backend",
    primary: ["Django", "REST APIs", "JWT", "OAuth"],
    secondary: ["Node.js"],
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
      "NeoVim",
    ],
  },
];

export default function Skills() {
  return (
    <>
      {skills.map((group) => (
        <>
          <h4>{group.groupName}:</h4>
          <span className="flex flex-wrap gap-2">
            {group.primary.map((item) => (
              <span className="px-2 py-1 text-xs rounded-sm bg-white text-black">
                {item}
              </span>
            ))}
            {group.secondary.map((item) => (
              <span className="px-2 py-1 text-xs rounded-sm border">
                {item}
              </span>
            ))}
          </span>
        </>
      ))}
    </>
  );
}
