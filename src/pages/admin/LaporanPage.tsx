import { useMemo, useState } from "react";
import { Calendar, FileSpreadsheet, FileText, HeartHandshake, TrendingUp, Wallet } from "lucide-react";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ReportRow = {
	id: string;
	tanggal: string;
	keterangan: string;
	kategori: string;
	tipe: "Pemasukan" | "Pengeluaran";
	nominal: number;
};

const REPORT_ROWS: ReportRow[] = [
	{
		id: "TRX-001",
		tanggal: "2026-05-01",
		keterangan: "Donasi infaq jamaah",
		kategori: "Donasi",
		tipe: "Pemasukan",
		nominal: 2500000,
	},
	{
		id: "TRX-002",
		tanggal: "2026-05-04",
		keterangan: "Pembelian perlengkapan kebersihan",
		kategori: "Operasional",
		tipe: "Pengeluaran",
		nominal: 450000,
	},
	{
		id: "TRX-003",
		tanggal: "2026-05-08",
		keterangan: "Sedekah subuh",
		kategori: "Donasi",
		tipe: "Pemasukan",
		nominal: 1250000,
	},
	{
		id: "TRX-004",
		tanggal: "2026-05-10",
		keterangan: "Perawatan sound system",
		kategori: "Pemeliharaan",
		tipe: "Pengeluaran",
		nominal: 800000,
	},
];

const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

const formatDate = (value: string) =>
	new Intl.DateTimeFormat("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));

const toDateValue = (date: Date) => date.toISOString().slice(0, 10);

function downloadFile(filename: string, content: string, type: string) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}

