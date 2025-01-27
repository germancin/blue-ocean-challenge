import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NextStep = () => {
	return (
		<main className="min-h-screen bg-navy">
			<Navbar />
			<div className="container mx-auto px-4 py-24">
				<h1 className="text-4xl font-bold mb-8 text-white">Next Step</h1>
				<div className="space-y-6 text-light-gray">
					{/* Content will be added in future updates */}
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default NextStep;