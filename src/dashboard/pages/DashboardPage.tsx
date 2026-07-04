import Header from '../components/Header'
import KpiCard from '../components/KpiCard'
import QuickStatus from '../components/quickStatus'
import FinanceChart from '../components/financeChart'
import DonationPiechart from '../components/DonationPiechart'
import MonthlyChart from '../components/monthlyChart'
import RecentActivity from '../components/recentActivity'
import AnnualSummaryPage from './annualSumPages'
import { useState } from 'react'


/* ─── Recharts custom tooltips ─── */



/* ─── Page ─── */
export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'annual'>('dashboard')
    return (
        <div className="space-y-6">

            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "dashboard" && (
                <>
                    <KpiCard />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <FinanceChart />
                        <DonationPiechart />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <MonthlyChart />
                        <RecentActivity />
                    </div>

                    <QuickStatus />
                </>
            )}

            {activeTab === "annual" && (
                <AnnualSummaryPage />
            )}
        </div>
    )
}