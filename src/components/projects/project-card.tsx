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
import { useEffect, useState } from 'react'

// TODO: Move this ugly thing to a new file
const headers = new Headers()
import.meta.env.VITE_GITHUB_TOKEN &&
	headers.set('Authorization', 'Bearer ' + import.meta.env.VITE_GITHUB_TOKEN)
const requestOptions = {
	method: 'GET',
	headers: headers,
}
export function ProjectCard({
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

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					{/* IDEA: When the user hovers over the card, a popup bubble will appear on the progressbar aligned to the bottom and animating in from the left */}
					<Card className='relative hover:shadow-2xl hover:shadow-background/50 transition-all duration-300 ease-in-out hover:cursor-pointer'>
						<CardHeader>
							<CardTitle className='tracking-tight font-bold'>
								{title}
							</CardTitle>
							<CardDescription>{repoData.description}</CardDescription>
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
						/>
					</Card>
				</DialogTrigger>
				<DialogContent
					className='max-w-3xl gap-0 md:max-h-[90vh] h-full overflow-auto'
					closable={false}
				>
					<DialogHeader className='flex-row gap-4 mb-4 items-center'>
						<img
							src='https://github.com/knownasnaffy/inner-ink/blob/main/app/frontend/public/logo.png?raw=true'
							alt='inner ink'
							className='h-10'
						/>
						<div className='text-left'>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{repoData.description}</DialogDescription>
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
					<div className='flex max-md:flex-col gap-4'>
						<div className='grow space-y-1 md:mt-4 max-md:order-last'>
							<h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
								History:
							</h4>
							<div className='prose max-w-full'>
								Pellentesque at facilisis tortor. Cras elementum, sapien non
								venenatis consequat, orci nisl bibendum turpis, ut consequat
								velit nibh quis purus. Nulla erat magna, tincidunt in turpis
								vel, ornare aliquet massa. Nam pharetra tempor posuere. In
								feugiat gravida viverra. Proin eleifend fringilla diam non
								semper. Nullam faucibus, nibh quis tempor dictum, nibh metus
								vestibulum quam, in vestibulum leo velit quis magna. Nullam orci
								risus, bibendum ac magna a, ultrices fermentum lacus. Vestibulum
								pretium nunc dolor, ut sollicitudin ante semper vitae. In at
								nisi eget eros vestibulum volutpat. Pellentesque pulvinar erat a
								pulvinar dictum. Sed quis mauris non purus volutpat sodales. In
								dignissim porta ipsum facilisis accumsan. Lorem ipsum dolor sit
								amet, consectetur adipiscing elit. Nam efficitur luctus risus,
								sed placerat eros sagittis at. Donec auctor tortor non
								consectetur mattis. Curabitur nec libero euismod, fringilla
								lorem sed, tristique nulla. Suspendisse non dui vitae neque
								sagittis porttitor ac tempus urna. Praesent bibendum lorem
								imperdiet, hendrerit ex sit amet, blandit lectus. Ut egestas
								massa eu felis condimentum sagittis. Etiam egestas, enim in
								lobortis pellentesque, elit ligula ultrices felis, sed pulvinar
								nisl sapien ac urna. Sed dui metus, pellentesque et semper
								ullamcorper, volutpat et eros. Proin pharetra turpis et justo
								condimentum efficitur. Donec pretium non risus nec dignissim.
								Integer nec enim posuere, ornare sem ac, semper massa. Cras
								vitae viverra est, id faucibus eros. Praesent elit leo, egestas
								et convallis quis, cursus sit amet orci. Vivamus pretium posuere
								leo vel congue. Aliquam vitae porttitor odio. Sed vulputate
								porttitor orci quis ultricies. Aenean lorem metus, porta sit
								amet tempor rhoncus, iaculis quis enim. Ut molestie orci quis
								lacus dictum, sit amet maximus eros sagittis. Integer accumsan
								tortor vitae enim vulputate, non maximus velit vestibulum.
								Praesent accumsan euismod massa efficitur feugiat. Nulla lacinia
								dui in interdum ultrices. Nullam nec pretium libero. Phasellus
								sed libero nisl. Mauris egestas ut turpis vitae imperdiet. Nunc
								nec lorem ligula. Pellentesque mattis lectus vel risus pulvinar
								interdum ac id leo. Mauris erat quam, faucibus in tortor quis,
								iaculis tempus lectus. Ut in ultricies velit, quis tincidunt
								nunc. Vestibulum magna augue, euismod id nibh nec, tempus congue
								velit. Nunc non ultricies metus, vel mollis ligula.
							</div>
						</div>
						<Separator orientation='vertical' className='max-md:hidden' />
						<div className='w-64 mt-4 shrink-0'>
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
										<Badge variant='secondary'>React</Badge>
										<Badge variant='secondary'>Typescript</Badge>
										<Badge variant='secondary'>Tailwind</Badge>
										<Badge variant='secondary'>Daisy UI</Badge>
										<Badge variant='secondary'>Desktop App</Badge>
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
