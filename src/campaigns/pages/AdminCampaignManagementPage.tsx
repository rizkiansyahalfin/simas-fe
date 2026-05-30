import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
	Archive,
	CalendarDays,
	CheckCircle2,
	Edit,
	Eye,
	ImagePlus,
	Megaphone,
	Plus,
	Save,
	Square,
	Trash2,
	XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatRupiah } from "@/utils/formatRupiah";

type CampaignStatus = "active" | "closed" | "archived";

interface ManagedCampaign {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	collectedAmount: number;
	targetAmount: number;
	donorCount: number;
	deadline: string;
	status: CampaignStatus;
}

interface CampaignFormState {
	title: string;
	description: string;
	imageUrl: string;
	targetAmount: string;
	collectedAmount: string;
	donorCount: string;
	deadline: string;
	status: CampaignStatus;
}

const initialCampaigns: ManagedCampaign[] = [
	{
		id: "1",
		title: "Renovasi Tempat Wudhu",
		description: "Membantu renovasi tempat wudhu masjid agar lebih nyaman.",
		imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
		collectedAmount: 15000000,
		targetAmount: 50000000,
		donorCount: 128,
		deadline: "2026-06-30",
		status: "active",
	},
	{
		id: "2",
		title: "Santunan Anak Yatim",
		description: "Program santunan bulanan untuk anak yatim dan dhuafa.",
		imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
		collectedAmount: 8500000,
		targetAmount: 20000000,
		donorCount: 74,
		deadline: "2026-06-10",
		status: "active",
	},
	{
		id: "3",
		title: "Pengadaan Karpet Masjid",
		description: "Penggalangan dana untuk mengganti karpet utama ruang shalat.",
		imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f",
		collectedAmount: 32000000,
		targetAmount: 32000000,
		donorCount: 211,
		deadline: "2026-05-20",
		status: "closed",
	},
];

const emptyForm: CampaignFormState = {
	title: "",
	description: "",
	imageUrl: "",
	targetAmount: "",
	collectedAmount: "0",
	donorCount: "0",
	deadline: "",
	status: "active",
};

const statusLabel: Record<CampaignStatus, string> = {
	active: "Aktif",
	closed: "Ditutup",
	archived: "Diarsipkan",
};

const statusClassName: Record<CampaignStatus, string> = {
	active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
	closed: "bg-amber-50 text-amber-700 border border-amber-200",
	archived: "bg-slate-100 text-slate-600 border border-slate-200",
};

