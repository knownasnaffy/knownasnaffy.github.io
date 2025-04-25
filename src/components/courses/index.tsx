import { Building2 } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { CourseCard } from './course-card'
import { cn } from '@/utils'

export default function CoursesSection() {
	return (
		<section className='min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always'>
			<div className='flex justify-between items-center'>
				<h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl'>
					Courses
				</h1>
				<a
					href='https://linkedin.com/in/knownasnaffy'
					className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
					target='_blank'
					rel='noopener noreferrer'
				>
					Hire Me
					<Building2 className='size-4' />
				</a>
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
					progress={25}
				/>
			</div>
		</section>
	)
}
