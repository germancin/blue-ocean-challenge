import { Card, CardContent } from '@/components/ui/card';
import { Clock, Bell, Shield, HelpCircle, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = { Clock, Bell, Shield, HelpCircle, Trophy };

interface SectionItem {
	icon: LucideIcon;
	title: string;
	description: string | string[];
	color: string;
}

interface SectionTranslationItem {
	icon: string; // The icon as a string from the JSON translation
	title: string;
	description: string | string[];
	color: string;
}

interface Section {
	id: string;
	title: string;
	items: SectionItem[];
}

export function PaymentInformationCard() {
	const { t } = useTranslation();

	const sections: Section[] = ['paymentWorks', 'whyUsdt', 'support', 'benefits'].map((key) => ({
		id: key,
		title: t(`paymentCard.sections.${key}.title`),
		items: (t(`paymentCard.sections.${key}.items`, { returnObjects: true }) as SectionTranslationItem[]).map((item) => ({
			...item,
			icon: icons[item.icon], // Map the string icon to the corresponding LucideIcon
		})),
	}));

	return (
		<Card>
			<CardContent className="pt-4">
				<div className="space-y-6">
					{sections.map((section) => (
						<div key={section.id} className="space-y-3">
							<h2 className="text-xl font-semibold" style={{ fontSize: '1.1rem', lineHeight: '1.4rem' }}>
								{section.title}
							</h2>
							<div className="space-y-4">
								{section.items.map((item, index) => {
									const IconComponent = item.icon;
									return (
										<div key={index} className="flex items-start space-x-3">
											<div className={`${item.color} p-2 rounded-full bg-gray-50 flex-shrink-0`}>
												<IconComponent className="h-5 w-5" />
											</div>
											<div className="space-y-1">
												<h3 className="font-medium" style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>
													{item.title}
												</h3>
												{Array.isArray(item.description) ? (
													<ul className="space-y-1 list-disc pl-3">
														{item.description.map((bullet, idx) => (
															<li key={idx} style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }} className="text-gray-600">
																{bullet}
															</li>
														))}
													</ul>
												) : (
													<p className="text-gray-600" style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>
														{item.description}
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
