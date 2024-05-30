import { Building2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { CourseCard } from './course-card'

export default function CoursesSection() {
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Courses
				</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button className='gap-2' variant='ghost'>
							Hire Me
							<Building2 className='h-5 w-5' />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Oops!</DialogTitle>
							<DialogDescription>
								I'm not yet accepting any work from outsiders. But I can surely
								help you if you if we are close enough. For that, contact me on
								my personal number. You must have it, right?
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<div className='grid lg:grid-cols-3 place-items-stretch gap-8'>
				<CourseCard
					course='Secondary Education'
					org='Budha Dal Public School, Patiala - (CBSE)'
					duration='2020 - 2022'
					subjects='English, Maths, Science, Social Studies, Punjabi, Hindi, Information Technology'
					percentage={86.3}
				/>
				<CourseCard
					course='Senior Secondary Education'
					org='Budha Dal Public School, Patiala - (CBSE)'
					duration='2022 - 2024'
					subjects='English, Maths, Physics, Chemistry, Informatics Practice'
					percentage={61.2}
				/>
				<CourseCard
					course='Bachelors of Technology'
					org='BBSBEC, Fatehgarh Sahib'
					duration='2024 - 2028'
					major='Computer Science and Engineering'
					progress={0}
				/>
			</div>
		</section>
	)
}
