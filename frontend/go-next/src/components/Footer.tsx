import Button from './Button';

export default function Footer() {
  return (
    <footer className='w-full bg-black px-[3.75rem] py-10 text-white'>
      <h1 className='font-display font-medium uppercase text-gold4'>
        Ranking Updates
      </h1>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-display text-2xl font-medium uppercase italic'>
            Stay Ahead of the Game
          </h1>
          <h2>Get exclusive updates on GO NEXT Power Rankings and more.</h2>
        </div>
        <div className='flex gap-2'>
          <input
            type='text'
            name='email'
            id=''
            placeholder='Email address'
            className='w-[300px] rounded border border-grey bg-transparent px-4 py-2'
          />
          <Button type='primary'>Sign Up</Button>
        </div>
      </div>
      <hr className='my-8 border-grey' />

      {/* Link section */}
      <div className='flex-start flex gap-6'>
        <div className='flex w-[17rem] flex-col'>
          <h1 className='font-semibold'>GO NEXT</h1>
          <a href='#'>Meet the Team</a>
        </div>
        <div className='flex w-[17rem] flex-col'>
          <h1 className='font-semibold'>Products</h1>
          <a href='#'>LoL Power Rankings</a>
        </div>
        <div className='flex w-[17rem] flex-col'>
          <h1 className='font-semibold'>Resources</h1>
          <a href='#'>Technical Documentation</a>
          <a href='#'>Source Code</a>
        </div>
      </div>

      <hr className='my-8 border-grey' />

      <div className='flex items-center justify-center gap-[100px]'>
        <a href='#'>
          <img src='/assets/riot-games-logo.png' width={145} />
        </a>
        <a href='#'>
          <img src='/assets/powered-by-aws-logo.png' width={145} />
        </a>
        <a href='#'>
          <img src='/assets/devpost-logo.png' width={145} />
        </a>
      </div>

      <div className='mt-8 text-center leading-6 text-grey'>
        ™ & © 2023 Riot Games, Inc. League of Legends and all related logos,
        characters, and distinctive likenesses thereof are exclusive property of
        Riot Games, Inc. All Rights Reserved.
      </div>

      <div className='mt-8 flex w-full items-center justify-center'>
        <div className='flex gap-2 rounded bg-[#2E456C80] p-2'>
          <img src='/assets/esrb.png' className='h-[150px] w-[100px]' />
          <div className='flex flex-col leading-6'>
            <div>Blood</div>
            <div>Fantasy</div>
            <div>Mild Suggestive Themes</div>
            <div>Use of Alcohol and Tobacco</div>
            <hr className='my-4 border-grey' />
            <div>Online Interactions Not Rated by the ESRB</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
