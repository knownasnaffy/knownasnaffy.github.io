import { Button } from '@/components/ui/button'
import {
	ArrowUpRight,
	BugIcon,
	Calendar,
	ForkliftIcon,
	StarIcon,
} from 'lucide-react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from './ui/dialog'
import { Separator } from './ui/separator'
import { cn } from '@/utils'

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
					stars={1}
					started='Jan 2022'
					tags={['Python', 'Tkinter', 'Native', 'Editor']}
					progress={100}
					status='archived'
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
					status='wip'
				/>
				<ProjectCard
					title='Portfolio'
					desc='Single-page web app made with my details'
					started='27 May 2024'
					stars={1}
					tags={['React', 'Web', 'Tailwind', 'Typescript', 'Shadcn']}
					progress={90}
					status='wip'
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
	status,
}: {
	title?: string
	desc?: string
	started?: string
	stars?: number
	tags: string[]
	progress: number
	status?: 'archived' | 'wip' | 'completed'
}) {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Card className='relative hover:shadow-2xl hover:shadow-background/50 transition-all duration-300 ease-in-out hover:cursor-pointer'>
						<CardHeader>
							<CardTitle className='tracking-tight font-bold'>
								{title}
							</CardTitle>
							<CardDescription>{desc}</CardDescription>
							<CardDescription className='inline-flex items-center gap-1'>
								<Calendar className='w-4 h-4' /> Started {started}
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
				</DialogTrigger>
				<DialogContent className='max-w-xl'>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{desc}</DialogDescription>
					</DialogHeader>
					<div className='border-t pt-4'>
						<div className='grid grid-cols-[1fr_auto] items-center gap-4'>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<StarIcon className='h-4 w-4' />
								<span>{stars}</span>
								<Separator className='h-4' orientation='vertical' />
								<ForkliftIcon className='h-4 w-4' />
								<span>2.5k</span>
								<Separator className='h-4' orientation='vertical' />
								<BugIcon className='h-4 w-4' />
								<span>150</span>
							</div>
							<Button size='sm' variant='outline'>
								View on GitHub
							</Button>
						</div>
					</div>
					<div className='border-t pt-4 flex items-center'>
						<span className='font-semibold mr-2'>Status:</span>{' '}
						{status === 'archived'
							? 'Archived'
							: status === 'completed'
							? 'Completed'
							: 'Work in Progress'}
						<Progress
							value={progress}
							className={cn(
								'w-full max-w-64 ml-auto h-2',
								status === 'archived' && '[&_div]:bg-yellow-500',
								status==='completed' && '[&_div]:bg-green-500'
							)}
						></Progress>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
