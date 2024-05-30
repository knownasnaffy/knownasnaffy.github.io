import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card';

export function TemplateCard({
	name, purpose, packages, icon, link,
}: {
	name: string;
	purpose: string;
	packages: string;
	icon: React.ReactNode;
	link?: string;
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
	);
}
