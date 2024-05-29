import { Button } from '@/components/ui/button'
import { ArrowUpRight, Calendar, Star } from 'lucide-react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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
				{/* IDEA: When the user hovers over the card, a popup bubble will appear on the progressbar aligned to the bottom and animating in from the left */}
				{/* IDEA: Clicking the card will open a full screen modal with more details, icons, histroy and whatnot */}
				<ProjectCard
					title='Diary Classic'
					desc='Simple Write-only Diary with TKinter GUI and date and time support'
					started='Jan 2022'
					stars={1}
					tags={['Python', 'Tkinter', 'Native', 'Editor']}
					progress={100}
				/>
				<ProjectCard
					title='Inner Ink'
					desc='Diary with Markdown support'
					started='April 2023'
					stars={1}
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
				/>
				<ProjectCard
					title='Portfolio'
					desc='Single-page web app made with my details'
					started='27 May 2024'
					stars={1}
					tags={['React', 'Web', 'Tailwind', 'Typescript', 'Shadcn']}
					progress={90}
				/>
			</div>
		</section>
	)
}

function ProjectCard({
	title,
	desc,
	started,
	stars,
	tags,
	progress,
}: {
	title: string
	desc: string
	started: string
	stars: number
	tags: string[]
	progress: number
}) {
	return (
		<>
			<Card className='relative hover:shadow-2xl hover:shadow-background/50 transition-all duration-300 ease-in-out'>
				<CardHeader>
					<CardTitle className='tracking-tight font-bold'>{title}</CardTitle>
					<CardDescription>{desc}</CardDescription>
					<CardDescription className='inline-flex flex-wrap gap-2'>
						<span className='inline-flex items-center gap-1'>
							<Calendar className='w-4 h-4' /> Started {started}
						</span>
						<span className='inline-flex items-center gap-1'>
							<Star className='w-4 h-4' /> {stars} Star(s)
						</span>
					</CardDescription>
				</CardHeader>
				<CardFooter className='flex flex-wrap gap-2 mb-2'>
					{tags.map(tag => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</CardFooter>
				<Progress
					value={progress}
					className='rounded-t-none h-2 absolute bottom-0'
				/>
			</Card>
		</>
	)
}
