import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PrizeCards from '../components/PrizeCards';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-light-gray">
      <Navbar />
      <Hero />
      <PrizeCards />
      <Stats />
      <Footer />
    </main>
  );
};

export default Index;