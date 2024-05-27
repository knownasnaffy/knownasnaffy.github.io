import { InfoSection } from "../components/info-section";
import { ProjectsSection } from "../components/projects-section";
import { SkillsSection } from "../components/skills-section";

export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#4A25EB] to-[#25C6EB] via-primary text-white h-screen overflow-auto md:snap-y md:snap-mandatory overscroll-y-none">
        <InfoSection />
        <ProjectsSection />
        <SkillsSection />
        {/* My Favorite Templates: Web Backend - Nextjs + Tailwind, Web Frontend - Vite + React + Tailwind + Shadcn + Aceternity */}
        {/* Qualification: 10th CBSE - 86.3% (smiling face in card), 12th CBSE - 61.2% (a bit sad face in card), B.Tech in CSE - Work in progress (Suitable icon) */}
        {/* Blog */}
      </div>
    </>
  );
}
