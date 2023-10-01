import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import RankingsDisplay from './components/RankingsDisplay';

export default function App() {
	return (
		<div className=''>
			<Navbar />
			<RankingsDisplay />
			<Hero />
			<Footer />
		</div>
	);
}
