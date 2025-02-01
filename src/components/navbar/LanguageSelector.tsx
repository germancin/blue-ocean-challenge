import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
	const { i18n } = useTranslation();

	const languages = [
		{ code: 'en', name: '🇺🇸' },
		{ code: 'es', name: '🇪🇸' },
		{ code: 'pt', name: '🇧🇷' },
	];

	// Find the current language flag
	const getCurrentFlag = () => {
		return languages.find(lang => lang.code === i18n.language)?.name || languages[0].name;
	};

	return (
		<Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
			<SelectTrigger className="w-[60px] bg-transparent text-white border-white/20">
				<SelectValue>
					{getCurrentFlag()}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{languages.map((lang) => (
					<SelectItem key={lang.code} value={lang.code}>
						{lang.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default LanguageSelector;