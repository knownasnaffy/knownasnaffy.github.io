import EducationList from "./education-list";
import ProjectsList from "./projects-list";

export default function Resume() {
  return (
    <div className="px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl md:mx-auto">
      <h1 className="">Portfolio</h1>
      <h2 id="about-heading" className="mt-6">
        Professional Summary
      </h2>
      <p className="">
        <ul>
          <li>
            Self-taught <b>web developer</b> and B.Tech CSE student with
            <b> 2+ years</b> of hands-on experience building
            <b> full-stack applications</b> and
            <b> desktop software</b>.
          </li>
          <li>
            Strong foundation in <b>React</b>, Next.js, and
            <b> Tailwind</b>, with a growing interest in clean design systems,
            CI/CD workflows, and developer tooling.
          </li>
          <li>
            Currently maintaining multiple personal and academic projects while
            working part-time as a freelance developer.
          </li>
        </ul>
      </p>
      <h2 className="">Skills & Technologies</h2>
      <ul className="">
        <li>
          <b>Frontend:</b> React, Next.js, Tailwind CSS, Typescript
        </li>
        <li>
          <b>Backend:</b> Node.js, REST APIs, JWT, OAuth
        </li>
        <li>
          <b>Database:</b> PostgreSQL, MongoDB, SQLite
        </li>
        <li>
          <b>State Management:</b> Redux, Zustand
        </li>
        <li>
          <b>Tooling:</b> Bun, ESLint, Git, Github, GitHub Actions
        </li>
        <li>
          <b>Deployment:</b> GitHub Pages, Vercel, Domain Management
        </li>
        <li>
          <b>Design:</b> Figma, Responsive Designs, Accessibility Best
          Practices, SEO
        </li>
        <li>
          <b>Other:</b> Shell, Python, Flutter, Tauri
        </li>
      </ul>
      <h2 className="">Projects</h2>
      <ProjectsList />
      <h2 className="">Education</h2>
      <EducationList />
    </div>
  );
}
