import EducationList from "./education-list";
import Footnote from "./footnote";
import Highlights from "./highlights";
import Languages from "./languages";
import ProjectsList from "./projects-list";
import Skills from "./skills";

export default function Resume({
  mainRef,
}: {
  mainRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      id="main"
      ref={mainRef}
      className="px-6 sm:px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl md:mx-auto prose-h2:mt-9 prose-h2:scroll-m-9"
    >
      <h1 className="">Portfolio</h1>
      <h2 id="highlights" className="mt-6">
        Highlights
      </h2>
      <Highlights />
      <h2 id="skills-and-technologies" className="mt-6">
        Skills & Technologies
      </h2>
      <Skills />
      <h2 id="projects" className="mt-6">
        Projects
      </h2>
      <ProjectsList />
      <h2 id="education" className="mt-6">
        Education
      </h2>
      <EducationList />
      <h2 id="languages" className="mt-6">
        Languages
      </h2>
      <Languages />
      <Footnote />
    </div>
  );
}
