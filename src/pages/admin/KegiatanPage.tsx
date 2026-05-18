import { useMemo, useState } from "react";
import {
	CalendarDays,
	MapPin,
	Pencil,
	Trash2,
} from "lucide-react";

import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Badge from "@/components/ui/badge"

type EventStatus = "upcoming" | "ongoing" | "finished";

interface EventItem {
	id: number;
	title: string;
	date: string;
	location: string;
	description: string;
	status: EventStatus;
}

const INITIAL_EVENTS: EventItem[] = [
	{
		id: 1,
		title: "Kajian Tafsir Jumat",
		date: "2026-05-20",
		location: "Aula Masjid",
		description: "Kajian rutin tafsir Al-Qur'an bersama ustadz.",
		status: "upcoming",
	},
	{
		id: 2,
		title: "Bakti Sosial Ramadhan",
		date: "2026-05-12",
		location: "Halaman Masjid",
		description: "Kegiatan berbagi sembako untuk masyarakat.",
		status: "ongoing",
	},
];

const STATUS_OPTIONS: EventStatus[] = [
	"upcoming",
	"ongoing",
	"finished",
];

function getStatusBadge(status: EventStatus) {
	switch (status) {
		case "upcoming":
			return "bg-yellow-100 text-yellow-700 border-yellow-200";
		case "ongoing":
			return "bg-blue-100 text-blue-700 border-blue-200";
		case "finished":
			return "bg-emerald-100 text-emerald-700 border-emerald-200";
		default:
			return "";
	}
}

