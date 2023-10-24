import Button from './Button';

export default function Hero2() {
  return (
    <div className=' flex w-full bg-blue5'>
      <div className='flex w-[50%] flex-col items-center justify-center gap-4 text-white'>
        <h1 className='font-display font-medium uppercase text-gold4'>
          Technical Documentation
        </h1>
        <h2 className='font-display text-2xl font-medium uppercase italic'>
          View Public LOL Esports Data
        </h2>
        <p className='mx-[7.5em] text-center leading-6 tracking-[0.16px]'>
          A backstage pass to the epic saga of champions, rivalries, and epic
          fails – all in glorious data-driven detail!
        </p>
        <Button style='primary'>Get Started</Button>
      </div>
      <img src='/assets/hero-image.jpeg' className='w-[50%]' />
    </div>
  );
}
