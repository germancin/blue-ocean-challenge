import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PrizeCards from '../components/PrizeCards';
import PrizeDistributionTable from '../components/PrizeDistributionTable';
import DiversificationStrategy from '../components/DiversificationStrategy';
import Rules from '../components/Rules';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-light-gray">
      <Navbar />
      <Hero />
      <Rules />
      <PrizeCards />
      <PrizeDistributionTable />
      <DiversificationStrategy />
      <Stats />
      <Footer />
    </main>
  );
};

export default Index;