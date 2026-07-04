import { useMemo, useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";

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

type AuditAction = "create" | "update" | "delete" | "approve" | "archive" | "login";
type AuditModule = "Campaign" | "Donasi" | "Kegiatan" | "Profil Masjid" | "Pengurus" | "Inventaris";
type AuditValue = string | number | boolean | null;

interface AuditLogItem {
	id: string;
	timestamp: string;
	user: string;
	action: AuditAction;
	module: AuditModule;
	target: string;
	ipAddress: string;
	before: Record<string, AuditValue>;
	after: Record<string, AuditValue>;
}

interface AuditFilters {
	user: string;
	action: string;
	module: string;
	startDate: string;
	endDate: string;
}

const auditLogs: AuditLogItem[] = [
	{
		id: "AUD-1009",
		timestamp: "2026-05-22T09:42:00+07:00",
		user: "Superadmin",
		action: "update",
		module: "Profil Masjid",
		target: "Masjid Al-Ikhlas",
		ipAddress: "192.168.1.12",
		before: {
			telepon: "0274-123456",
			email: "info@masjid.test",
			alamat: "Jl. Masjid Raya No. 12",
		},
		after: {
			telepon: "0274-765432",
			email: "admin@masjid.test",
			alamat: "Jl. Masjid Raya No. 12",
		},
	},
	{
		id: "AUD-1008",
		timestamp: "2026-05-22T08:18:00+07:00",
		user: "Admin Donasi",
		action: "approve",
		module: "Donasi",
		target: "DON-2026-0522-01",
		ipAddress: "192.168.1.22",
		before: {
			status: "Menunggu Verifikasi",
			verifiedBy: null,
		},
		after: {
			status: "Terverifikasi",
			verifiedBy: "Admin Donasi",
		},
	},
	{
		id: "AUD-1007",
		timestamp: "2026-05-21T16:05:00+07:00",
		user: "Admin Kegiatan",
		action: "create",
		module: "Kegiatan",
		target: "Kajian Jumat Malam",
		ipAddress: "192.168.1.31",
		before: {},
		after: {
			judul: "Kajian Jumat Malam",
			tanggal: "2026-05-29",
			status: "Draft",
		},
	},
	{
		id: "AUD-1006",
		timestamp: "2026-05-21T13:27:00+07:00",
		user: "Bendahara",
		action: "update",
		module: "Campaign",
		target: "Renovasi Tempat Wudhu",
		ipAddress: "192.168.1.17",
		before: {
			targetDana: 45000000,
			status: "Aktif",
		},
		after: {
			targetDana: 50000000,
			status: "Aktif",
		},
	},
	{
		id: "AUD-1005",
		timestamp: "2026-05-20T11:50:00+07:00",
		user: "Superadmin",
		action: "archive",
		module: "Campaign",
		target: "Pengadaan Karpet Masjid",
		ipAddress: "192.168.1.12",
		before: {
			status: "Ditutup",
			arsip: false,
		},
		after: {
			status: "Diarsipkan",
			arsip: true,
		},
	},
	{
		id: "AUD-1004",
		timestamp: "2026-05-20T10:02:00+07:00",
		user: "Admin Inventaris",
		action: "delete",
		module: "Inventaris",
		target: "Kabel Speaker Lama",
		ipAddress: "192.168.1.44",
		before: {
			nama: "Kabel Speaker Lama",
			jumlah: 1,
			kondisi: "Rusak",
		},
		after: {},
	},
	{
		id: "AUD-1003",
		timestamp: "2026-05-19T15:35:00+07:00",
		user: "Superadmin",
		action: "create",
		module: "Pengurus",
		target: "Akun Admin Kegiatan",
		ipAddress: "192.168.1.12",
		before: {},
		after: {
			nama: "Admin Kegiatan",
			role: "admin kegiatan",
			status: "Aktif",
		},
	},
	{
		id: "AUD-1002",
		timestamp: "2026-05-19T09:12:00+07:00",
		user: "Bendahara",
		action: "login",
		module: "Donasi",
		target: "Login Admin",
		ipAddress: "192.168.1.17",
		before: {
			session: "Tidak aktif",
		},
		after: {
			session: "Aktif",
		},
	},
	{
		id: "AUD-1001",
		timestamp: "2026-05-18T14:44:00+07:00",
		user: "Admin Donasi",
		action: "update",
		module: "Donasi",
		target: "Metode Pembayaran QRIS",
		ipAddress: "192.168.1.22",
		before: {
			qris: "qris-lama.png",
			status: "Aktif",
		},
		after: {
			qris: "qris-baru.png",
			status: "Aktif",
		},
	},
	{
		id: "AUD-1000",
		timestamp: "2026-05-18T08:30:00+07:00",
		user: "Admin Kegiatan",
		action: "update",
		module: "Kegiatan",
		target: "Bakti Sosial",
		ipAddress: "192.168.1.31",
		before: {
			status: "Draft",
			lokasi: "Aula Masjid",
		},
		after: {
			status: "Dipublikasikan",
			lokasi: "Halaman Masjid",
		},
	},
];

const pageSizeOptions = [5, 10, 20];

const actionLabels: Record<AuditAction, string> = {
	create: "Buat",
	update: "Ubah",
	delete: "Hapus",
	approve: "Setujui",
	archive: "Arsipkan",
	login: "Login",
};

const actionClassName: Record<AuditAction, string> = {
	create: "border border-emerald-200 bg-emerald-50 text-emerald-700",
	update: "border border-blue-200 bg-blue-50 text-blue-700",
	delete: "border border-red-200 bg-red-50 text-red-700",
	approve: "border border-teal-200 bg-teal-50 text-teal-700",
	archive: "border border-slate-200 bg-slate-100 text-slate-700",
	login: "border border-violet-200 bg-violet-50 text-violet-700",
};

const emptyFilters: AuditFilters = {
	user: "",
	action: "",
	module: "",
	startDate: "",
	endDate: "",
};

export default function AuditLogPage() {
	const [filters, setFilters] = useState<AuditFilters>(emptyFilters);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

	const filterOptions = useMemo(
		() => ({
			users: Array.from(new Set(auditLogs.map((log) => log.user))),
			actions: Array.from(new Set(auditLogs.map((log) => log.action))),
			modules: Array.from(new Set(auditLogs.map((log) => log.module))),
		}),
		[],
	);

	const filteredLogs = useMemo(() => {
		return auditLogs.filter((log) => {
			const logDate = log.timestamp.slice(0, 10);
			const matchUser = !filters.user || log.user === filters.user;
			const matchAction = !filters.action || log.action === filters.action;
			const matchModule = !filters.module || log.module === filters.module;
			const matchStartDate = !filters.startDate || logDate >= filters.startDate;
			const matchEndDate = !filters.endDate || logDate <= filters.endDate;

			return matchUser && matchAction && matchModule && matchStartDate && matchEndDate;
		});
	}, [filters]);

	const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
	const pageLogs = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const updateFilter =
		(field: keyof AuditFilters) =>
		(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setFilters((current) => ({ ...current, [field]: event.target.value }));
			setCurrentPage(1);
		};

	const resetFilters = () => {
		setFilters(emptyFilters);
		setCurrentPage(1);
	};

	const exportCsv = () => {
		const header = ["ID", "Waktu", "User", "Aksi", "Modul", "Target", "IP Address", "Before", "After"];
		const rows = filteredLogs.map((log) => [
			log.id,
			formatDateTime(log.timestamp),
			log.user,
			actionLabels[log.action],
			log.module,
			log.target,
			log.ipAddress,
			JSON.stringify(log.before),
			JSON.stringify(log.after),
		]);
		const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className='mx-auto max-w-7xl space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm font-semibold text-simas-primary'>Superadmin</p>
					<h1 className='mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl'>Audit Log</h1>
					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400'>
						Pantau aktivitas pengguna, filter log, lihat perubahan data before/after, dan export CSV.
					</p>
				</div>

				<Button type='button' onClick={exportCsv} className='h-11 bg-simas-primary font-bold'>
					Export CSV
				</Button>
			</div>

			<section className='rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm'>
				<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
					<div className='space-y-2'>
						<Label htmlFor='filter-user'>User</Label>
						<SelectInput id='filter-user' value={filters.user} onChange={updateFilter("user")}>
							<option value=''>Semua User</option>
							{filterOptions.users.map((user) => (
								<option key={user} value={user}>
									{user}
								</option>
							))}
						</SelectInput>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='filter-action'>Aksi</Label>
						<SelectInput id='filter-action' value={filters.action} onChange={updateFilter("action")}>
							<option value=''>Semua Aksi</option>
							{filterOptions.actions.map((action) => (
								<option key={action} value={action}>
									{actionLabels[action]}
								</option>
							))}
						</SelectInput>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='filter-module'>Modul</Label>
						<SelectInput id='filter-module' value={filters.module} onChange={updateFilter("module")}>
							<option value=''>Semua Modul</option>
							{filterOptions.modules.map((moduleName) => (
								<option key={moduleName} value={moduleName}>
									{moduleName}
								</option>
							))}
						</SelectInput>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='filter-start-date'>Dari Tanggal</Label>
						<Input
							id='filter-start-date'
							type='date'
							value={filters.startDate}
							onChange={updateFilter("startDate")}
							className='h-11 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white'
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='filter-end-date'>Sampai Tanggal</Label>
						<Input
							id='filter-end-date'
							type='date'
							value={filters.endDate}
							onChange={updateFilter("endDate")}
							className='h-11 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white'
						/>
					</div>
				</div>

				<div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<p className='text-sm text-slate-500 dark:text-slate-400'>
						Menampilkan <span className='font-bold text-slate-800 dark:text-slate-200'>{filteredLogs.length}</span> log aktivitas.
					</p>
					<Button type='button' variant='outline' onClick={resetFilters}>
						Reset Filter
					</Button>
				</div>
			</section>

			<section className='rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm'>
				<div className='flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h2 className='font-bold text-slate-900 dark:text-white'>Log Aktivitas</h2>
						<p className='text-sm text-slate-500 dark:text-slate-400'>Klik detail untuk melihat diff before/after.</p>
					</div>
					<div className='flex items-center gap-2'>
						<Label htmlFor='page-size' className='text-sm text-slate-500 dark:text-slate-400'>
							Baris
						</Label>
						<SelectInput
							id='page-size'
							value={String(pageSize)}
							onChange={(event) => {
								setPageSize(Number(event.target.value));
								setCurrentPage(1);
							}}
							className='h-9 w-20'
						>
							{pageSizeOptions.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</SelectInput>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Waktu</TableHead>
							<TableHead>User</TableHead>
							<TableHead>Aksi</TableHead>
							<TableHead>Modul</TableHead>
							<TableHead>Target</TableHead>
							<TableHead>IP</TableHead>
							<TableHead className='text-right'>Diff</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageLogs.length ? (
							pageLogs.map((log) => (
								<TableRow key={log.id}>
									<TableCell className='whitespace-nowrap font-medium text-slate-800 dark:text-slate-200'>
										{formatDateTime(log.timestamp)}
									</TableCell>
									<TableCell>{log.user}</TableCell>
									<TableCell>
										<Badge className={actionClassName[log.action]}>{actionLabels[log.action]}</Badge>
									</TableCell>
									<TableCell>{log.module}</TableCell>
									<TableCell>
										<div className='min-w-48'>
											<p className='font-semibold text-slate-800 dark:text-slate-200'>{log.target}</p>
											<p className='text-xs text-slate-400 dark:text-slate-500'>{log.id}</p>
										</div>
									</TableCell>
									<TableCell className='font-mono text-xs text-slate-500 dark:text-slate-400'>{log.ipAddress}</TableCell>
									<TableCell>
										<div className='flex justify-end'>
											<Button type='button' variant='outline' size='sm' onClick={() => setSelectedLog(log)}>
												Lihat Diff
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={7} className='py-10 text-center text-slate-500 dark:text-slate-400'>
									Tidak ada log yang cocok dengan filter.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<div className='flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
					<p className='text-sm text-slate-500 dark:text-slate-400'>
						Halaman {currentPage} dari {totalPages}
					</p>
					<div className='flex gap-2'>
						<Button
							type='button'
							variant='outline'
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
						>
							Sebelumnya
						</Button>
						<Button
							type='button'
							variant='outline'
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
						>
							Berikutnya
						</Button>
					</div>
				</div>
			</section>

			<DiffDialog log={selectedLog} onClose={() => setSelectedLog(null)} />
		</div>
	);
}

function SelectInput({
	className = "",
	...props
}: ComponentProps<"select">) {
	return (
		<select
			{...props}
			className={`h-11 w-full rounded-lg border border-input dark:border-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-white px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${className}`}
		/>
	);
}

function DiffDialog({ log, onClose }: { log: AuditLogItem | null; onClose: () => void }) {
	return (
		<Dialog open={Boolean(log)} onOpenChange={onClose}>
			<DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-4xl'>
				<DialogHeader>
					<DialogTitle>Diff Before / After</DialogTitle>
					<DialogDescription>
						{log ? `${log.id} - ${log.module} - ${log.target}` : "Detail perubahan aktivitas"}
					</DialogDescription>
				</DialogHeader>

				{log ? (
					<div className='grid gap-4 md:grid-cols-2'>
						<DiffPanel title='Before' values={log.before} tone='before' compareWith={log.after} />
						<DiffPanel title='After' values={log.after} tone='after' compareWith={log.before} />
					</div>
				) : null}

				<DialogFooter>
					<Button type='button' variant='outline' onClick={onClose}>
						Tutup
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function DiffPanel({
	title,
	values,
	tone,
	compareWith,
}: {
	title: string;
	values: Record<string, AuditValue>;
	tone: "before" | "after";
	compareWith: Record<string, AuditValue>;
}) {
	const keys = Array.from(new Set([...Object.keys(values), ...Object.keys(compareWith)]));
	const changedClass =
		tone === "before"
			? "border-red-100 bg-red-50 text-red-800"
			: "border-emerald-100 bg-emerald-50 text-emerald-800";

	return (
		<div className='rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
			<h3 className='mb-3 font-bold text-slate-900 dark:text-white'>{title}</h3>
			{keys.length ? (
				<div className='space-y-2'>
					{keys.map((key) => {
						const currentValue = values[key];
						const changed = currentValue !== compareWith[key];

						return (
							<div
								key={key}
								className={`rounded-xl border p-3 text-sm ${
									changed ? changedClass : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
								}`}
							>
								<p className='mb-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-400'>{key}</p>
								<p className='break-words font-mono'>{formatAuditValue(currentValue)}</p>
							</div>
						);
					})}
				</div>
			) : (
				<div className='rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-500 dark:text-slate-400'>
					Tidak ada data.
				</div>
			)}
		</div>
	);
}

function formatDateTime(value: string) {
	return new Intl.DateTimeFormat("id-ID", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function formatAuditValue(value: AuditValue) {
	if (value === null) return "-";
	if (typeof value === "boolean") return value ? "true" : "false";
	if (typeof value === "number") return String(value);
	return value;
}

function escapeCsvValue(value: string) {
	return `"${value.replaceAll('"', '""')}"`;
}
