import CoursesSection from "@/components/courses-section";
import { InfoSection } from "../components/info-section";
import { ProjectsSection } from "../components/projects-section";
import { SkillsSection } from "../components/skills-section";
import TemplatesSection from "@/components/templates-section";

export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#4A25EB] to-[#25C6EB] via-primary text-white h-screen overflow-auto md:snap-y md:snap-mandatory overscroll-y-none pb-32">
        <InfoSection />
        <ProjectsSection />
        <SkillsSection />
        {/* My Favorite Templates: Web Backend - Nextjs + Tailwind, Web Frontend - Vite + React + Tailwind + Shadcn + Aceternity */}
        <TemplatesSection />
        <CoursesSection />
        {/* Blog */}
      </div>
    </>
  );
}
