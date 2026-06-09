import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { Save } from "lucide-react";
import { Globe } from "lucide-react";
import { useTranslate } from "@/i18n/hooks/useTranslate";

export default function PrayerConfig() {
	const { t } = useTranslate()

	// State dummy untuk koordinat, nanti bisa disambungin ke API
	const [city, setCity] = useState("Yogyakarta");
	const [lat, setLat] = useState("-7.7956");
	const [lng, setLng] = useState("110.3695");
	const [isLoading, setIsLoading] = useState(false);

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulasi loading simpan data ke database
		setTimeout(() => {
			setIsLoading(false);
			alert(t('prayer.saveSuccess'));
		}, 1000);
	};

	return (
		<div className='max-w-4xl mx-auto font-sans'>
			{/* Header Section */}
			<div className='mb-10 flex flex-col sm:flex-row sm:items-center gap-5'>
				<div className='w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0'>
					<MapPin className='h-8 w-8 text-simas-primary' />
				</div>
				<div>
					<h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2'>
						{t('prayer.configTitle')}
					</h1>
					<p className='text-slate-500 dark:text-slate-400 font-medium max-w-xl text-sm sm:text-base leading-relaxed'>
						{t('prayer.configDescription')}
					</p>
				</div>
			</div>

			{/* Form Card Container */}
			<div className='bg-white dark:bg-slate-900 p-6 sm:p-10 md:p-12 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden'>
				{/* Dekorasi Background Halus di dalam Card */}
				<div className='absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none'></div>

				<form onSubmit={handleSave} className='space-y-8 relative z-10'>
					{/* Input Nama Kota */}
					<div className='space-y-3'>
						<Label htmlFor='city' className='text-slate-700 dark:text-slate-300 font-bold text-base'>
							{t('prayer.cityLabel')}
						</Label>
						<div className='relative max-w-md'>
							<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
								<Globe className='h-5 w-5 text-slate-400' />
							</div>
							<Input
								id='city'
								value={city}
								onChange={(e) => setCity(e.target.value)}
								placeholder={t('prayer.cityPlaceholder')}
								className='h-12 pl-11 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 dark:text-white font-medium'
								required
							/>
						</div>
					</div>

					<div className='w-full h-px bg-slate-100'></div>

					{/* Input Koordinat Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='space-y-3'>
							<Label htmlFor='lat' className='text-slate-700 dark:text-slate-300 font-bold text-base'>
								{t('prayer.latitudeLabel')}
							</Label>
							<Input
								id='lat'
								value={lat}
								onChange={(e) => setLat(e.target.value)}
								placeholder='-6.2088'
								className='h-12 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 dark:text-white font-medium font-mono'
								required
							/>
							<p className='text-sm font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-1.5'>
								<span className='w-1.5 h-1.5 rounded-full bg-slate-300'></span>
								{t('prayer.latitudeExample')}
							</p>
						</div>

						<div className='space-y-3'>
							<Label htmlFor='lng' className='text-slate-700 dark:text-slate-300 font-bold text-base'>
								{t('prayer.longitudeLabel')}
							</Label>
							<Input
								id='lng'
								value={lng}
								onChange={(e) => setLng(e.target.value)}
								placeholder='106.8456'
								className='h-12 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 dark:text-white font-medium font-mono'
								required
							/>
							<p className='text-sm font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-1.5'>
								<span className='w-1.5 h-1.5 rounded-full bg-slate-300'></span>
								{t('prayer.longitudeExample')}
							</p>
						</div>
					</div>

					{/* Footer Action */}
					<div className='pt-8 mt-4 flex justify-end'>
						<Button
							type='submit'
							className='h-12 sm:w-auto w-full bg-simas-primary hover:bg-emerald-700 text-white px-8 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200'
							disabled={isLoading}
						>
							<Save className='mr-2.5 h-5 w-5' />
							{isLoading ? t('prayer.savingButton') : t('prayer.saveButton')}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