export default function AdminCampaignManagementPage() {
	const [campaigns, setCampaigns] = useState<ManagedCampaign[]>(initialCampaigns);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState<CampaignFormState>(emptyForm);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setCampaigns((current) =>
				current.map((campaign) => {
					if (campaign.status !== "active" || campaign.collectedAmount >= campaign.targetAmount) {
						return campaign;
					}

					const increment = Math.min(
						Math.round(campaign.targetAmount * 0.003),
						campaign.targetAmount - campaign.collectedAmount,
					);

					return {
						...campaign,
						collectedAmount: campaign.collectedAmount + increment,
						donorCount: campaign.donorCount + 1,
					};
				}),
			);
		}, 5000);

		return () => window.clearInterval(timer);
	}, []);

	const stats = useMemo(() => {
		const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active");
		const totalCollected = campaigns.reduce(
			(total, campaign) => total + campaign.collectedAmount,
			0,
		);
		const totalTarget = activeCampaigns.reduce(
			(total, campaign) => total + campaign.targetAmount,
			0,
		);

		return {
			activeCount: activeCampaigns.length,
			archivedCount: campaigns.filter((campaign) => campaign.status === "archived").length,
			totalCollected,
			totalTarget,
		};
	}, [campaigns]);

	const openCreateDialog = () => {
		setEditingId(null);
		setForm(emptyForm);
		setIsDialogOpen(true);
	};

	const openEditDialog = (campaign: ManagedCampaign) => {
		setEditingId(campaign.id);
		setForm({
			title: campaign.title,
			description: campaign.description,
			imageUrl: campaign.imageUrl,
			targetAmount: String(campaign.targetAmount),
			collectedAmount: String(campaign.collectedAmount),
			donorCount: String(campaign.donorCount),
			deadline: campaign.deadline,
			status: campaign.status,
		});
		setIsDialogOpen(true);
	};

	const updateForm =
		(field: keyof CampaignFormState) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setForm((current) => ({
				...current,
				[field]: event.target.value,
			}));
		};

	const handleThumbnailUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			setForm((current) => ({
				...current,
				imageUrl: typeof reader.result === "string" ? reader.result : current.imageUrl,
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const payload: ManagedCampaign = {
			id: editingId ?? crypto.randomUUID(),
			title: form.title.trim(),
			description: form.description.trim(),
			imageUrl: form.imageUrl,
			targetAmount: Number(form.targetAmount),
			collectedAmount: Number(form.collectedAmount),
			donorCount: Number(form.donorCount),
			deadline: form.deadline,
			status: form.status,
		};

		setCampaigns((current) => {
			if (!editingId) return [payload, ...current];
			return current.map((campaign) => (campaign.id === editingId ? payload : campaign));
		});

		setIsDialogOpen(false);
		setEditingId(null);
		setForm(emptyForm);
	};

	const updateStatus = (id: string, status: CampaignStatus) => {
		setCampaigns((current) =>
			current.map((campaign) => (campaign.id === id ? { ...campaign, status } : campaign)),
		);
	};

	return (
		<div className='mx-auto max-w-7xl space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm font-semibold text-simas-primary'>Admin</p>
					<h1 className='mt-1 text-2xl font-bold text-slate-900 sm:text-3xl'>
						Manajemen Campaign
					</h1>
					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500'>
						Buat, edit, pantau progress, tutup, dan arsipkan campaign donasi masjid.
					</p>
				</div>

				<Button type='button' onClick={openCreateDialog} className='h-11 bg-simas-primary font-bold'>
					<Plus className='mr-2 size-4' />
					Buat Campaign
				</Button>
			</div>

			<div className='grid gap-4 md:grid-cols-4'>
				<StatCard label='Campaign Aktif' value={String(stats.activeCount)} icon={Megaphone} />
				<StatCard label='Dana Terkumpul' value={formatRupiah(stats.totalCollected)} icon={CheckCircle2} />
				<StatCard label='Target Aktif' value={formatRupiah(stats.totalTarget)} icon={Eye} />
				<StatCard label='Diarsipkan' value={String(stats.archivedCount)} icon={Archive} />
			</div>

			<div className='rounded-2xl border border-slate-200 bg-white shadow-sm'>
				<div className='flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4'>
					<div>
						<h2 className='font-bold text-slate-900'>Daftar Campaign</h2>
						<p className='text-sm text-slate-500'>Progress aktif diperbarui otomatis setiap beberapa detik.</p>
					</div>
					<span className='inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700'>
						<span className='size-2 rounded-full bg-emerald-500' />
						Live
					</span>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Campaign</TableHead>
							<TableHead>Progress</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Deadline</TableHead>
							<TableHead className='text-right'>Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{campaigns.map((campaign) => (
							<TableRow key={campaign.id}>
								<TableCell>
									<div className='flex min-w-72 items-center gap-3'>
										<img
											src={campaign.imageUrl}
											alt={campaign.title}
											className='size-16 rounded-xl object-cover'
										/>
										<div className='min-w-0'>
											<p className='font-bold text-slate-900'>{campaign.title}</p>
											<p className='mt-1 line-clamp-2 text-sm text-slate-500'>
												{campaign.description}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<CampaignProgressMeter campaign={campaign} />
								</TableCell>
								<TableCell>
									<Badge className={statusClassName[campaign.status]}>
										{statusLabel[campaign.status]}
									</Badge>
								</TableCell>
								<TableCell>
									<div className='flex items-center gap-2 text-sm text-slate-600'>
										<CalendarDays className='size-4 text-simas-primary' />
										{campaign.deadline}
									</div>
								</TableCell>
								<TableCell>
									<div className='flex justify-end gap-2'>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => openEditDialog(campaign)}
										>
											<Edit className='mr-2 size-4' />
											Edit
										</Button>

										{campaign.status === "active" && (
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() => updateStatus(campaign.id, "closed")}
											>
												<XCircle className='mr-2 size-4' />
												Tutup
											</Button>
										)}

										{campaign.status !== "archived" && (
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() => updateStatus(campaign.id, "archived")}
											>
												<Archive className='mr-2 size-4' />
												Arsipkan
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<CampaignFormDialog
				form={form}
				isOpen={isDialogOpen}
				isEditing={Boolean(editingId)}
				onChange={updateForm}
				onClose={() => setIsDialogOpen(false)}
				onSubmit={handleSubmit}
				onThumbnailUpload={handleThumbnailUpload}
				onRemoveThumbnail={() => setForm((current) => ({ ...current, imageUrl: "" }))}
			/>
		</div>
	);
}

function StatCard({
	label,
	value,
	icon: Icon,
}: {
	label: string;
	value: string;
	icon: LucideIcon;
}) {
	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
			<div className='mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-simas-primary'>
				<Icon className='size-5' />
			</div>
			<p className='text-sm font-medium text-slate-500'>{label}</p>
			<p className='mt-1 break-words text-xl font-bold text-slate-900'>{value}</p>
		</div>
	);
}

function CampaignProgressMeter({ campaign }: { campaign: ManagedCampaign }) {
	const percentage = Math.min((campaign.collectedAmount / campaign.targetAmount) * 100, 100);

	return (
		<div className='w-64 space-y-2'>
			<div className='flex items-center justify-between text-xs font-semibold text-slate-500'>
				<span>{formatRupiah(campaign.collectedAmount)}</span>
				<span>{Math.round(percentage)}%</span>
			</div>
			<div className='h-3 overflow-hidden rounded-full bg-slate-100'>
				<div
					className='h-full rounded-full bg-simas-primary transition-all duration-700'
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<p className='text-xs text-slate-500'>
				Target {formatRupiah(campaign.targetAmount)} dari {campaign.donorCount} donatur
			</p>
		</div>
	);
}

function CampaignFormDialog({
	form,
	isOpen,
	isEditing,
	onChange,
	onClose,
	onSubmit,
	onThumbnailUpload,
	onRemoveThumbnail,
}: {
	form: CampaignFormState;
	isOpen: boolean;
	isEditing: boolean;
	onChange: (
		field: keyof CampaignFormState,
	) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	onClose: () => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onThumbnailUpload: (event: ChangeEvent<HTMLInputElement>) => void;
	onRemoveThumbnail: () => void;
}) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-3xl'>
				<DialogHeader>
					<DialogTitle>{isEditing ? "Edit Campaign" : "Buat Campaign"}</DialogTitle>
					<DialogDescription>
						Isi informasi campaign dan upload thumbnail untuk kartu campaign.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={onSubmit} className='space-y-5'>
					<div className='grid gap-5 md:grid-cols-[240px_minmax(0,1fr)]'>
						<div className='space-y-2'>
							<Label>Thumbnail</Label>
							<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3'>
								{form.imageUrl ? (
									<div className='space-y-3'>
										<img
											src={form.imageUrl}
											alt='Preview thumbnail campaign'
											className='aspect-video w-full rounded-lg object-cover'
										/>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={onRemoveThumbnail}
											className='w-full'
										>
											<Trash2 className='mr-2 size-4' />
											Hapus Thumbnail
										</Button>
									</div>
								) : (
									<Label
										htmlFor='campaign-thumbnail'
										className='flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-lg text-center text-slate-500'
									>
										<ImagePlus className='size-8 text-simas-primary' />
										<span className='text-sm font-semibold'>Upload thumbnail</span>
										<span className='text-xs'>PNG, JPG, atau JPEG</span>
									</Label>
								)}
								<Input
									id='campaign-thumbnail'
									type='file'
									accept='image/png,image/jpeg,image/jpg'
									onChange={onThumbnailUpload}
									className='sr-only'
								/>
							</div>
						</div>

						<div className='grid gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='campaign-title'>Judul Campaign</Label>
								<Input
									id='campaign-title'
									value={form.title}
									onChange={onChange("title")}
									className='h-11 bg-slate-50'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='campaign-description'>Deskripsi</Label>
								<Textarea
									id='campaign-description'
									value={form.description}
									onChange={onChange("description")}
									className='min-h-28 resize-none bg-slate-50'
									required
								/>
							</div>

							<div className='grid gap-4 sm:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='campaign-target'>Target Dana</Label>
									<Input
										id='campaign-target'
										type='number'
										min='1'
										value={form.targetAmount}
										onChange={onChange("targetAmount")}
										className='h-11 bg-slate-50'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='campaign-collected'>Dana Terkumpul</Label>
									<Input
										id='campaign-collected'
										type='number'
										min='0'
										value={form.collectedAmount}
										onChange={onChange("collectedAmount")}
										className='h-11 bg-slate-50'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='campaign-donor'>Jumlah Donatur</Label>
									<Input
										id='campaign-donor'
										type='number'
										min='0'
										value={form.donorCount}
										onChange={onChange("donorCount")}
										className='h-11 bg-slate-50'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='campaign-deadline'>Deadline</Label>
									<Input
										id='campaign-deadline'
										type='date'
										value={form.deadline}
										onChange={onChange("deadline")}
										className='h-11 bg-slate-50'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='campaign-status'>Status</Label>
								<select
									id='campaign-status'
									value={form.status}
									onChange={onChange("status")}
									className='h-11 w-full rounded-lg border border-input bg-slate-50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
								>
									<option value='active'>Aktif</option>
									<option value='closed'>Ditutup</option>
									<option value='archived'>Diarsipkan</option>
								</select>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button type='button' variant='outline' onClick={onClose}>
							<Square className='mr-2 size-4' />
							Batal
						</Button>
						<Button type='submit' className='bg-simas-primary font-bold'>
							<Save className='mr-2 size-4' />
							{isEditing ? "Simpan Perubahan" : "Simpan Campaign"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
