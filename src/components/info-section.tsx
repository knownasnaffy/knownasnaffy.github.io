export function InfoSection() {
	return (
		<section className='grid min-h-screen place-items-center lg:grid-cols-2 gap-8 container mx-auto md:snap-start md:snap-always'>
			<div className='space-y-4 text-center lg:text-left max-lg:self-start max-lg:order-last'>
				<h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl'>
					Barinderpreet Singh
				</h1>
				<p className='text-xl text-white/75'>
					I build web applications with a focus on user experience.
				</p>
			</div>
			<img
				src='/avatar.jpeg'
				alt='placeholder'
				className='w-2/3 md:w-2/5 lg:w-2/3 rounded-full max-lg:self-end'
			/>
		</section>
	)
}
