import { Button } from '@/components/ui/button'
import {
	Archive,
	BookOpen,
	BugIcon,
	Calendar,
	CircleCheck,
	Construction,
	GitFork,
	Github,
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
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// TODO: Move this ugly thing to a new file
const headers = new Headers()
import.meta.env.VITE_GITHUB_TOKEN &&
	headers.set('Authorization', 'Bearer ' + import.meta.env.VITE_GITHUB_TOKEN)
const requestOptions = {
	method: 'GET',
	headers: headers,
}

type ProjectCardState = {
	title?: string
	desc?: string
	tags: string[]
	progress: number
	status?: 'archived' | 'wip' | 'completed'
	targetRepo: string
	icon_url?: string
	web_url?: string
	history?: React.ReactNode
}

export function ProjectCard({
	title,
	desc,
	tags,
	progress,
	// TODO: Remove status and use github archived option as well as progress percentage to set achieve same functionality. For eg. if progress percentage is 100, status is 'completed'
	status,
	targetRepo,
	icon_url,
	web_url,
	history,
}: ProjectCardState) {
	type RepoDataType = {
		description?: string
		created_at?: string
		stargazers_count: number
		forks: number
		issues: number
		languages: Record<string, any>
		license?: string
		license_url?: string
	}

	const [repoData, setRepoData] = useState<RepoDataType>({
		languages: {},
		stargazers_count: 0,
		forks: 0,
		issues: 0,
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
					requestOptions
				)
				const languages = await languagesResponse.json()

				// the total of all the numbers in the languages record
				const total = Object.values(languages).reduce(
					(acc, value) => (acc as number) + (value as number),
					0
				) as number

				// converting the numbers record to percentages record
				const languagePercentages = Object.fromEntries(
					Object.entries(languages).map(([language, percentage]) => [
						language,
						(((percentage as any as number) / total) * 100).toFixed(2),
					])
				)

				// setting repo details
				setRepoData({
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
				})
			})
			.catch(err => console.error(err))
	}, [targetRepo])

	// Using useState and useEffect because the width of the card changes on window resize and it leads to bad style of the progress indicator. Not sure who will check my website by resizing it but lets just add it.
	const cardRef = useRef<HTMLDivElement>(null)
	const [cardWidth, setCardWidth] = useState(0)

	useLayoutEffect(() => {
		const handleResize = () => {
			setCardWidth(cardRef.current?.offsetWidth!)
		}
		window.addEventListener('resize', handleResize)
		setCardWidth(cardRef.current?.offsetWidth!)
		return () => window.removeEventListener('resize', handleResize)
	})

	// Added a separate function to keep the tooltip in the horizontal range of the card
	function getOffsetLeft(progress: number) {
		const offsetLeft = (progress * cardWidth) / 100 - 20
		if (offsetLeft < 40) return 40
		if (offsetLeft > cardWidth - 40) return cardWidth - 40
		return offsetLeft
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Card
						ref={cardRef}
						className='relative hover:shadow-2xl hover:shadow-background/50 transition-all duration-300 ease-in-out hover:cursor-pointer group'
					>
						<CardHeader>
							<CardTitle className='tracking-tight font-bold'>
								{title}
							</CardTitle>
							<CardDescription>{desc || repoData.description}</CardDescription>
							<CardDescription className='inline-flex items-center gap-1'>
								<Calendar className='w-4 h-4' /> Started {repoData.created_at}
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
							title={title}
						/>

						<span
							className='absolute -bottom-11 h-10 w-10 rounded-full bg-primary border-4 border-background hidden lg:group-hover:flex animate-in fade-in slide-in-from-left-10 duration-300 items-center justify-center text-background text-xs font-medium'
							style={{
								left: `${getOffsetLeft(progress)}px`,
							}}
						>
							{/* Tried to add a complete icon for complete ones and an archive icon for archived ones but the stroke-width of the icon was not changing, so I had to fall back to progress percentage. Better luck next time */}
							{progress}%
						</span>
					</Card>
				</DialogTrigger>
				<DialogContent
					className='max-w-3xl gap-0 md:max-h-[90vh] h-full overflow-auto flex flex-col scrollbar-secondary'
					closable={false}
				>
					<DialogHeader className='flex-row gap-4 mb-4 items-center'>
						{icon_url && (
							<img src={icon_url} alt='inner ink' className='h-10' />
						)}
						<div className='text-left'>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>
								{desc || repoData.description}
							</DialogDescription>
						</div>
						<a href={'https://github.com/' + targetRepo} className='ml-auto'>
							<Button size='sm' variant='outline' className='max-sm:px-2'>
								<span className='max-sm:hidden mr-2'>View on GitHub</span>
								<Github className='h-5 w-5 sm:h-4 sm:w-4' />
							</Button>
						</a>
						<DialogClose asChild>
							<Button variant='outline' size='sm' className='px-2'>
								<X className='h-5 w-5' />
							</Button>
						</DialogClose>
					</DialogHeader>
					<Separator />
					<div className='flex max-md:flex-col gap-4 grow'>
						<div className='grow space-y-1 md:mt-4 max-md:order-last'>
							<h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
								History:
							</h4>
							<div className='prose max-w-full'>{history}</div>
						</div>
						<Separator orientation='vertical' className='max-md:hidden' />
						<div className='md:w-64 mt-4 shrink-0'>
							<div className='space-y-4 md:sticky md:top-0'>
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
									{web_url && (
										<a href={web_url}>
											<Button
												variant='link'
												className='justify-start px-0 h-fit py-0'
											>
												<Link2 className='w-4 h-4 mr-2' />
												{web_url}
											</Button>
										</a>
									)}
									<a href={'https://github.com/' + targetRepo + '/#readme'}>
										<Button
											variant='link'
											className='justify-start px-0 h-fit py-0 text-muted-foreground'
										>
											<BookOpen className='w-4 h-4 mr-2' />
											Readme
										</Button>
									</a>
									{repoData.license && (
										<a href={repoData.license_url}>
											<Button
												variant='link'
												className='justify-start px-0 h-fit py-0 text-muted-foreground'
											>
												<Scale className='w-4 h-4 mr-2' />
												{repoData.license}
											</Button>
										</a>
									)}
									<a href={'https://github.com/' + targetRepo + '/stargazers'}>
										<Button
											variant='link'
											className='justify-start px-0 h-fit py-0 text-muted-foreground'
										>
											<StarIcon className='h-4 w-4 mr-2' />
											{repoData.stargazers_count}{' '}
											{repoData.stargazers_count > 1 ? 'Stars' : 'Star'}
										</Button>
									</a>
									<a href={'https://github.com/' + targetRepo + '/issues'}>
										<Button
											variant='link'
											className='justify-start px-0 h-fit py-0 text-muted-foreground'
										>
											<BugIcon className='h-4 w-4 mr-2' />
											{repoData.issues}{' '}
											{repoData.issues > 1 ? 'Issues' : 'Issue'}
										</Button>
									</a>
									<a href={'https://github.com/' + targetRepo + '/forks'}>
										<Button
											variant='link'
											className='justify-start px-0 h-fit py-0 text-muted-foreground'
										>
											<GitFork className='h-4 w-4 mr-2' />
											{repoData.forks} {repoData.forks > 1 ? 'Forks' : 'Fork'}
										</Button>
									</a>
								</div>
								<div className='space-y-3'>
									<h5 className='font-semibold'>Languages:</h5>
									<div className='flex flex-wrap gap-2'>
										{Object.entries(repoData.languages).map(
											([language, percentage], index) => (
												<Badge
													key={index}
													variant={index === 0 ? 'default' : 'secondary'}
												>
													{language}: {percentage}%
												</Badge>
											)
										)}
									</div>
								</div>
								<div className='space-y-3'>
									<h5 className='font-semibold'>Tags:</h5>
									<div className='flex flex-wrap gap-2'>
										{tags.map((tag, index) => (
											<Badge key={index} variant='secondary'>
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</div>
						<Separator className='md:hidden' />
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
