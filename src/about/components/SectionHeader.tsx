import { SectionLabel } from "../pages/AboutPages"



export function SectionHeader({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">{title}</h2>
      {sub && <p className="text-gray-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto text-base">{sub}</p>}
    </div>
  )
}