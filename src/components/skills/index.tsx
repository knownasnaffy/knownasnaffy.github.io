import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import skillsList from './skills-list'

export function SkillsSection() {
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl'>
					Skills
				</h1>
				<a
					href='https://www.linkedin.com/in/knownasnaffy/details/skills/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Button className='gap-1' variant='ghost'>
						View More
						<ArrowUpRight className='h-5 w-5' />
					</Button>
				</a>
			</div>
			<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-11 place-items-center gap-6 md:gap-8'>
				{Object.entries(skillsList).map(([skill, img]) => (
					<SkillCard key={skill} img={img} />
				))}
			</div>
		</section>
	)
}
function SkillCard({ img }: { img?: React.ReactNode }) {
	return (
		<Card className='aspect-square p-4 w-fit group [&_svg]:w-12 hover:grayscale transition-all ease-in-out duration-200 hover:shadow-2xl hover:shadow-background/50'>
			{img}
		</Card>
	)
}