export default function KegiatanPage() {
	const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

	const [editingId, setEditingId] = useState<number | null>(null);

	const [formData, setFormData] = useState({
		title: "",
		date: "",
		location: "",
		description: "",
		status: "upcoming" as EventStatus,
	});

	const totalEvents = useMemo(() => events.length, [events]);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function resetForm() {
		setFormData({
			title: "",
			date: "",
			location: "",
			description: "",
			status: "upcoming",
		});

		setEditingId(null);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!formData.title || !formData.date || !formData.location) {
			return;
		}

		if (editingId) {
			setEvents((prev) =>
				prev.map((event) =>
					event.id === editingId
						? {
								...event,
								...formData,
						  }
						: event
				)
			);
		} else {
			const newEvent: EventItem = {
				id: Date.now(),
				...formData,
			};

			setEvents((prev) => [newEvent, ...prev]);
		}

		resetForm();
	}

	function handleEdit(event: EventItem) {
		setEditingId(event.id);

		setFormData({
			title: event.title,
			date: event.date,
			location: event.location,
			description: event.description,
			status: event.status,
		});

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	function handleDelete(id: number) {
		setEvents((prev) => prev.filter((event) => event.id !== id));
	}

	function handleStatusChange(id: number, status: EventStatus) {
		setEvents((prev) =>
			prev.map((event) =>
				event.id === id
					? {
							...event,
							status,
					  }
					: event
			)
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h2
						className='text-2xl font-bold text-gray-900'
						style={{ margin: 0 }}
					>
						Manajemen Kegiatan
					</h2>

					<p className='text-sm text-gray-500 mt-1'>
						Kelola seluruh kegiatan masjid dari dashboard admin.
					</p>
				</div>

				<Card className='px-5 py-3 shadow-sm border border-emerald-100 bg-emerald-50'>
					<p className='text-sm text-emerald-700'>Total Kegiatan</p>

					<p className='text-2xl font-bold text-emerald-600'>
						{totalEvents}
					</p>
				</Card>
			</div>

			{/* Form */}
			<Card className='rounded-2xl border border-gray-200 shadow-sm'>
				<div className='border-b px-6 py-4'>
					<h3
						className='text-lg font-semibold text-gray-800'
						style={{ margin: 0 }}
					>
						{editingId ? "Edit Kegiatan" : "Tambah Kegiatan"}
					</h3>
				</div>

				<form
					onSubmit={handleSubmit}
					className='grid grid-cols-1 gap-5 p-6 md:grid-cols-2'
				>
					<div className='space-y-2 md:col-span-2'>
						<label className='text-sm font-medium text-gray-700'>
							Nama Kegiatan
						</label>

						<Input
							name='title'
							value={formData.title}
							onChange={handleChange}
							placeholder='Masukkan nama kegiatan'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Tanggal
						</label>

						<Input
							type='date'
							name='date'
							value={formData.date}
							onChange={handleChange}
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Lokasi
						</label>

						<Input
							name='location'
							value={formData.location}
							onChange={handleChange}
							placeholder='Contoh: Aula Masjid'
						/>
					</div>

					<div className='space-y-2 md:col-span-2'>
						<label className='text-sm font-medium text-gray-700'>
							Deskripsi
						</label>

						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							rows={4}
							className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
							placeholder='Deskripsi kegiatan'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Status
						</label>

						<select
							name='status'
							value={formData.status}
							onChange={handleChange}
							className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
						>
							<option value='upcoming'>Upcoming</option>
							<option value='ongoing'>Ongoing</option>
							<option value='finished'>Finished</option>
						</select>
					</div>

					<div className='flex items-end gap-3'>
						<Button
							type='submit'
							className='bg-emerald-600 hover:bg-emerald-700'
						>
							{editingId ? "Update Kegiatan" : "Tambah Kegiatan"}
						</Button>

						{editingId && (
							<Button
								type='button'
								variant='outline'
								onClick={resetForm}
							>
								Batal
							</Button>
						)}
					</div>
				</form>
			</Card>

			{/* Table */}
			<Card className='overflow-hidden rounded-2xl border border-gray-200 shadow-sm'>
				<div className='border-b px-6 py-4'>
					<h3
						className='text-lg font-semibold text-gray-800'
						style={{ margin: 0 }}
					>
						Daftar Kegiatan
					</h3>
				</div>

				<div className='overflow-x-auto'>
					<table className='w-full min-w-[850px] border-collapse'>
						<thead className='bg-gray-50'>
							<tr className='text-left'>
								<th className='px-6 py-4 text-sm font-semibold text-gray-600'>
									Kegiatan
								</th>

								<th className='px-6 py-4 text-sm font-semibold text-gray-600'>
									Tanggal
								</th>

								<th className='px-6 py-4 text-sm font-semibold text-gray-600'>
									Lokasi
								</th>

								<th className='px-6 py-4 text-sm font-semibold text-gray-600'>
									Status
								</th>

								<th className='px-6 py-4 text-sm font-semibold text-gray-600'>
									Aksi
								</th>
							</tr>
						</thead>

						<tbody>
							{events.map((event) => (
								<tr
									key={event.id}
									className='border-t hover:bg-gray-50 transition-colors'
								>
									<td className='px-6 py-4'>
										<div className='flex items-start gap-3'>
											<div className='rounded-lg bg-emerald-50 p-2'>
												<CalendarDays className='h-5 w-5 text-emerald-600' />
											</div>

											<div>
												<p className='font-semibold text-gray-800'>
													{event.title}
												</p>

												<p className='mt-1 text-sm text-gray-500 line-clamp-1'>
													{event.description}
												</p>
											</div>
										</div>
									</td>

									<td className='px-6 py-4 text-sm text-gray-600'>
										{event.date}
									</td>

									<td className='px-6 py-4'>
										<div className='flex items-center gap-2 text-sm text-gray-600'>
											<MapPin className='h-4 w-4' />
											{event.location}
										</div>
									</td>

									<td className='px-6 py-4'>
										<div className='flex flex-col gap-2'>
											<Badge
												className={getStatusBadge(event.status)}
											>
												{event.status}
											</Badge>

											<select
												value={event.status}
												onChange={(e) =>
													handleStatusChange(
														event.id,
														e.target.value as EventStatus
													)
												}
												className='h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500'
											>
												{STATUS_OPTIONS.map((status) => (
													<option
														key={status}
														value={status}
													>
														{status}
													</option>
												))}
											</select>
										</div>
									</td>

									<td className='px-6 py-4'>
										<div className='flex items-center gap-2'>
											<Button
												size='sm'
												variant='outline'
												onClick={() => handleEdit(event)}
											>
												<Pencil className='mr-2 h-4 w-4' />
												Edit
											</Button>

											<Button
												size='sm'
												variant='destructive'
												onClick={() => handleDelete(event.id)}
											>
												<Trash2 className='mr-2 h-4 w-4' />
												Hapus
											</Button>
										</div>
									</td>
								</tr>
							))}

							{events.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className='px-6 py-12 text-center text-sm text-gray-500'
									>
										Belum ada kegiatan.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
}