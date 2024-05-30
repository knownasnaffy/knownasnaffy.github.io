import { Calendar } from 'lucide-react';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card';

export function CourseCard({
	course, org, duration, subjects, major, cgpa, percentage, progress,
}: {
	course: string;
	org: string;
	duration: string;
	subjects?: string;
	major?: string;
	cgpa?: number;
	percentage?: number;
	progress?: number;
}) {
	return (
		<Card className='h-full'>
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
					<h4 className='text-lg font-semibold'>
						{subjects ? 'Subjects' : 'Major'}
					</h4>
					<p className='text-muted-foreground'>{subjects || major}</p>
				</div>
				<div className='place-self-start'>
					<h4 className='text-lg font-semibold'>
						{percentage ? 'Percentage' : cgpa ? 'CGPA' : 'Progress'}
					</h4>
					<p className='text-muted-foreground'>
						{percentage ? percentage + '%' : cgpa ? cgpa : progress + '%'}
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
