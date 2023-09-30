export default function Button({ children }) {
	return (
		<button className='bg-teal uppercase py-2 px-4 rounded text-white'>
			{children}
		</button>
	);
}
