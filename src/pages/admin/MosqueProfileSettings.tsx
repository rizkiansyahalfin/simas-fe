import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Building2 } from "lucide-react";
import { Globe } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
import { Save } from "lucide-react";
import { Trash2 } from "lucide-react";
import { UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MosqueProfileForm {
	name: string;
	address: string;
	phone: string;
	email: string;
	website: string;
	manager: string;
	description: string;
}

const initialProfile: MosqueProfileForm = {
	name: "Masjid Al-Ikhlas",
	address: "Jl. Masjid Raya No. 12, Yogyakarta",
	phone: "0274-123456",
	email: "info@masjidalikhlas.or.id",
	website: "https://masjidalikhlas.or.id",
	manager: "Ust. Ahmad Fauzi",
	description:
		"Pusat kegiatan ibadah, pendidikan, dan sosial jamaah sekitar masjid.",
};

export default function MosqueProfileSettings() {
	const [form, setForm] = useState<MosqueProfileForm>(initialProfile);
	const [logoPreview, setLogoPreview] = useState<string>("");
	const [qrisPreview, setQrisPreview] = useState<string>("");
	const [isSaving, setIsSaving] = useState(false);

	const updateField =
		(field: keyof MosqueProfileForm) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((current) => ({ ...current, [field]: event.target.value }));
		};

	const handleImageUpload =
		(target: "logo" | "qris") => (event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = () => {
				const preview = typeof reader.result === "string" ? reader.result : "";
				if (target === "logo") {
					setLogoPreview(preview);
				} else {
					setQrisPreview(preview);
				}
			};
			reader.readAsDataURL(file);
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSaving(true);

		setTimeout(() => {
			setIsSaving(false);
			alert("Profil masjid berhasil disimpan.");
		}, 800);
	};

	return (
		<div className='mx-auto max-w-7xl space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm font-semibold text-simas-primary'>Superadmin</p>
					<h1 className='mt-1 text-2xl font-bold text-slate-900 sm:text-3xl'>
						Pengaturan Profil Masjid
					</h1>
					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500'>
						Edit informasi masjid, unggah logo dan QRIS, lalu lihat hasilnya langsung di preview.
					</p>
				</div>
			</div>

			<div className='grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]'>
				<form
					onSubmit={handleSubmit}
					className='space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'
				>
					<section className='space-y-5'>
						<div className='flex items-center gap-3 border-b border-slate-100 pb-4'>
							<div className='flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-simas-primary'>
								<Building2 className='size-5' />
							</div>
							<div>
								<h2 className='text-base font-bold text-slate-900'>Informasi Masjid</h2>
								<p className='text-sm text-slate-500'>Data utama yang ditampilkan ke publik.</p>
							</div>
						</div>

						<div className='grid gap-5 md:grid-cols-2'>
							<div className='space-y-2 md:col-span-2'>
								<Label htmlFor='name'>Nama Masjid</Label>
								<Input
									id='name'
									value={form.name}
									onChange={updateField("name")}
									className='h-11 bg-slate-50'
									required
								/>
							</div>

							<div className='space-y-2 md:col-span-2'>
								<Label htmlFor='address'>Alamat Lengkap</Label>
								<Textarea
									id='address'
									value={form.address}
									onChange={updateField("address")}
									className='min-h-24 resize-none bg-slate-50'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='phone'>Nomor Telepon</Label>
								<div className='relative'>
									<Phone className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
									<Input
										id='phone'
										value={form.phone}
										onChange={updateField("phone")}
										className='h-11 bg-slate-50 pl-9'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<div className='relative'>
									<Mail className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
									<Input
										id='email'
										type='email'
										value={form.email}
										onChange={updateField("email")}
										className='h-11 bg-slate-50 pl-9'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='website'>Website</Label>
								<div className='relative'>
									<Globe className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
									<Input
										id='website'
										type='url'
										value={form.website}
										onChange={updateField("website")}
										className='h-11 bg-slate-50 pl-9'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='manager'>Penanggung Jawab</Label>
								<div className='relative'>
									<UserRound className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
									<Input
										id='manager'
										value={form.manager}
										onChange={updateField("manager")}
										className='h-11 bg-slate-50 pl-9'
										required
									/>
								</div>
							</div>

							<div className='space-y-2 md:col-span-2'>
								<Label htmlFor='description'>Deskripsi Singkat</Label>
								<Textarea
									id='description'
									value={form.description}
									onChange={updateField("description")}
									className='min-h-28 resize-none bg-slate-50'
									required
								/>
							</div>
						</div>
					</section>

					<section className='space-y-5 border-t border-slate-100 pt-6'>
						<div className='flex items-center gap-3'>
							<div className='flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-simas-primary'>
								<ImagePlus className='size-5' />
							</div>
							<div>
								<h2 className='text-base font-bold text-slate-900'>Logo dan QRIS</h2>
								<p className='text-sm text-slate-500'>Upload gambar untuk ditampilkan pada preview.</p>
							</div>
						</div>

						<div className='grid gap-5 md:grid-cols-2'>
							<ImageUploadBox
								id='logo'
								label='Logo Masjid'
								preview={logoPreview}
								onChange={handleImageUpload("logo")}
								onRemove={() => setLogoPreview("")}
							/>
							<ImageUploadBox
								id='qris'
								label='QRIS Donasi'
								preview={qrisPreview}
								onChange={handleImageUpload("qris")}
								onRemove={() => setQrisPreview("")}
							/>
						</div>
					</section>

					<div className='flex justify-end border-t border-slate-100 pt-6'>
						<Button type='submit' className='h-11 w-full bg-simas-primary px-6 font-bold sm:w-auto'>
							<Save className='mr-2 size-4' />
							{isSaving ? "Menyimpan..." : "Simpan Profil"}
						</Button>
					</div>
				</form>

				<aside className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-24 xl:self-start'>
					<div className='mb-5'>
						<h2 className='text-base font-bold text-slate-900'>Live Preview</h2>
						<p className='mt-1 text-sm text-slate-500'>Tampilan akan berubah saat form diedit.</p>
					</div>

					<div className='overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'>
						<div className='bg-white p-5'>
							<div className='flex items-start gap-4'>
								<div className='flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 text-simas-primary'>
									{logoPreview ? (
										<img src={logoPreview} alt='Preview logo masjid' className='size-full object-cover' />
									) : (
										<Building2 className='size-8' />
									)}
								</div>
								<div className='min-w-0'>
									<h3 className='break-words text-xl font-bold text-slate-900'>{form.name}</h3>
									<p className='mt-1 flex items-start gap-2 text-sm leading-5 text-slate-500'>
										<MapPin className='mt-0.5 size-4 shrink-0 text-simas-primary' />
										<span>{form.address}</span>
									</p>
								</div>
							</div>

							<p className='mt-5 text-sm leading-6 text-slate-600'>{form.description}</p>

							<div className='mt-5 space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600'>
								<p className='flex items-center gap-2'>
									<Phone className='size-4 text-simas-primary' />
									{form.phone}
								</p>
								<p className='flex items-center gap-2 break-all'>
									<Mail className='size-4 shrink-0 text-simas-primary' />
									{form.email}
								</p>
								<p className='flex items-center gap-2 break-all'>
									<Globe className='size-4 shrink-0 text-simas-primary' />
									{form.website}
								</p>
								<p className='flex items-center gap-2'>
									<UserRound className='size-4 text-simas-primary' />
									{form.manager}
								</p>
							</div>
						</div>

						<div className='border-t border-slate-200 bg-white p-5'>
							<p className='mb-3 text-sm font-bold text-slate-900'>QRIS Donasi</p>
							<div className='flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50'>
								{qrisPreview ? (
									<img src={qrisPreview} alt='Preview QRIS donasi' className='size-full object-contain' />
								) : (
									<div className='text-center text-sm font-medium text-slate-400'>
										<ImagePlus className='mx-auto mb-2 size-8' />
										Belum ada QRIS
									</div>
								)}
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}

function ImageUploadBox({
	id,
	label,
	preview,
	onChange,
	onRemove,
}: {
	id: string;
	label: string;
	preview: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onRemove: () => void;
}) {
	return (
		<div className='space-y-2'>
			<Label htmlFor={id}>{label}</Label>
			<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4'>
				{preview ? (
					<div className='flex items-center gap-4'>
						<img src={preview} alt={`Preview ${label}`} className='size-20 rounded-lg object-cover' />
						<div className='min-w-0 flex-1'>
							<p className='text-sm font-semibold text-slate-800'>{label} terunggah</p>
							<p className='text-xs text-slate-500'>Preview sudah diperbarui.</p>
						</div>
						<Button type='button' variant='ghost' size='icon' onClick={onRemove} aria-label={`Hapus ${label}`}>
							<Trash2 className='size-4 text-red-500' />
						</Button>
					</div>
				) : (
					<Label
						htmlFor={id}
						className='flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg text-center text-slate-500'
					>
						<ImagePlus className='size-8 text-simas-primary' />
						<span className='text-sm font-semibold'>Pilih gambar</span>
						<span className='text-xs'>PNG, JPG, atau JPEG</span>
					</Label>
				)}
				<Input id={id} type='file' accept='image/png,image/jpeg,image/jpg' onChange={onChange} className='sr-only' />
			</div>
		</div>
	);
}
