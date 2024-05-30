import { Heart } from 'lucide-react'
import { Button } from './ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { useState } from 'react'
import { cn } from '@/utils'

export default function TemplatesSection() {
	const [thanked, setThanked] = useState(false)
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Templates
				</h1>
				<Button
					variant='ghost'
					onClick={() => setThanked(thanked => !thanked)}
					className={cn(
						thanked && 'hover:bg-red-500 hover:text-white',
						'group',
					)}
				>
					{thanked ? <span>{'Thanked'}</span> : <span>{'Thank Me'}</span>}
					<Heart
						className={cn(
							'h-5 w-5 ml-2',
							thanked &&
								'fill-red-500 stroke-red-500 group-hover:fill-white group-hover:stroke-white transition-colors',
						)}
					/>
				</Button>
			</div>
			<div className='grid md:grid-cols-2 place-items-center gap-8'>
				<TemplateCard
					name='Web Frontend'
					purpose='To give a nice looking model to the application'
					packages='Vite, Bun, React, Typescript, Tailwind, Shadcn'
					link='https://github.com/knownasnaffy/web-frontend'
					icon={
						<svg viewBox='0 0 128 128'>
							<defs>
								<linearGradient
									id='a'
									x1='6'
									x2='235'
									y1='33'
									y2='344'
									gradientTransform='translate(0 .937) scale(.3122)'
									gradientUnits='userSpaceOnUse'
								>
									<stop offset='0' stopColor='#41d1ff'></stop>
									<stop offset='1' stopColor='#bd34fe'></stop>
								</linearGradient>
								<linearGradient
									id='b'
									x1='194.651'
									x2='236.076'
									y1='8.818'
									y2='292.989'
									gradientTransform='translate(0 .937) scale(.3122)'
									gradientUnits='userSpaceOnUse'
								>
									<stop offset='0' stopColor='#ffea83'></stop>
									<stop offset='.083' stopColor='#ffdd35'></stop>
									<stop offset='1' stopColor='#ffa800'></stop>
								</linearGradient>
							</defs>
							<path
								fill='url(#a)'
								d='M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0'
							></path>
							<path
								fill='url(#b)'
								d='M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0'
							></path>
						</svg>
					}
				/>
				<TemplateCard
					name='Web Backend'
					purpose='For building the circuits in the application'
					packages='Next.js, Node.js, Typescript, Tailwind'
					link='https://github.com/knownasnaffy/web-frontend'
					icon={
						<svg viewBox='0 0 128 128'>
							<path d='M64 0A64 64 0 0 0 0 64a64 64 0 0 0 64 64 64 64 0 0 0 35.508-10.838L47.014 49.34v40.238H38.4V38.4h10.768l57.125 73.584A64 64 0 0 0 128 64 64 64 0 0 0 64 0Zm17.777 38.4h8.534v48.776L81.777 75.97Zm24.18 73.92-.111.096a64 64 0 0 0 .111-.096z'></path>
						</svg>
					}
				/>
			</div>
		</section>
	)
}

function TemplateCard({
	name,
	purpose,
	packages,
	icon,
	link,
}: {
	name: string
	purpose: string
	packages: string
	icon: React.ReactNode
	link?: string
}) {
	return (
		<a href={link}>
			<Card className='h-full flex [&_svg]:w-32 pr-6 hover:shadow-2xl hover:shadow-background/50 transition-all ease-in-out duration-300'>
				<div>
					<CardHeader>
						<CardTitle>{name}</CardTitle>
						<CardDescription>{purpose}</CardDescription>
					</CardHeader>
					<CardFooter className='flex flex-col items-start'>
						<h4 className='text-lg font-semibold'>Packages</h4>
						<p className='text-muted-foreground'>{packages}</p>
					</CardFooter>
				</div>
				{icon}
			</Card>
		</a>
	)
}
