import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='flex justify-center items-center h-screen'>
			<h1 className='text-6xl'>GoNext</h1>
		</div>
	);
}

export default App;
