import Footer from './components/Footer';
import Hero from './components/Hero';
import Hero2 from './components/Hero2';
import Navbar from './components/Navbar';
import RankingsDisplay from './components/RankingsDisplay';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <RankingsDisplay />
      <Hero2 />
      <Footer />
    </div>
  );
}
