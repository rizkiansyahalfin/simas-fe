import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const location = useLocation();
  const redirectPath =
    (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    // dummy login logic
    if (email === "admin@simas.com" && password === "123456") {
      setAuth({
        token: "dummy-token",
        user: {
          id: "1",
          name: "Admin SIMAS",
          email,
          role: "superadmin",
        },
        redirectTo: redirectPath,
      });
    } else {
      setShowError(true);
    }

    setLoading(false);
  };

  return (
		<div className='fixed inset-0 flex bg-white'>
			{/* ══════════ KOLOM KIRI – BRANDING ══════════ */}
			<aside className='hidden md:flex md:w-[45%] bg-simas-primary relative flex-col justify-center items-center text-white p-10 overflow-hidden'>
				{/* Dekorasi Background */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px]' />
				<div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl' />
				<div className='absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl' />

				<div className='relative z-10 text-center space-y-6 max-w-lg'>
					{/* Logo */}
					<div className='w-28 h-28 bg-white/10 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 transition-transform hover:scale-105 duration-300'>
						<span className='text-5xl drop-shadow-md'>🕌</span>
					</div>

					{/* Judul */}
					<div className='space-y-2'>
						<h1 className='text-5xl font-bold tracking-tight drop-shadow-sm'>SIMAS</h1>
						<p className='text-lg font-medium text-emerald-50/90 tracking-wide'>Sistem Informasi Masjid</p>
					</div>

					{/* Ayat Al-Quran */}
					<div className='mt-12 pt-10 border-t border-emerald-400/30 relative'>
						<p className='text-2xl font-arabic mb-4 leading-relaxed drop-shadow-sm' dir='rtl'>
							إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
						</p>
						<p className='text-sm text-emerald-100/90 italic px-4 leading-relaxed'>
							"Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan
							hari kemudian..."
						</p>
						<p className='text-xs text-emerald-200/70 mt-3 font-medium'>(QS. At-Taubah: 18)</p>
					</div>
				</div>
			</aside>

			{/* ══════════ KOLOM KANAN – FORM ══════════ */}
			<main className='w-full md:w-[55%] flex items-center justify-center p-6 sm:p-12 relative'>
				<div className='w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 space-y-8 z-10'>
					{/* Header */}
					<div className='text-center md:text-left space-y-3'>
						{/* Logo mobile */}
						<div className='md:hidden w-16 h-16 bg-simas-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-simas-primary/20'>
							<span className='text-3xl'>🕌</span>
						</div>
						<h2 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Selamat Datang</h2>
						<p className='text-gray-500 font-medium'>Masuk ke panel administrasi SIMAS</p>
					</div>

					{/* Error Alert */}
					{showError && (
						<div className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 bg-red-50 border border-red-200'>
							<AlertCircle className='size-4 shrink-0' />
							Email atau password yang Anda masukkan salah.
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-6 mt-8'>
						{/* Email */}
						<div className='space-y-2.5'>
							<label htmlFor='email' className='text-gray-700 font-semibold'>
								Email
							</label>
							<div className='relative group'>
								<Mail className='absolute left-3.5 top-3 h-5 w-5 text-gray-400 group-focus-within:text-simas-primary transition-colors' />
								<Input
									id='email'
									type='email'
									placeholder='admin@masjid.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='pl-11 h-12 rounded-xl bg-gray-50/50 border-gray-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all'
								/>
							</div>
						</div>

						{/* Password */}
						<div className='space-y-2.5'>
							<label htmlFor='password' className='text-gray-700 font-semibold'>
								Password
							</label>
							<div className='relative group'>
								<Lock className='absolute left-3.5 top-3 h-5 w-5 text-gray-400 group-focus-within:text-simas-primary transition-colors' />
								<Input
									id='password'
									type={showPassword ? "text" : "password"}
									placeholder='••••••••'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className='pl-11 pr-11 h-12 rounded-xl bg-gray-50/50 border-gray-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors'
									aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
								>
									{showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
								</button>
							</div>
						</div>

						{/* Ingat Saya & Lupa Password */}
						<div className='flex items-center justify-between pt-2'>
							<label className='flex items-center gap-2 cursor-pointer select-none'>
								<input
									type='checkbox'
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className='size-4 rounded accent-simas-primary'
								/>
								<span className='text-sm font-medium text-gray-600'>Ingat Saya</span>
							</label>
							<a
								href='#'
								className='text-sm font-semibold text-simas-primary hover:text-emerald-700 hover:underline underline-offset-4 transition-colors'
							>
								Lupa Password?
							</a>
						</div>

						{/* Tombol Login */}
						<Button
							type='submit'
							disabled={loading}
							className='w-full h-12 text-base font-semibold bg-simas-primary hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2'
						>
							{loading && (
								<svg
									className='animate-spin size-4'
									viewBox='0 0 24 24'
									fill='none'
									stroke='white'
									strokeWidth='2.5'
								>
									<path d='M21 12a9 9 0 1 1-6.219-8.56' />
								</svg>
							)}
							Masuk Dashboard
						</Button>
					</form>

					{/* Bantuan */}
					<p className='text-center text-sm text-gray-500 pt-4'>
						Kesulitan masuk?{" "}
						<a href='#' className='font-semibold text-simas-primary hover:underline'>
							Hubungi Admin Pusat
						</a>
					</p>
				</div>
			</main>
		</div>
  );
}