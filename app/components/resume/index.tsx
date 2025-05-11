import EducationList from "./education-list";
import Languages from "./languages";
import ProjectsList from "./projects-list";
import Skills from "./skills";

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
      <Skills />
      <h2 className="">Projects</h2>
      <ProjectsList />
      <h2 className="">Education</h2>
      <EducationList />
      <h2 className="">Languages</h2>
      <Languages />
    </div>
  );
}
