import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PrizeCards from '../components/PrizeCards';
import PrizeDistributionTable from '../components/PrizeDistributionTable';
import DiversificationStrategy from '../components/DiversificationStrategy';
import Rules from '../components/Rules';
import InfoChallenge from '../components/InfoChallenge';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
	return (
		<main className="min-h-screen bg-light-gray">
			<Navbar />
			<Hero />
			<Rules />
			<InfoChallenge />
			<PrizeDistributionTable />
			<DiversificationStrategy />
			<FAQ />
			<CallToAction />
			<Footer />
		</main>
	);
};

export default Index;
