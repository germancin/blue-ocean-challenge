import { useTranslation } from "react-i18next";
import CopyTradeNavbar from "../../components/CopyTradeNavbar";
import Footer from "../../components/Footer";

const CopyTradeIndex = () => {
	const { t } = useTranslation();

	return (
		<main className="min-h-screen bg-light-gray">
			<CopyTradeNavbar />

			{/* Hero Section */}
			<section className="py-20 px-4 relative text-white">
				{/* Background Image */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: 'url("https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/hero-bg-rpt.png")',
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-indigo-800/60 z-10" />

				{/* Content */}
				<div className="max-w-6xl mx-auto text-center relative z-20">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Professional Copy Trader</h1>
					<p className="text-xl mb-8">Join our elite portfolio of traders and earn while others copy your successful strategies</p>
					<button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
						Apply Now
					</button>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Why Join Our Copy Trading Program?</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Advanced Trading Tools</h3>
							<p>Access premium trading tools and analytics to enhance your trading performance.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Grow Your Following</h3>
							<p>We connect successful traders with investors looking to copy profitable strategies.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Additional Income</h3>
							<p>Earn commissions from followers who copy your trades, creating a passive income stream.</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

					<div className="grid md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
							<h3 className="text-xl font-semibold mb-2">Apply</h3>
							<p>Submit your trading history and performance metrics</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
							<h3 className="text-xl font-semibold mb-2">Get Verified</h3>
							<p>Our team reviews your application and trading performance</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
							<h3 className="text-xl font-semibold mb-2">Onboarding</h3>
							<p>Receive your personalized landing page and trading tools</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
							<h3 className="text-xl font-semibold mb-2">Start Earning</h3>
							<p>We connect you with followers and you earn from copied trades</p>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Traders Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Our Featured Traders</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="/luis_fernando.png" alt="Luis Fernando" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
							<h3 className="text-xl font-semibold text-center mb-2">Luis Fernando</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+287% ROI (1 Year)</p>
							<a href="/copy-trade/luis_fernando" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								View Profile
							</a>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/150/cccccc/666666?text=" alt="Sarah Chen" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-300" />
							<h3 className="text-xl font-semibold text-center mb-2">Sarah Chen</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+194% ROI (1 Year)</p>
							<a href="#" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								View Profile
							</a>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/150/cccccc/666666?text=" alt="Marcus Johnson" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-300" />
							<h3 className="text-xl font-semibold text-center mb-2">Marcus Johnson</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+215% ROI (1 Year)</p>
							<a href="#" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								View Profile
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Professional Development Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Professional Trader Development</h2>
					<p className="text-xl text-center mb-8">We don't just connect you with followers - we help you become the best trader you can be.</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Advanced Training</h3>
							<p>Access our exclusive training programs designed to enhance your trading skills and strategies.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Mentorship</h3>
							<p>Get paired with experienced traders who will guide you to improve your performance.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Risk Management</h3>
							<p>Learn advanced risk management techniques to protect your capital and your followers.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">Career Path</h3>
							<p>Build a sustainable career in trading with our long-term development plan.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 px-4 bg-blue-600 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Transform Your Trading into a Career?</h2>
					<p className="text-xl mb-8">Join our elite network of professional traders and start earning while you trade.</p>
					<button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
						Apply Now
					</button>
				</div>
			</section>

			<Footer />
		</main>
	);
};

export default CopyTradeIndex;
