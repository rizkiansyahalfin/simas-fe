import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// --- TIPE DATA ---
export interface ColumnConfig<T> {
	header: string;
	accessorKey: keyof T | string;
	sortable?: boolean;
	cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
	data: T[];
	columns: ColumnConfig<T>[];
	title?: string;
	exportFilename?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
	data,
	columns,
	title = "Data Table",
	exportFilename = "export_data",
}: DataTableProps<T>) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// --- 1. FITUR FILTER PENCARIAN ---
	const filteredData = useMemo(() => {
		if (!searchTerm) return data;
		const lowercasedTerm = searchTerm.toLowerCase();
		return data.filter((item) =>
			columns.some((col) => {
				const value = item[col.accessorKey as keyof T];
				return String(value).toLowerCase().includes(lowercasedTerm);
			}),
		);
	}, [data, searchTerm, columns]);

	// --- 2. FITUR SORTING ---
	const sortedData = useMemo(() => {
		const sortableItems = [...filteredData];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				const aValue = String(a[sortConfig.key as keyof T]);
				const bValue = String(b[sortConfig.key as keyof T]);
				if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
				if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
				return 0;
			});
		}
		return sortableItems;
	}, [filteredData, sortConfig]);

	// --- 3. FITUR PAGINATION ---
	const totalPages = Math.ceil(sortedData.length / itemsPerPage);
	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return sortedData.slice(startIndex, startIndex + itemsPerPage);
	}, [sortedData, currentPage]);

	const handleSort = (key: string) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
		setCurrentPage(1); // Reset ke halaman 1 tiap kali ganti sorting
	};

	// --- 4. FITUR EXPORT CSV ---
	const exportToCSV = () => {
		if (data.length === 0) {
			toast.error("Tidak ada data untuk diexport!");
			return;
		}

		// Ambil header
		const headers = columns.map((col) => col.header).join(",");

		// Ambil baris data (menggunakan data yang sudah difilter/sort)
		const csvRows = sortedData.map((item) => {
			return columns
				.map((col) => {
					const val = item[col.accessorKey as keyof T];
					// Hindari koma merusak format CSV
					return `"${String(val).replace(/"/g, '""')}"`;
				})
				.join(",");
		});

		const csvContent = [headers, ...csvRows].join("\n");
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		const url = URL.createObjectURL(blob);

		link.setAttribute("href", url);
		link.setAttribute("download", `${exportFilename}_${new Date().getTime()}.csv`);
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success("File CSV berhasil diunduh!");
	};

	return (
		<div className='bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden'>
			{/* Top Bar: Title, Search, Export */}
			<div className='p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<h2 className='text-xl font-bold text-slate-800'>{title}</h2>
				<div className='flex flex-col sm:flex-row items-center gap-3'>
					<div className='relative w-full sm:w-64'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
						<Input
							type='text'
							placeholder='Cari data...'
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								setCurrentPage(1);
							}}
							className='pl-10 h-10 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-simas-primary'
						/>
					</div>
					<Button
						onClick={exportToCSV}
						variant='outline'
						className='w-full sm:w-auto h-10 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors'
					>
						<Download className='mr-2 h-4 w-4' /> Export CSV
					</Button>
				</div>
			</div>

			{/* Tabel */}
			<div className='overflow-x-auto'>
				<table className='w-full text-left text-sm text-slate-600'>
					<thead className='bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-100'>
						<tr>
							{columns.map((col, index) => (
								<th
									key={index}
									className={`px-6 py-4 whitespace-nowrap ${col.sortable !== false ? "cursor-pointer hover:bg-slate-100 transition-colors select-none" : ""}`}
									onClick={() => col.sortable !== false && handleSort(col.accessorKey as string)}
								>
									<div className='flex items-center gap-2'>
										{col.header}
										{col.sortable !== false &&
											sortConfig?.key === col.accessorKey &&
											(sortConfig.direction === "asc" ? (
												<ChevronUp className='h-4 w-4 text-emerald-600' />
											) : (
												<ChevronDown className='h-4 w-4 text-emerald-600' />
											))}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-100'>
						{paginatedData.length > 0 ? (
							paginatedData.map((item, rowIndex) => (
								<tr key={rowIndex} className='hover:bg-slate-50/50 transition-colors'>
									{columns.map((col, colIndex) => (
										<td key={colIndex} className='px-6 py-4'>
											{col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T])}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className='px-6 py-12 text-center text-slate-400 font-medium'
								>
									Tidak ada data yang ditemukan.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className='p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500'>
				<div>
					Menampilkan baris{" "}
					<span className='font-bold text-slate-700'>
						{sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
					</span>{" "}
					hingga{" "}
					<span className='font-bold text-slate-700'>
						{Math.min(currentPage * itemsPerPage, sortedData.length)}
					</span>{" "}
					dari total <span className='font-bold text-slate-700'>{sortedData.length}</span> data.
				</div>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='icon'
						className='h-8 w-8 rounded-lg border-slate-200'
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						<ChevronLeft className='h-4 w-4' />
					</Button>
					<span className='font-bold text-slate-700 px-2'>
						{currentPage} / {totalPages === 0 ? 1 : totalPages}
					</span>
					<Button
						variant='outline'
						size='icon'
						className='h-8 w-8 rounded-lg border-slate-200'
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages || totalPages === 0}
					>
						<ChevronRight className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}
