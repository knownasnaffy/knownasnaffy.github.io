import { Button } from '@/components/ui/button'
import {
	Archive,
	ArrowUpRight,
	BookOpen,
	BugIcon,
	Calendar,
	CircleCheck,
	Construction,
	GitFork,
	Link2,
	Scale,
	StarIcon,
	X,
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
	DialogClose,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { cn } from '@/utils'
import { useEffect, useState } from 'react'

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

// TODO: Move this ugly thing to a new file
const headers = new Headers()
import.meta.env.VITE_GITHUB_TOKEN &&
	headers.set('Authorization', 'Bearer ' + import.meta.env.VITE_GITHUB_TOKEN)
const requestOptions = {
	method: 'GET',
	headers: headers,
}

function ProjectCard({
	title,
	tags,
	progress,
	// TODO: Remove status and use github archived option as well as progress percentage to set achieve same functionality. For eg. if progress percentage is 100, status is 'completed'
	status,
	targetRepo,
}: {
	title?: string
	desc?: string
	tags: string[]
	progress: number
	status?: 'archived' | 'wip' | 'completed'
	targetRepo: string
}) {
	const [repo, setRepo] = useState<{
		name: string
		description: string | null
		created_at: string
		stargazers_count: number
		forks: number
		issues: number
		languages: Record<string, any>
		license?: string
		license_url?: string
	}>({
		name: '',
		description: null,
		created_at: '',
		stargazers_count: 0,
		forks: 0,
		issues: 0,
		languages: {},
	})

	useEffect(() => {
		if (!targetRepo) return

		// fetching repo details
		fetch(`https://api.github.com/repos/${targetRepo}`, requestOptions)
			.then(async res => {
				const data = await res.json()

				// fetching languages and there parts in the repo
				const languagesResponse = await fetch(
					data.languages_url,
					requestOptions,
				)
				const languages = await languagesResponse.json()

				// the total of all the numbers in the languages record
				const total = Object.values(languages).reduce(
					(acc, value) => (acc as number) + (value as number),
					0,
				) as number

				// converting the numbers record to percentages record
				const languagePercentages = Object.fromEntries(
					Object.entries(languages).map(([language, percentage]) => [
						language,
						(((percentage as any as number) / total) * 100).toFixed(2),
					]),
				)

				// setting repo details
				setRepo(repo => ({
					...repo,
					name: data.name,
					description: data.description ?? null,
					created_at: new Intl.DateTimeFormat('en-US', {
						month: 'long',
						year: 'numeric',
					}).format(new Date(data.created_at)),
					stargazers_count: data.stargazers_count,
					forks: data.forks,
					issues: data.open_issues_count,
					languages: languagePercentages,
					license: data.license?.name,
					license_url: data.license?.url,
				}))
			})
			.catch(err => console.error(err))
	}, [targetRepo])

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Card className='relative hover:shadow-2xl hover:shadow-background/50 transition-all duration-300 ease-in-out hover:cursor-pointer'>
						<CardHeader>
							<CardTitle className='tracking-tight font-bold'>
								{title}
							</CardTitle>
							<CardDescription>{repo.description}</CardDescription>
							<CardDescription className='inline-flex items-center gap-1'>
								<Calendar className='w-4 h-4' /> Started {repo.created_at}
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
							<DialogDescription>{repo.description}</DialogDescription>
						</div>
						<a href={'https://github.com/' + targetRepo} className='ml-auto'>
							<Button size='sm' variant='outline'>
								View on GitHub
							</Button>
						</a>
						<DialogClose asChild>
							<Button variant='outline' size='sm' className='px-2'>
								<X className='h-5 w-5' />
							</Button>
						</DialogClose>
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
										status === 'completed' && 'text-green-500',
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
											status === 'completed' && '[&_div]:bg-green-500',
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
								<a href={'https://github.com/' + targetRepo + '/#readme'}>
									<Button
										variant='link'
										className='justify-start px-0 h-fit py-0 text-muted-foreground'
									>
										<BookOpen className='w-4 h-4 mr-2' />
										Readme
									</Button>
								</a>
								{repo.license && (
									<a href={repo.license_url}>
										<Button
											variant='link'
											className='justify-start px-0 h-fit py-0 text-muted-foreground'
										>
											<Scale className='w-4 h-4 mr-2' />
											{repo.license}
										</Button>
									</a>
								)}
								<a href={'https://github.com/' + targetRepo + '/stargazers'}>
									<Button
										variant='link'
										className='justify-start px-0 h-fit py-0 text-muted-foreground'
									>
										<StarIcon className='h-4 w-4 mr-2' />
										{repo.stargazers_count}{' '}
										{repo.stargazers_count > 1 ? 'Stars' : 'Star'}
									</Button>
								</a>
								<a href={'https://github.com/' + targetRepo + '/issues'}>
									<Button
										variant='link'
										className='justify-start px-0 h-fit py-0 text-muted-foreground'
									>
										<BugIcon className='h-4 w-4 mr-2' />
										{repo.issues} {repo.issues > 1 ? 'Issues' : 'Issue'}
									</Button>
								</a>
								<a href={'https://github.com/' + targetRepo + '/forks'}>
									<Button
										variant='link'
										className='justify-start px-0 h-fit py-0 text-muted-foreground'
									>
										<GitFork className='h-4 w-4 mr-2' />
										{repo.forks} {repo.forks > 1 ? 'Forks' : 'Fork'}
									</Button>
								</a>
							</div>
							<div className='space-y-3'>
								<h5 className='font-semibold'>Languages:</h5>
								<div className='flex flex-wrap gap-2'>
									{Object.entries(repo.languages).map(
										([language, percentage], index) => (
											<Badge
												key={index}
												variant={index === 0 ? 'default' : 'secondary'}
											>
												{language}: {percentage}%
											</Badge>
										),
									)}
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
