import type { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Home } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { SearchX } from "lucide-react";
import { ServerCrash } from "lucide-react";
import { ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
	code: string;
	title: string;
	description: string;
	icon: LucideIcon;
	tone: "emerald" | "amber" | "red";
	primaryAction?: {
		label: string;
		to: string;
	};
	showBackButton?: boolean;
	showRefreshButton?: boolean;
};

const toneClass = {
	emerald: "bg-emerald-50 text-simas-primary border-emerald-100",
	amber: "bg-amber-50 text-amber-600 border-amber-100",
	red: "bg-red-50 text-red-600 border-red-100",
};

function ErrorPage({
	code,
	title,
	description,
	icon: Icon,
	tone,
	primaryAction = { label: "Kembali ke Beranda", to: "/" },
	showBackButton = true,
	showRefreshButton = false,
}: ErrorPageProps) {
	const navigate = useNavigate();

	return (
		<main className='min-h-svh bg-simas-bg-public px-4 py-10 text-gray-900 sm:px-6'>
			<div className='mx-auto flex min-h-[calc(100svh-5rem)] max-w-3xl items-center justify-center'>
				<section className='w-full rounded-3xl border border-emerald-100 bg-white p-6 text-center shadow-sm sm:p-10'>
					<div className={`mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border ${toneClass[tone]}`}>
						<Icon className='size-8' />
					</div>

					<p className='mb-3 text-sm font-black uppercase tracking-[0.28em] text-simas-primary'>{code}</p>
					<h1 className='mx-auto max-w-xl text-3xl font-black leading-tight text-gray-950 sm:text-4xl'>{title}</h1>
					<p className='mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-gray-500 sm:text-base'>
						{description}
					</p>

					<div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
						<Button asChild className='btn-primary h-11 rounded-xl px-5'>
							<Link to={primaryAction.to}>
								<Home className='size-4' />
								{primaryAction.label}
							</Link>
						</Button>

						{showBackButton && (
							<Button
								type='button'
								variant='outline'
								className='h-11 rounded-xl border-gray-200 px-5 font-bold text-gray-600 hover:bg-gray-50'
								onClick={() => navigate(-1)}
							>
								<ArrowLeft className='size-4' />
								Kembali
							</Button>
						)}

						{showRefreshButton && (
							<Button
								type='button'
								variant='outline'
								className='h-11 rounded-xl border-gray-200 px-5 font-bold text-gray-600 hover:bg-gray-50'
								onClick={() => window.location.reload()}
							>
								<RefreshCcw className='size-4' />
								Muat Ulang
							</Button>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}

export function NotFoundPage() {
	return (
		<ErrorPage
			code='404'
			title='Halaman tidak ditemukan'
			description='Alamat yang kamu buka tidak tersedia, sudah dipindahkan, atau mungkin ada salah ketik pada tautannya.'
			icon={SearchX}
			tone='emerald'
		/>
	);
}

export function ForbiddenPage() {
	return (
		<ErrorPage
			code='403'
			title='Akses tidak diizinkan'
			description='Akun kamu belum memiliki izin untuk membuka halaman ini. Silakan masuk dengan akun yang sesuai atau hubungi pengelola sistem.'
			icon={ShieldAlert}
			tone='amber'
			primaryAction={{ label: "Ke Dashboard", to: "/admin" }}
		/>
	);
}

export function ServerErrorPage() {
	return (
		<ErrorPage
			code='500'
			title='Terjadi kendala pada sistem'
			description='Maaf, sistem sedang mengalami gangguan saat memproses permintaan. Coba muat ulang halaman atau kembali beberapa saat lagi.'
			icon={ServerCrash}
			tone='red'
			showRefreshButton
		/>
	);
}
