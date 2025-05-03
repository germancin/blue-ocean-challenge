import { useState } from "react";
import { useTranslation } from "react-i18next";
import CopyTradeNavbar from "../../components/CopyTradeNavbar";
import Footer from "../../components/Footer";

const LuisFernandoProfile = () => {
	const { t } = useTranslation();
	const [showVideo, setShowVideo] = useState(false);

	// Sample trading performance data
	const performanceData = {
		name: "Luis Fernando",
		title: "Forex & Crypto Specialist",
		roi: "+287%",
		period: "Last 12 months",
		winRate: "73%",
		tradesPerMonth: "42",
		averageHolding: "3.2 days",
		riskLevel: "Moderate",
		specialties: ["EUR/USD", "BTC/USD", "ETH/USD", "Gold"],
		bio: "With over 7 years of trading experience, Luis Fernando has developed a unique strategy combining technical analysis with macroeconomic indicators. His consistent performance has attracted hundreds of followers who benefit from his disciplined approach to trading.",
	};

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
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-20">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">{performanceData.name}</h1>
						<p className="text-xl mb-2">{performanceData.title}</p>
						<div className="text-3xl font-bold text-green-300 mb-6">
							{performanceData.roi} ROI ({performanceData.period})
						</div>
						<p className="mb-8">{performanceData.bio}</p>
						<button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
							Copy Luis's Trades Now
						</button>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<div className="bg-white p-4 rounded-lg shadow-lg">
							<img src="/luis_fernando.png" alt="Luis Fernando" className="w-64 h-64 rounded-lg object-cover" />
						</div>
					</div>
				</div>
			</section>

			{/* Performance Metrics */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Trading Performance</h2>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<h3 className="text-lg font-semibold text-gray-600">Win Rate</h3>
							<p className="text-3xl font-bold text-blue-600">{performanceData.winRate}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<h3 className="text-lg font-semibold text-gray-600">Monthly Trades</h3>
							<p className="text-3xl font-bold text-blue-600">{performanceData.tradesPerMonth}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<h3 className="text-lg font-semibold text-gray-600">Avg. Holding Time</h3>
							<p className="text-3xl font-bold text-blue-600">{performanceData.averageHolding}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<h3 className="text-lg font-semibold text-gray-600">Risk Level</h3>
							<p className="text-3xl font-bold text-blue-600">{performanceData.riskLevel}</p>
						</div>
					</div>

					<div className="mt-12 bg-white p-8 rounded-lg shadow-md">
						<h3 className="text-2xl font-bold mb-6">Trading Specialties</h3>
						<div className="flex flex-wrap gap-3">
							{performanceData.specialties.map((specialty, index) => (
								<span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
									{specialty}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Trading Chart/Graph Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Performance History</h2>

					<div className="bg-white p-6 rounded-lg shadow-md relative">
						<img src="/lf_mfx.png" alt="Luis Fernando Trading Performance" className="w-full rounded-lg shadow-sm" />

						<a
							href="https://www.myfxbook.com/portfolio/btc-profit-rocket/11419775"
							target="_blank"
							rel="noopener noreferrer"
							className="absolute bottom-10 right-10 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
						>
							<span>View on MyFXBook</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								<polyline points="15 3 21 3 21 9"></polyline>
								<line x1="10" y1="14" x2="21" y2="3"></line>
							</svg>
						</a>
					</div>
				</div>
			</section>

			{/* How to Copy Trade */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">How to Copy Luis's Trades</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
							<h3 className="text-xl font-semibold mb-3">Sign Up</h3>
							<p>Create your account on EliteTraderHub and complete the verification process.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
							<h3 className="text-xl font-semibold mb-3">Fund Your Account</h3>
							<p>Deposit funds into your trading account. Minimum recommended amount: $1,000.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
							<h3 className="text-xl font-semibold mb-3">Start Copying</h3>
							<p>Select Luis Fernando as your trader and set your copy trading parameters.</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
							Start Copy Trading Now
						</button>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">What Followers Say</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center mb-4">
								<div className="text-yellow-400 text-xl">★★★★★</div>
							</div>
							<p className="italic mb-4">
								"Following Luis has completely transformed my trading results. His consistent approach and clear strategy have helped me achieve returns I never thought possible."
							</p>
							<p className="font-semibold">- Carlos M.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center mb-4">
								<div className="text-yellow-400 text-xl">★★★★★</div>
							</div>
							<p className="italic mb-4">
								"What I appreciate most about Luis is his risk management. Even during market downturns, my portfolio remains stable thanks to his careful approach."
							</p>
							<p className="font-semibold">- Maria T.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center mb-4">
								<div className="text-yellow-400 text-xl">★★★★★</div>
							</div>
							<p className="italic mb-4">
								"I've been copy trading for years, but Luis's performance stands out. His technical analysis is spot on, and his communication about market conditions is excellent."
							</p>
							<p className="font-semibold">- John D.</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

					<div className="space-y-6">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">What is the minimum investment to copy Luis's trades?</h3>
							<p>We recommend a minimum of $1,000 to effectively copy Luis's trading strategy with proper position sizing.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">How often does Luis trade?</h3>
							<p>Luis makes approximately 40-45 trades per month, focusing on quality setups rather than quantity.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">What markets does Luis trade?</h3>
							<p>Luis primarily focuses on major forex pairs (EUR/USD, GBP/USD), cryptocurrencies (BTC, ETH), and occasionally gold.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">What is Luis's trading style?</h3>
							<p>Luis employs a swing trading approach with an average holding period of 3-4 days, combining technical analysis with fundamental factors.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">How are fees structured?</h3>
							<p>There is a monthly subscription fee of $49.99 to copy Luis's trades, with no additional performance fees.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 px-4 relative text-white">
				{/* Background Image - same as hero */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: 'url("https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/hero-bg-rpt.png")',
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				{/* Overlay gradient - same as hero */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-indigo-800/60 z-10" />

				<div className="max-w-6xl mx-auto relative z-20">
					<h2 className="text-4xl font-bold text-center mb-12">Ready to Start Copying Luis's Profitable Trades?</h2>

					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="md:w-1/2 relative cursor-pointer" onClick={() => setShowVideo(true)}>
							<div className="relative">
								<img src="https://d2tpnh780x5es.cloudfront.net/rebrand-prod/hekhgmn0/es-copy-trading-video-2.png" alt="How to Copy Trade" className="w-full rounded-lg shadow-lg" />
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm">
										<div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
									</div>
								</div>
							</div>
							<h2 className="text-3xl font-bold mt-4">
								Cómo empezar a hacer <span className="text-blue-300">Copy Trading con Luis</span>
							</h2>
						</div>
						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold mb-6">¿Cómo funciona el Copy Trading?</h2>
							<ol className="space-y-4 text-lg">
								<li className="flex gap-2">
									<span className="font-bold">1.</span> Encuentre un operador al que seguir
								</li>
								<li className="flex gap-2">
									<span className="font-bold">2.</span> Ajuste el tamaño de sus operaciones y su tolerancia al riesgo
								</li>
								<li className="flex gap-2">
									<span className="font-bold">3.</span> ¡Comience a copiar automáticamente las operaciones!
								</li>
							</ol>
							<div className="flex gap-4 mt-6">
								<a href="#" className="inline-block">
									<img src="https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/app-store-badge.png" alt="Download on App Store" className="h-10" />
								</a>
								<a href="#" className="inline-block">
									<img src="https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideo && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowVideo(false)}>
					<div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
						<button className="absolute -top-10 right-0 text-white text-2xl" onClick={() => setShowVideo(false)}>
							✕
						</button>
						<div className="relative pb-[56.25%] h-0">
							<iframe
								className="absolute top-0 left-0 w-full h-full rounded-lg"
								src="https://www.youtube.com/embed/9RSEBKCk3tI?autoplay=1"
								title="Copy Trading Tutorial"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</main>
	);
};

export default LuisFernandoProfile;
