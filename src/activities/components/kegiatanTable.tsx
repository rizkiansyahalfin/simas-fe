import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    CalendarDays,
    MapPin,
    Pencil,
    Trash2
} from "lucide-react"

import type { EventItem, EventStatus } from "@/activities/types/event"

interface EventTableProps {
    events: EventItem[]
    handleEdit: (event: EventItem) => void
    handleDelete: (id: number) => void
    handleStatusChange: (
        id: number,
        status: EventStatus
    ) => void
}

const STATUS_OPTIONS: EventStatus[] = [
    "upcoming",
    "ongoing",
    "finished",
]

function getStatusBadge(status: EventStatus) {
    switch (status) {
        case "upcoming":
            return "bg-yellow-100 text-yellow-700 border-yellow-200"
        case "ongoing":
            return "bg-blue-100 text-blue-700 border-blue-200"
        case "finished":
            return "bg-emerald-100 text-emerald-700 border-emerald-200"
        default:
            return ""
    }
}

export default function EventTable({
    events,
    handleEdit,
    handleDelete,
    handleStatusChange,
}: EventTableProps) {
    return (
        <>
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
        </>
    )
}