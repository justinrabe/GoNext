import Button from './Button';

export default function Hero() {
	return (
		<div className=' flex w-full bg-blue5'>
			<div className='w-[50%] flex flex-col items-center justify-center text-white gap-4'>
				<h1 className='uppercase text-gold4'>
					Technical Documentation
				</h1>
				<h2 className='uppercase text-2xl italic'>
					View Public LOL Esports Data
				</h2>
				<p className='text-center leading-6 tracking-[0.16px] mx-[7.5em]'>
					A backstage pass to the epic saga of champions, rivalries,
					and epic fails – all in glorious data-driven detail!
				</p>
				<Button>Get Started</Button>
			</div>
			<img src='/assets/hero-image.jpeg' className='w-[50%]' />
		</div>
	);
}
