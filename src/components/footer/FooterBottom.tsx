import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FooterBottom = () => {
	const { t } = useTranslation();
	const currentYear = new Date().getFullYear();

	return (
		<div className="border-t border-gray-700 pt-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="text-sm text-gray-400">
					© {currentYear} {t('footer.rightsReserved')}
				</div>

				<div className="flex gap-4 text-sm text-gray-400 md:justify-end">
					<Link to="/terms" className="hover:text-white">
						{t('footer.terms')}
					</Link>
					<Link to="/privacy" className="hover:text-white">
						{t('footer.privacy')}
					</Link>
				</div>
			</div>

			<div className="mt-8 text-xs text-gray-500 space-y-4">
				<p>{t('footer.companyNotice')}</p>
				<p>{t('footer.investmentDisclaimer')}</p>
				<p>{t('footer.technicalSolution')}</p>
				<p>{t('footer.restrictedCountries')}</p>
			</div>
		</div>
	);
};

export default FooterBottom;
