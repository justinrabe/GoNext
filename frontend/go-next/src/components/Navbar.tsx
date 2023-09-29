export default function Navbar() {
	return (
		<>
			<header className='bg-black w-full px-[60px] py-[24px] flex items-center'>
				<a href='#' className='pr-[40px] border-r border-grey '>
					<img src='/assets/league-logo.png' className='w-[150px]' />
				</a>
				<img
					src='/assets/go-next-logo.png'
					className='w-[160px] ml-[40px]'
				/>
				<nav className='ml-[40px]'>
					<ul className='flex text-white gap-x-10'>
						<NavLink>Home</NavLink>
						<NavLink>Rankings</NavLink>
						<NavLink>Documentation</NavLink>
					</ul>
				</nav>
			</header>
		</>
	);
}

function NavLink({ children }) {
	return (
		<li className='hover:cursor-pointer'>
			<a href='/'>{children}</a>
		</li>
	);
}
