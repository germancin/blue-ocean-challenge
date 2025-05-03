import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import CopyTradeNavbar from "../../components/CopyTradeNavbar";
import Footer from "../../components/Footer";

const LuisFernandoV1Profile = () => {
	const { t } = useTranslation();
	const [showVideo, setShowVideo] = useState(false);
	const videoSectionRef = useRef<HTMLDivElement>(null);

	// Sample trading performance data
	const performanceData = {
		name: t("copyTrade.trader.luisFernando.name"),
		title: t("copyTrade.trader.luisFernando.title"),
		roi: t("copyTrade.trader.luisFernando.roi"),
		period: t("copyTrade.trader.luisFernando.period"),
		winRate: t("copyTrade.trader.luisFernando.metrics.winRate"),
		tradesPerMonth: t("copyTrade.trader.luisFernando.metrics.tradesPerMonth"),
		averageHolding: t("copyTrade.trader.luisFernando.metrics.averageHolding"),
		riskLevel: t("copyTrade.trader.luisFernando.metrics.riskLevel"),
		specialties: t("copyTrade.trader.luisFernando.specialties", { returnObjects: true }),
		bio: t("copyTrade.trader.luisFernando.bio"),
	};

	const scrollToVideo = () => {
		videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<main className="min-h-screen bg-[#001A2C]">
			<CopyTradeNavbar />

			{/* Hero Section - Dark theme with neon accents */}
			<section className="py-20 px-4 relative text-white">
				{/* Background Image */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: 'url("https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/hero-bg-rpt.png")',
						backgroundSize: "cover",
						backgroundPosition: "center",
						filter: "brightness(0.3) contrast(1.2)",
					}}
				/>

				{/* Content */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-20">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">{performanceData.name}</h1>
						<p className="text-xl mb-2 text-[#00FFFF]">{performanceData.title}</p>
						<div className="text-3xl font-bold text-[#00FF7F] mb-6">
							{performanceData.roi} ROI ({performanceData.period})
						</div>
						<p className="mb-8 text-gray-300">{performanceData.bio}</p>
						<button
							onClick={scrollToVideo}
							className="bg-[#4169E1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3A5FCD] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						>
							{t("copyTrade.trader.luisFernando.copyButton")}
						</button>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<div className="bg-[#0F2D3D] p-4 rounded-lg shadow-lg border border-[#00FFFF]/30">
							<img src="/luis_fernando.png" alt="Luis Fernando" className="w-64 h-64 rounded-lg object-cover" />
						</div>
					</div>
				</div>
			</section>

			{/* Performance Metrics - Dark theme with neon accents */}
			<section className="py-16 px-4 bg-[#001A2C]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">{t("copyTrade.trader.performance.title")}</h2>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#00FFFF]/20">
							<h3 className="text-lg font-semibold text-gray-300">{t("copyTrade.trader.luisFernando.metrics.winRateLabel")}</h3>
							<p className="text-3xl font-bold text-[#00FFFF]">{performanceData.winRate}</p>
						</div>
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#00FFFF]/20">
							<h3 className="text-lg font-semibold text-gray-300">{t("copyTrade.trader.luisFernando.metrics.tradesPerMonthLabel")}</h3>
							<p className="text-3xl font-bold text-[#00FFFF]">{performanceData.tradesPerMonth}</p>
						</div>
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#00FFFF]/20">
							<h3 className="text-lg font-semibold text-gray-300">{t("copyTrade.trader.luisFernando.metrics.averageHoldingLabel")}</h3>
							<p className="text-3xl font-bold text-[#00FFFF]">{performanceData.averageHolding}</p>
						</div>
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#00FFFF]/20">
							<h3 className="text-lg font-semibold text-gray-300">{t("copyTrade.trader.luisFernando.metrics.riskLevelLabel")}</h3>
							<p className="text-3xl font-bold text-[#00FFFF]">{performanceData.riskLevel}</p>
						</div>
					</div>

					<div className="mt-12 bg-[#0F2D3D] p-8 rounded-lg shadow-md text-center border border-[#00FFFF]/20">
						<h3 className="text-2xl font-bold mb-6 text-[#00FFFF]">{t("copyTrade.trader.luisFernando.metrics.specialtiesLabel")}</h3>
						<div className="flex flex-wrap gap-3 justify-center">
							{Array.isArray(performanceData.specialties)
								? performanceData.specialties.map((specialty: string, index: number) => (
										<span key={index} className="bg-[#001A2C] text-[#00FF7F] px-4 py-2 rounded-full font-medium border border-[#00FF7F]/30">
											{specialty}
										</span>
								  ))
								: null}
						</div>
					</div>
				</div>
			</section>

			{/* Trading Chart/Graph Section - Dark theme */}
			<section className="py-16 px-4 bg-[#0F2D3D]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#00FF7F] drop-shadow-[0_0_8px_rgba(0,255,127,0.5)]">{t("copyTrade.trader.history.title")}</h2>

					<div className="bg-[#001A2C] p-6 rounded-lg shadow-md relative border border-[#00FFFF]/20">
						<img src="/lf_mfx.png" alt={`${performanceData.name} ${t("copyTrade.trader.history.chartLabel")}`} className="w-full rounded-lg shadow-sm" />

						<a
							href="https://www.myfxbook.com/portfolio/btc-profit-rocket/11419775"
							target="_blank"
							rel="noopener noreferrer"
							className="absolute bottom-10 right-10 bg-[#4169E1] text-white px-4 py-2 rounded-full font-medium hover:bg-[#3A5FCD] transition-all duration-300 flex items-center gap-2 shadow-lg"
						>
							<span>{t("copyTrade.trader.luisFernando.viewOnMyfxbook")}</span>
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

			{/* How to Copy Trade - Dark blue theme */}
			<section className="py-16 px-4 bg-[#001428]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#00FFFF]">{t("copyTrade.trader.howToCopy.title")}</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center border border-[#FF1493]/20">
							<div className="bg-[#4169E1] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">1</div>
							<h3 className="text-xl font-semibold mb-3 text-[#00FFFF]">{t("copyTrade.trader.howToCopy.steps.0.title")}</h3>
							<p className="text-gray-300">{t("copyTrade.trader.howToCopy.steps.0.description")}</p>
						</div>
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center border border-[#FF1493]/20">
							<div className="bg-[#4169E1] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">2</div>
							<h3 className="text-xl font-semibold mb-3 text-[#00FFFF]">{t("copyTrade.trader.howToCopy.steps.1.title")}</h3>
							<p className="text-gray-300">{t("copyTrade.trader.howToCopy.steps.1.description")}</p>
						</div>
						<div className="bg-[#0F2D3D] p-6 rounded-lg shadow-md text-center border border-[#FF1493]/20">
							<div className="bg-[#4169E1] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold mx-auto">3</div>
							<h3 className="text-xl font-semibold mb-3 text-[#00FFFF]">{t("copyTrade.trader.howToCopy.steps.2.title")}</h3>
							<p className="text-gray-300">{t("copyTrade.trader.howToCopy.steps.2.description")}</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<button
							onClick={scrollToVideo}
							className="bg-[#FF1493] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF69B4] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						>
							{t("copyTrade.trader.howToCopy.cta")}
						</button>
					</div>
				</div>
			</section>

			{/* Lo Que Dicen Los Seguidores - Dark purple theme */}
			<section className="py-16 px-4 bg-[#1A0A2E]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#00FF7F] drop-shadow-[0_0_8px_rgba(0,255,127,0.5)]">{t("copyTrade.trader.testimonials.title")}</h2>

					<div className="grid md:grid-cols-3 gap-8">
						{(t("copyTrade.trader.testimonials.items", { returnObjects: true }) as any[]).map((item: any, index: number) => (
							<div key={index} className="bg-[#13082A] p-6 rounded-lg shadow-md border border-[#3D0A4F]">
								<div className="flex items-center mb-4">
									<div className="text-[#FFD700] text-xl">★★★★★</div>
								</div>
								<p className="italic mb-4 text-gray-300">"{item.text}"</p>
								<p className="font-semibold text-[#FF69B4]">- {item.author}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Preguntas Frecuentes - Dark teal theme */}
			<section className="py-16 px-4 bg-[#001A2C]">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#00FFFF]">{t("copyTrade.trader.faq.title")}</h2>

					<div className="space-y-4">
						{(t("copyTrade.trader.faq.questions", { returnObjects: true }) as any[]).map((item: any, index: number) => (
							<div key={index} className="bg-[#002A3A] p-6 rounded-lg shadow-md border border-[#0A2A3A]">
								<h3 className="text-xl font-semibold mb-2 text-[#00FF7F]">{item.question}</h3>
								<p className="text-gray-300">{item.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action - Dark theme with gradient */}
			<section ref={videoSectionRef} className="py-20 px-4 relative text-white">
				{/* Background Image with dark overlay */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: 'url("https://elite-trader-hub-imgs.s3.us-east-1.amazonaws.com/hero-bg-rpt.png")',
						backgroundSize: "cover",
						backgroundPosition: "center",
						filter: "brightness(0.3) contrast(1.2)",
					}}
				/>

				<div className="max-w-6xl mx-auto relative z-20">
					<h2 className="text-4xl font-bold text-center mb-12 text-[#00FFFF] drop-shadow-[0_0_10px_rgba(65,105,225,0.8)]">{t("copyTrade.trader.finalCta.title")}</h2>

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
							<h2 className="text-3xl font-bold mt-4 text-[#00FFFF]">{t("copyTrade.trader.finalCta.videoSection.title")}</h2>
						</div>
						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold mb-6 text-[#00FFFF]">{t("copyTrade.trader.finalCta.videoSection.howItWorks")}</h2>
							<ol className="space-y-4 text-lg text-gray-300">
								{(t("copyTrade.trader.finalCta.videoSection.steps", { returnObjects: true }) as string[]).map((step: string, index: number) => (
									<li key={index} className="flex gap-2">
										<span className="font-bold text-[#00FF7F]">{index + 1}.</span> {step}
									</li>
								))}
							</ol>
							<div className="flex gap-4 mt-6">
								<div className="flex justify-center gap-4 flex-wrap">
									<a href="https://apps.apple.com/us/app/axi-copy-trading/id1589937901" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
										<img src="https://d2tpnh780x5es.cloudfront.net/rebrand-prod/bjgbj352/ios-app-store.png" alt="Download on App Store" className="h-12" />
									</a>
									<a href="https://play.google.com/store/apps/details?id=com.axi.pelican" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
										<img src="https://d2tpnh780x5es.cloudfront.net/rebrand-prod/geoab2o3/google-play.png" alt="Get it on Google Play" className="h-12" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideo && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
					<div className="relative w-full max-w-4xl">
						<button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
						<div className="aspect-video">
							<iframe
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/9RSEBKCk3tI?autoplay=1"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
						<div className="mt-6 text-center">
							<p className="text-white mb-3">{t("copyTrade.trader.downloadApp")}</p>
							<div className="flex justify-center gap-4 flex-wrap">
								<a href="https://apps.apple.com/us/app/axi-copy-trading/id1589937901" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
									<img src="https://d2tpnh780x5es.cloudfront.net/rebrand-prod/bjgbj352/ios-app-store.png" alt="Download on App Store" className="h-12" />
								</a>
								<a href="https://play.google.com/store/apps/details?id=com.axi.pelican" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
									<img src="https://d2tpnh780x5es.cloudfront.net/rebrand-prod/geoab2o3/google-play.png" alt="Get it on Google Play" className="h-12" />
								</a>
							</div>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</main>
	);
};

export default LuisFernandoV1Profile;
