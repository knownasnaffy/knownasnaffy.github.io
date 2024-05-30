import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from './project-card'

export function ProjectsSection() {
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Projects
				</h1>
				<a
					href='https://github.com/knownasnaffy?tab=repositories'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Button className='gap-1' variant='ghost'>
						View More
						<ArrowUpRight className='h-5 w-5' />
					</Button>
				</a>
			</div>
			<div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-8'>
				<ProjectCard
					title='Diary Classic'
					desc='Simple Write-only Diary with TKinter GUI and date and time support'
					tags={['Python', 'Tkinter', 'Native', 'Editor']}
					progress={100}
					status='archived'
					targetRepo='knownasnaffy/diary-classic'
				/>
				<ProjectCard
					title='Inner Ink'
					desc='Diary with Markdown support'
					tags={[
						'Tauri',
						'React',
						'Native',
						'Editor',
						'Rich Text',
						'Tailwind',
						'Typescript',
						'Daisy UI',
					]}
					progress={75}
					status='wip'
					targetRepo='knownasnaffy/inner-ink'
				/>
				<ProjectCard
					title='Portfolio'
					desc='Single-page web app made with my details'
					tags={['React', 'Web', 'Tailwind', 'Typescript', 'Shadcn']}
					progress={90}
					status='wip'
					targetRepo='knownasnaffy/knownasnaffy.github.io'
				/>
			</div>
		</section>
	)
}
