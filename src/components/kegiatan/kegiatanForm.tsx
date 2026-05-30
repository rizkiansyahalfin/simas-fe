import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { EventStatus } from "@/types/event"

interface EventFormProps {
    editingId: number | null
    formData: {
        title: string
        date: string
        location: string
        description: string
        status: EventStatus
    }
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void
    handleSubmit: (e: React.FormEvent) => void
    resetForm: () => void
}

export default function EventForm({
    editingId,
    formData,
    handleChange,
    handleSubmit,
    resetForm
}: EventFormProps) {
    return (
    <>
        {/* Form */ }
        <Card className = 'rounded-2xl border border-gray-200 shadow-sm' >
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
			</Card >
    </>
    )
}
