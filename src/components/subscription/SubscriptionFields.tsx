import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Link } from 'react-router-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface SubscriptionFormData {
	name: string;
	email: string;
	acceptTerms: boolean;
}

interface SubscriptionFieldsProps {
	register: UseFormRegister<SubscriptionFormData>;
	errors: FieldErrors<SubscriptionFormData>;
}

export function SubscriptionFields({ register, errors }: SubscriptionFieldsProps) {
	const { t } = useTranslation();

	return (
		<>
			<div className="space-y-2">
				<Label htmlFor="name" className="text-lg font-medium text-white">
					{t('subscription.nameLabel')}
				</Label>
				<Input id="name" type="text" placeholder={t('subscription.namePlaceholder')} className="w-full px-4 py-3 rounded-lg bg-white text-dark-gray border-0 focus:ring-2 focus:ring-bright-blue focus:border-transparent transition-all duration-200" {...register('name', { required: t('subscription.nameRequired') })} />
				{errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email" className="text-lg font-medium text-white">
					{t('subscription.emailLabel')}
				</Label>
				<Input
					id="email"
					type="email"
					placeholder={t('subscription.emailPlaceholder')}
					className="w-full px-4 py-3 rounded-lg bg-white text-dark-gray border-0 focus:ring-2 focus:ring-bright-blue focus:border-transparent transition-all duration-200"
					{...register('email', {
						required: t('subscription.emailRequired'),
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: t('subscription.emailInvalid'),
						},
					})}
				/>
				{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
			</div>

			<div className="flex items-center space-x-2">
				<Checkbox
					id="acceptTerms"
					className="h-5 w-5 border-2 border-white data-[state=checked]:bg-bright-blue data-[state=checked]:border-bright-blue"
					onCheckedChange={(checked) => {
						const event = {
							target: {
								name: 'acceptTerms',
								value: checked,
							},
						};
						register('acceptTerms').onChange(event);
					}}
				/>
				<Label htmlFor="acceptTerms" className="text-sm font-medium leading-none text-white/80 cursor-pointer">
					{t('subscription.termsLabel')}
					<Link to="/terms" className="text-bright-blue hover:text-bright-blue/80 underline" target="_blank" rel="noopener noreferrer">
						{t('subscription.termsLink')}
					</Link>
				</Label>
			</div>
			{errors.acceptTerms && <p className="text-red-400 text-sm mt-1">{t('subscription.termsRequired')}</p>}
		</>
	);
}
