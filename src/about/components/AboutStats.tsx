import {  STATS } from '../data/masjidData'
 
export default function AboutStats() {
  return (
 <section className="bg-white dark:bg-slate-950 py-10 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, Icon }) => (
              <div key={label} className="about-stat-item">
                <div className="about-stat-icon"><Icon className="size-5"/></div>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}