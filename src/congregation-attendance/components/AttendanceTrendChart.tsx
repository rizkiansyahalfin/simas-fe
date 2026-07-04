// src/features/congregation-attendance/components/AttendanceTrendChart.tsx

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const trendData = [
  { month: 'Jan', attendance: 80 },
  { month: 'Feb', attendance: 85 },
  { month: 'Mar', attendance: 78 },
  { month: 'Apr', attendance: 92 },
  { month: 'Mei', attendance: 88 },
  { month: 'Jun', attendance: 84 },
  { month: 'Jul', attendance: 90 },
  { month: 'Agu', attendance: 87 },
  { month: 'Sep', attendance: 89 },
  { month: 'Okt', attendance: 91 },
  { month: 'Nov', attendance: 86 },
  { month: 'Des', attendance: 94 },
];

export function AttendanceTrendChart() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>
          Tren Kehadiran 12 Bulan
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}