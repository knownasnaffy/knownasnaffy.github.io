import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

export function TemplateCard({
	name,
	purpose,
	packages,
	link,
}: {
	name: string
	purpose: string
	packages: string
	link?: string
}) {
	return (
		<a href={link} className='lg:max-w-md w-full'>
			<Card className='h-full hover:shadow-2xl hover:shadow-background/50 transition-all ease-in-out duration-300'>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{purpose}</CardDescription>
				</CardHeader>
				<CardFooter className='flex flex-col items-start'>
					<h4 className='text-lg font-semibold'>Packages</h4>
					<p className='text-muted-foreground'>{packages}</p>
				</CardFooter>
			</Card>
		</a>
	)
}
