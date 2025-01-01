import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';

const Index = () => {
  return (
    <main className="min-h-screen bg-light-gray">
      <Navbar />
      <Hero />
      <Stats />
    </main>
  );
};

export default Index;