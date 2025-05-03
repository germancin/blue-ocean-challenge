import { useState } from "react";
import { useTranslation } from "react-i18next";
import CopyTradeNavbar from "../../components/CopyTradeNavbar";
import Footer from "../../components/Footer";
import CopyTradeRegistrationDialog from "../../components/CopyTradeRegistrationDialog";

const CopyTradeIndex = () => {
	const { t } = useTranslation();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
					<h1 className="text-4xl md:text-5xl font-bold mb-6">{t("copyTrade.index.hero.title")}</h1>
					<p className="text-xl mb-8">{t("copyTrade.index.hero.subtitle")}</p>
					<button
						className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						onClick={() => setIsDialogOpen(true)}
					>
						{t("copyTrade.index.hero.cta")}
					</button>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">{t("copyTrade.index.benefits.title")}</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.benefits.tools.title")}</h3>
							<p>{t("copyTrade.index.benefits.tools.description")}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.benefits.following.title")}</h3>
							<p>{t("copyTrade.index.benefits.following.description")}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.benefits.income.title")}</h3>
							<p>{t("copyTrade.index.benefits.income.description")}</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">{t("copyTrade.index.howItWorks.title")}</h2>

					<div className="grid md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
							<h3 className="text-xl font-semibold mb-2">{t("copyTrade.index.howItWorks.steps.0.title")}</h3>
							<p>{t("copyTrade.index.howItWorks.steps.0.description")}</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
							<h3 className="text-xl font-semibold mb-2">{t("copyTrade.index.howItWorks.steps.1.title")}</h3>
							<p>{t("copyTrade.index.howItWorks.steps.1.description")}</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
							<h3 className="text-xl font-semibold mb-2">{t("copyTrade.index.howItWorks.steps.2.title")}</h3>
							<p>{t("copyTrade.index.howItWorks.steps.2.description")}</p>
						</div>
						<div className="text-center">
							<div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
							<h3 className="text-xl font-semibold mb-2">{t("copyTrade.index.howItWorks.steps.3.title")}</h3>
							<p>{t("copyTrade.index.howItWorks.steps.3.description")}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Traders Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">{t("copyTrade.index.featuredTraders.title")}</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="/luis_fernando.png" alt="Luis Fernando" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
							<h3 className="text-xl font-semibold text-center mb-2">Luis Fernando</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+287% ROI (1 Year)</p>
							<a href="/copy-trade/luis_fernando" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								{t("copyTrade.index.featuredTraders.viewProfile")}
							</a>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/150/cccccc/666666?text=" alt="Sarah Chen" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-300" />
							<h3 className="text-xl font-semibold text-center mb-2">Sarah Chen</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+194% ROI (1 Year)</p>
							<a href="#" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								{t("copyTrade.index.featuredTraders.viewProfile")}
							</a>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/150/cccccc/666666?text=" alt="Marcus Johnson" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-300" />
							<h3 className="text-xl font-semibold text-center mb-2">Marcus Johnson</h3>
							<p className="text-center text-green-600 font-semibold mb-4">+215% ROI (1 Year)</p>
							<a href="#" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
								{t("copyTrade.index.featuredTraders.viewProfile")}
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Professional Development Section */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">{t("copyTrade.index.development.title")}</h2>
					<p className="text-xl text-center mb-8">{t("copyTrade.index.development.subtitle")}</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.development.training.title")}</h3>
							<p>{t("copyTrade.index.development.training.description")}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.development.mentorship.title")}</h3>
							<p>{t("copyTrade.index.development.mentorship.description")}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.development.riskManagement.title")}</h3>
							<p>{t("copyTrade.index.development.riskManagement.description")}</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-3">{t("copyTrade.index.development.careerPath.title")}</h3>
							<p>{t("copyTrade.index.development.careerPath.description")}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 px-4 bg-blue-600 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6">{t("copyTrade.index.cta.title")}</h2>
					<p className="text-xl mb-8">{t("copyTrade.index.cta.subtitle")}</p>
					<button
						className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						onClick={() => setIsDialogOpen(true)}
					>
						{t("copyTrade.index.cta.button")}
					</button>
				</div>
			</section>

			<Footer />

			{/* Registration Dialog */}
			<CopyTradeRegistrationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
		</main>
	);
};

export default CopyTradeIndex;
