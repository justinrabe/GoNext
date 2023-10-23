import { ReactNode } from 'react';

export default function Navbar() {
  return (
    <>
      <header className='flex w-full flex-col items-center bg-black px-[60px] py-[24px] md:flex-row'>
        <a href='#' className='border-r border-grey pr-[40px] '>
          <img src='/assets/league-logo.png' className='w-[150px]' />
        </a>
        <img src='/assets/go-next-logo.png' className='ml-[40px] w-[160px]' />
        <nav className='ml-[40px]'>
          <ul className='flex flex-col gap-x-10 text-white md:flex-row'>
            <NavLink>Home</NavLink>
            <NavLink>About Us</NavLink>
            <NavLink>Documentation</NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
}

function NavLink({ children }: { children: ReactNode }) {
  return (
    <li className='hover:cursor-pointer'>
      <a href='/'>{children}</a>
    </li>
  );
}
