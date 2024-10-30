import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { cn } from '@/utils'
import { TemplateCard } from './template-card'

export default function TemplatesSection() {
	const [thanked, setThanked] = useState(false)
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl'>
					Templates
				</h1>
				<Button
					variant='ghost'
					onClick={() => setThanked(thanked => !thanked)}
					className={cn(
						thanked && 'hover:bg-red-500 hover:text-white',
						'group max-sm:hidden'
					)}
				>
					{thanked ? <span>{'Thanked'}</span> : <span>{'Thank Me'}</span>}
					<Heart
						className={cn(
							'h-5 w-5 ml-2',
							thanked &&
								'fill-red-500 stroke-red-500 group-hover:fill-white group-hover:stroke-white transition-colors'
						)}
					/>
				</Button>
			</div>
			<div className='grid md:grid-cols-2 place-items-stretch lg:place-items-center gap-8'>
				<TemplateCard
					name='Web Frontend'
					purpose='To give a nice looking model to the application'
					packages='Vite, Bun, React, Typescript, Tailwind, Shadcn'
					link='https://github.com/knownasnaffy/web-frontend'
				/>
				<TemplateCard
					name='Web Backend'
					purpose='For building the circuits in the application'
					packages='Next.js, Node.js, Typescript, Tailwind'
					link='https://github.com/knownasnaffy/web-backend'
				/>
			</div>
		</section>
	)
}
