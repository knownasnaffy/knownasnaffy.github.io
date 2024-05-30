import CoursesSection from '@/components/courses'
import { InfoSection } from '../components/info-section'
import { ProjectsSection } from '../components/projects'
import { SkillsSection } from '../components/skills'
import TemplatesSection from '@/components/templates'

export default function HomePage() {
	return (
		<>
			<div className='bg-gradient-to-br from-[#4A25EB] to-[#25C6EB] via-primary text-white h-screen overflow-auto md:snap-y md:snap-mandatory overscroll-y-none pb-32'>
				<InfoSection />
				<ProjectsSection />
				<SkillsSection />
				<TemplatesSection />
				<CoursesSection />
				{/* Blog */}
			</div>
		</>
	)
}
