import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PrizeCards from '../components/PrizeCards';

const Index = () => {
  return (
    <main className="min-h-screen bg-light-gray">
      <Navbar />
      <Hero />
      <PrizeCards />
      <Stats />
    </main>
  );
};

export default Index;