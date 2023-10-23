export default function Hero() {
  return (
    <div className='flex w-full flex-col items-center justify-center bg-blue5 px-8 py-20 text-center md:px-60 '>
      <h1 className='font-display text-xl font-medium uppercase text-gold4 md:text-2xl'>
        Global Power Rankings
      </h1>
      <h2 className='text-balance mt-6 max-w-[960px] font-display text-2xl font-medium uppercase text-white md:text-3xl'>
        GLOBAL, TOURNAMENT, & CUSTOMIZED TEAM RANKINGS
      </h2>
      <p className='mt-4 max-w-[960px] font-medium leading-6 text-white'>
        Discover the global League of Legends elite with a glimpse into the
        rankings through GO NEXT's cutting-edge algorithm. Dive into the power
        rankings from various tournaments and witness how the best teams from
        around the world stack up on the leaderboard. Customize your viewing
        experience by hand-picking teams for side-by-side comparisons.{' '}
      </p>
    </div>
  );
}
