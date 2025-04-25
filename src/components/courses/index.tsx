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
					skills='HTML, CSS, Bootstrap, Javascript, Python'
					percentage={86.3}
				/>
				<CourseCard
					course='Senior Secondary Education'
					org='Budha Dal Public School, Patiala - (CBSE)'
					duration='2022 - 2024'
					skills='React, Next.js, Tailwind CSS, Tauri, SQL, CI'
					percentage={61.2}
				/>
				<CourseCard
					course='B.Tech. in CSE'
					org='BBSBEC, Fatehgarh Sahib'
					duration='2024 - 2028'
					skills='Django, Wordpress, Linux, Flutter'
					progress={25}
				/>
			</div>
		</section>
	)
}
