import { InfoSection } from "../components/info-section";
import { ProjectsSection } from "../components/projects-section";
import { SkillsSection } from "../components/skills-section";

export default function HomePage() {
  return (
    <>
      <div className="relative bg-gradient-to-br from-[#4A25EB] to-[#25C6EB] via-primary text-white h-screen overflow-auto snap-y snap-mandatory overscroll-y-none">
        <InfoSection />
        <ProjectsSection />
        <SkillsSection />
      </div>
    </>
  );
}
