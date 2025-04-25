import { Calendar } from 'lucide-react'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

export function CourseCard({
	course,
	org,
	duration,
	skills: subjects,
	major,
	cgpa,
	percentage,
	progress,
}: {
	course: string
	org: string
	duration: string
	skills?: string
	major?: string
	cgpa?: number
	percentage?: number
	progress?: number
}) {
	return (
		<Card className='h-full hover:shadow-2xl hover:shadow-background/50 transition-all ease-in-out duration-300'>
			<CardHeader>
				<CardTitle>{course}</CardTitle>
				<CardDescription>{org}</CardDescription>
				<CardDescription className='inline-flex items-center gap-1'>
					<Calendar className='w-4 h-4' />
					{duration}
				</CardDescription>
			</CardHeader>
			<CardFooter className='grid lg:grid-cols-2 gap-4'>
				<div>
					<h4 className='text-lg font-semibold mb-1'>
						{subjects ? 'Skills' : 'Major'}
					</h4>
					<p className='text-muted-foreground text-sm'>{subjects || major}</p>
				</div>
				<div className='place-self-start'>
					<h4 className='text-lg font-semibold mb-1'>
						{percentage ? 'Percentage' : cgpa ? 'CGPA' : 'Progress'}
					</h4>
					<p className='text-muted-foreground text-sm'>
						{percentage ? percentage + '%' : cgpa ? cgpa : progress + '%'}
					</p>
				</div>
			</CardFooter>
		</Card>
	)
}
