import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Terms = () => {
	const { t } = useTranslation();

	return (
		<main className="min-h-screen bg-navy">
			<Navbar />
			<div className="container mx-auto px-4 py-24 max-w-4xl">
				<h1 className="text-4xl font-bold mb-8 text-white">{t('terms.title')}</h1>

				<div className="space-y-6 text-light-gray">
					{/* Section 1 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.generalDescriptionTitle')}</h2>
						<p dangerouslySetInnerHTML={{ __html: t("terms.sections.generalDescriptionContent").replace(/\n/g, "<br>") }} />
					</section>

					{/* Section 2 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.eligibilityTitle')}</h2>
						<ul className="list-disc pl-6 space-y-2">
							{(t('terms.sections.eligibilityList', { returnObjects: true }) as string[]).map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</section>

					{/* Section 3 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.contestRulesTitle')}</h2>
						<ul className="list-disc pl-6 space-y-2">
							{(t('terms.sections.contestRulesList', { returnObjects: true }) as string[]).map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</section>

					{/* Section 4 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.prizeDistributionTitle')}</h2>
						<p>{t('terms.sections.prizeDistributionContent')}</p>
					</section>

					{/* Section 5 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.disqualificationTitle')}</h2>
						<p>{t('terms.sections.disqualificationIntro')}</p>
						<ul className="list-disc pl-6 space-y-2">
							{(t('terms.sections.disqualificationList', { returnObjects: true }) as string[]).map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</section>

					{/* Section 6 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.liabilityTitle')}</h2>
						<p dangerouslySetInnerHTML={{ __html: t("terms.sections.liabilityContent").replace(/\n/g, "<br>") }} />
					</section>
					
					{/* Section 7 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">
							{t('terms.sections.limitresponTitle')}
						</h2>
						<ul className="list-disc pl-6 space-y-2">
							{(t('terms.sections.limitresponList', { returnObjects: true }) as string[]).map((item, index) => {
							const parts = item.split(":"); 
							return (
								<li key={index}>
									{parts.length > 1 ? (
									<>
									<strong>{parts[0]}:</strong> {parts.slice(1).join(":")}
										</>
										) : (
											item 
										)}
								</li>
								);
							})}
						</ul>
					</section>


					{/* Section 8 */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">{t('terms.sections.termsChangesTitle')}</h2>
						<p>{t('terms.sections.termsChangesContent')}</p>
					</section>
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default Terms;
