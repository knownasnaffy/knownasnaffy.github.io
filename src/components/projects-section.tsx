import { Button } from '@/components/ui/button'
import {
	Archive,
	ArrowUpRight,
	BookOpen,
	BugIcon,
	Calendar,
	CircleCheck,
	Construction,
	ForkliftIcon,
	GitFork,
	Link2,
	Scale,
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
				<DialogContent className='max-w-3xl' closable={false}>
					<DialogHeader className='flex-row gap-4 items-center'>
						<img
							src='https://github.com/knownasnaffy/inner-ink/blob/main/app/frontend/public/logo.png?raw=true'
							alt='inner ink'
							className='h-10'
						/>
						<div>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{desc}</DialogDescription>
						</div>
						<a href='#' className='ml-auto'>
							<Button size='sm' variant='outline'>
								View on GitHub
							</Button>
						</a>
					</DialogHeader>
					<Separator />
					<div className='flex gap-4'>
						<div className='grow space-y-4'></div>
						<Separator orientation='vertical' />
						<div className='space-y-4 w-64'>
							<div className='flex flex-col gap-2'>
								<span
									className={cn(
										'flex items-center gap-2 text-primary [&_svg]:w-4 [&_svg]:h-4',
										status === 'archived' && 'text-yellow-500',
										status === 'completed' && 'text-green-500'
									)}
								>
									{status === 'archived' ? (
										<Archive />
									) : status === 'completed' ? (
										<CircleCheck />
									) : (
										<Construction />
									)}
									<Progress
										value={progress}
										className={cn(
											'w-full h-2',
											status === 'archived' && '[&_div]:bg-yellow-500',
											status === 'completed' && '[&_div]:bg-green-500'
										)}
									/>
								</span>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0'
								>
									<Link2 className='w-4 h-4 mr-2' />
									inner-ink.tk
								</Button>
								<Button
									variant='link'
									className='justify-start text-muted-foreground px-0 h-fit py-0'
								>
									<Scale className='w-4 h-4 mr-2' />
									MIT
								</Button>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0 text-muted-foreground'
								>
									<BookOpen className='w-4 h-4 mr-2' />
									Readme
								</Button>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0 text-muted-foreground'
								>
									<StarIcon className='h-4 w-4 mr-2' />{stars} Star
								</Button>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0 text-muted-foreground'
								>
									<ForkliftIcon className='h-4 w-4 mr-2' />
									12 Pull Requests
								</Button>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0 text-muted-foreground'
								>
									<BugIcon className='h-4 w-4 mr-2' />1 Issue
								</Button>
								<Button
									variant='link'
									className='justify-start px-0 h-fit py-0 text-muted-foreground'
								>
									<GitFork className='h-4 w-4 mr-2' />2 Forks
								</Button>
							</div>
							<div className='space-y-3'>
								<h5 className='font-semibold'>Languages:</h5>
								<div className='flex flex-wrap gap-2'>
									<Badge variant='secondary'>Typescript: 75%</Badge>
									<Badge variant='secondary'>HTML: 1%</Badge>
									<Badge variant='secondary'>CSS: 1%</Badge>
									<Badge variant='secondary'>Javascript: 1%</Badge>
								</div>
							</div>
							<div className='space-y-3'>
								<h5 className='font-semibold'>Tags:</h5>
								<div className='flex flex-wrap gap-2'>
									<Badge variant='secondary'>React</Badge>
									<Badge variant='secondary'>Typescript</Badge>
									<Badge variant='secondary'>Tailwind</Badge>
									<Badge variant='secondary'>Daisy UI</Badge>
									<Badge variant='secondary'>Desktop App</Badge>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
