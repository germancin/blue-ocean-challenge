import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CopyTradeRegistrationFormData {
	name: string;
	email: string;
	phone: string;
	mfxAccount: string;
}

interface CopyTradeRegistrationFormProps {
	onSuccess: () => void;
}

export function CopyTradeRegistrationForm({ onSuccess }: CopyTradeRegistrationFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CopyTradeRegistrationFormData>();

	const onSubmit = async (data: CopyTradeRegistrationFormData) => {
		try {
			setIsLoading(true);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Here you would typically send the data to your backend
			console.log("Form submitted:", data);

			// Show success message
			setIsSuccess(true);
			reset();

			// Close the dialog after a delay
			setTimeout(() => {
				onSuccess();
			}, 3000);
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="text-center py-8">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 className="text-xl font-semibold mb-2 text-white">{t("copyTradeRegistration.successTitle")}</h3>
				<p className="text-gray-300">{t("copyTradeRegistration.successMessage")}</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name" className="text-white">
					{t("copyTradeRegistration.nameLabel")}
				</Label>
				<Input id="name" type="text" className="bg-white/10 border-white/20 text-white" {...register("name", { required: t("copyTradeRegistration.nameRequired") })} />
				{errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email" className="text-white">
					{t("copyTradeRegistration.emailLabel")}
				</Label>
				<Input
					id="email"
					type="email"
					className="bg-white/10 border-white/20 text-white"
					{...register("email", {
						required: t("copyTradeRegistration.emailRequired"),
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: t("copyTradeRegistration.emailInvalid"),
						},
					})}
				/>
				{errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone" className="text-white">
					{t("copyTradeRegistration.phoneLabel")}
				</Label>
				<Input id="phone" type="tel" className="bg-white/10 border-white/20 text-white" {...register("phone", { required: t("copyTradeRegistration.phoneRequired") })} />
				{errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="mfxAccount" className="text-white">
					{t("copyTradeRegistration.mfxAccountLabel")}
				</Label>
				<Input id="mfxAccount" type="text" className="bg-white/10 border-white/20 text-white" {...register("mfxAccount", { required: t("copyTradeRegistration.mfxAccountRequired") })} />
				{errors.mfxAccount && <p className="text-red-400 text-sm">{errors.mfxAccount.message}</p>}
			</div>

			<Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" disabled={isLoading}>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						{t("copyTradeRegistration.submitting")}
					</>
				) : (
					t("copyTradeRegistration.register")
				)}
			</Button>
		</form>
	);
}