export default function LaporanPage() {
	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const [startDate, setStartDate] = useState(toDateValue(firstDay));
	const [endDate, setEndDate] = useState(toDateValue(today));

	const rows = useMemo(() => {
		return REPORT_ROWS.filter((row) => row.tanggal >= startDate && row.tanggal <= endDate);
	}, [endDate, startDate]);

	const totalPemasukan = rows.filter((row) => row.tipe === "Pemasukan").reduce((sum, row) => sum + row.nominal, 0);
	const totalPengeluaran = rows.filter((row) => row.tipe === "Pengeluaran").reduce((sum, row) => sum + row.nominal, 0);
	const saldo = totalPemasukan - totalPengeluaran;

	const handleDownloadExcel = () => {
		const rowsHtml = rows
			.map(
				(row) => `
					<tr>
						<td>${row.id}</td>
						<td>${formatDate(row.tanggal)}</td>
						<td>${row.keterangan}</td>
						<td>${row.kategori}</td>
						<td>${row.tipe}</td>
						<td>${row.nominal}</td>
					</tr>
				`,
			)
			.join("");
		const excelHtml = `
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Tanggal</th>
						<th>Keterangan</th>
						<th>Kategori</th>
						<th>Tipe</th>
						<th>Nominal</th>
					</tr>
				</thead>
				<tbody>${rowsHtml}</tbody>
			</table>
		`;

		downloadFile(
			`laporan-simas-${startDate}-${endDate}.xls`,
			excelHtml,
			"application/vnd.ms-excel;charset=utf-8",
		);
	};

	const handleDownloadPdf = () => {
		const rowsHtml = rows
			.map(
				(row) => `
					<tr>
						<td>${formatDate(row.tanggal)}</td>
						<td>${row.keterangan}</td>
						<td>${row.kategori}</td>
						<td>${row.tipe}</td>
						<td style="text-align:right">${formatRupiah(row.nominal)}</td>
					</tr>
				`,
			)
			.join("");

		const reportWindow = window.open("", "_blank");
		if (!reportWindow) return;

		reportWindow.document.write(`
			<!doctype html>
			<html>
				<head>
					<title>Laporan SIMAS</title>
					<style>
						body { font-family: Arial, sans-serif; color: #111827; padding: 32px; }
						h1 { margin: 0 0 8px; font-size: 24px; }
						p { margin: 0 0 24px; color: #4b5563; }
						table { border-collapse: collapse; width: 100%; margin-top: 24px; }
						th, td { border: 1px solid #e5e7eb; padding: 10px; font-size: 12px; }
						th { background: #ecfdf5; text-align: left; }
						.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
						.box { border: 1px solid #d1fae5; border-radius: 10px; padding: 12px; }
						.label { color: #6b7280; font-size: 12px; }
						.value { font-size: 18px; font-weight: 700; margin-top: 4px; }
					</style>
				</head>
				<body>
					<h1>Laporan Keuangan SIMAS</h1>
					<p>Periode ${formatDate(startDate)} - ${formatDate(endDate)}</p>
					<div class="summary">
						<div class="box"><div class="label">Pemasukan</div><div class="value">${formatRupiah(totalPemasukan)}</div></div>
						<div class="box"><div class="label">Pengeluaran</div><div class="value">${formatRupiah(totalPengeluaran)}</div></div>
						<div class="box"><div class="label">Saldo</div><div class="value">${formatRupiah(saldo)}</div></div>
					</div>
					<table>
						<thead>
							<tr>
								<th>Tanggal</th>
								<th>Keterangan</th>
								<th>Kategori</th>
								<th>Tipe</th>
								<th>Nominal</th>
							</tr>
						</thead>
						<tbody>${rowsHtml}</tbody>
					</table>
					<script>
						window.onload = function () {
							window.print();
						};
					</script>
				</body>
			</html>
		`);
		reportWindow.document.close();
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
				<div>
					<h1 className='text-2xl font-black text-gray-900'>Laporan</h1>
					<p className='mt-1 text-sm text-gray-400'>Pilih periode laporan dan unduh rekap keuangan masjid</p>
				</div>

				<div className='flex flex-col gap-2 sm:flex-row'>
					<Button className='btn-primary h-11 rounded-xl px-4' onClick={handleDownloadPdf}>
						<FileText className='size-4' />
						Download PDF
					</Button>
					<Button className='h-11 rounded-xl border border-emerald-200 bg-white px-4 font-bold text-simas-primary hover:bg-emerald-50' onClick={handleDownloadExcel}>
						<FileSpreadsheet className='size-4' />
						Download Excel
					</Button>
				</div>
			</div>

			<div className='card-sm p-5'>
				<div className='grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end'>
					<div className='space-y-2'>
						<label htmlFor='start-date' className='text-sm font-bold text-gray-700'>
							Tanggal Mulai
						</label>
						<div className='relative'>
							<Calendar className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
							<Input
								id='start-date'
								type='date'
								value={startDate}
								max={endDate}
								onChange={(event) => setStartDate(event.target.value)}
								className='h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 focus:bg-white focus-visible:ring-0'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<label htmlFor='end-date' className='text-sm font-bold text-gray-700'>
							Tanggal Selesai
						</label>
						<div className='relative'>
							<Calendar className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
							<Input
								id='end-date'
								type='date'
								value={endDate}
								min={startDate}
								onChange={(event) => setEndDate(event.target.value)}
								className='h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 focus:bg-white focus-visible:ring-0'
							/>
						</div>
					</div>

					<div className='rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-simas-primary'>
						{formatDate(startDate)} - {formatDate(endDate)}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				<div className='stat-card'>
					<div className='icon-wrap icon-wrap-green'>
						<HeartHandshake className='size-5' />
					</div>
					<div>
						<p className='text-xs font-semibold uppercase tracking-wider text-gray-400'>Pemasukan</p>
						<p className='text-xl font-black text-gray-900'>{formatRupiah(totalPemasukan)}</p>
						<p className='text-xs text-gray-400'>Total periode</p>
					</div>
				</div>

				<div className='stat-card'>
					<div className='icon-wrap icon-wrap-amber'>
						<Wallet className='size-5' />
					</div>
					<div>
						<p className='text-xs font-semibold uppercase tracking-wider text-gray-400'>Pengeluaran</p>
						<p className='text-xl font-black text-gray-900'>{formatRupiah(totalPengeluaran)}</p>
						<p className='text-xs text-gray-400'>Total periode</p>
					</div>
				</div>

				<div className='stat-card'>
					<div className='icon-wrap icon-wrap-blue'>
						<TrendingUp className='size-5' />
					</div>
					<div>
						<p className='text-xs font-semibold uppercase tracking-wider text-gray-400'>Saldo Bersih</p>
						<p className='text-xl font-black text-gray-900'>{formatRupiah(saldo)}</p>
						<p className='text-xs text-gray-400'>Pemasukan - pengeluaran</p>
					</div>
				</div>
			</div>

			<div className='card overflow-hidden'>
				<div className='flex items-center justify-between border-b border-gray-50 px-6 py-4'>
					<h2 className='font-bold text-gray-800'>Ringkasan Transaksi</h2>
					<span className='rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-gray-500'>{rows.length} transaksi</span>
				</div>

				<div className='overflow-x-auto'>
					<table className='w-full min-w-[760px] text-left'>
						<thead className='bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400'>
							<tr>
								<th className='px-6 py-3'>Tanggal</th>
								<th className='px-6 py-3'>Keterangan</th>
								<th className='px-6 py-3'>Kategori</th>
								<th className='px-6 py-3'>Tipe</th>
								<th className='px-6 py-3 text-right'>Nominal</th>
							</tr>
						</thead>
						<tbody>
							{rows.length === 0 ? (
								<tr>
									<td colSpan={5} className='px-6 py-14 text-center text-sm font-semibold text-gray-300'>
										Tidak ada transaksi pada periode ini
									</td>
								</tr>
							) : (
								rows.map((row) => (
									<tr key={row.id} className='border-t border-gray-50'>
										<td className='px-6 py-4 text-sm font-semibold text-gray-700'>{formatDate(row.tanggal)}</td>
										<td className='px-6 py-4 text-sm font-semibold text-gray-800'>{row.keterangan}</td>
										<td className='px-6 py-4'>
											<span className='pill'>{row.kategori}</span>
										</td>
										<td className='px-6 py-4'>
											<span className={row.tipe === "Pemasukan" ? "badge badge-ok" : "badge badge-waiting"}>
												<span className={row.tipe === "Pemasukan" ? "badge-dot dot-ok" : "badge-dot dot-waiting"} />
												{row.tipe}
											</span>
										</td>
										<td className='px-6 py-4 text-right text-sm font-black text-simas-primary-dark'>
											{formatRupiah(row.nominal)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
