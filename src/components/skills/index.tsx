import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import skillsList from './skills-list'

export function SkillsSection() {
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Skills
				</h1>
				<a href='mailto:naffydharni006@gmail.com?subject=Your skills are amazing!&body=I was really impressed by your skills and would love to continue to admire you.'>
					<Button className='gap-2' variant='ghost'>
						Praise Me
						<Mail className='h-5 w-5' />
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
