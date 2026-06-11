import type { AttendanceMonthlyData, AttendanceReportItem } from "../attendance-report.types";


const names = [
  "Ahmad Fauzi",
  "Muhammad Rizki",
  "Abdul Rahman",
  "Fajar Nugroho",
  "Dimas Saputra",
  "Rizal Ramadhan",
  "Andi Pratama",
  "Budi Santoso",
  "Arif Hidayat",
  "Yusuf Maulana",
  "Fikri Akbar",
  "Rafi Nugraha",
  "Iqbal Ramadhan",
  "Farhan Hakim",
  "Hendra Wijaya",
  "Dewi Lestari",
  "Nur Aisyah",
  "Siti Khadijah",
  "Aulia Putri",
  "Nabila Zahra",
  "Fitri Handayani",
  "Rina Kartika",
  "Putri Maharani",
  "Anisa Rahma",
  "Nadia Safitri",
];

const generateStatus = (
  percentage: number
): AttendanceReportItem["status"] => {
  if (percentage >= 85) return "Sangat Aktif";
  if (percentage >= 65) return "Aktif";
  return "Kurang Aktif";
};

export const attendanceMockData: AttendanceReportItem[] = Array.from(
  { length: 50 },
  (_, index) => {
    const totalAttendance = Math.floor(Math.random() * 120) + 20;
    const totalAbsent = Math.floor(Math.random() * 30);
    const percentage = Math.min(
      100,
      Math.round(
        (totalAttendance / (totalAttendance + totalAbsent || 1)) * 100
      )
    );

    const name = `${names[index % names.length]} ${
      index + 1
    }`;

    return {
      id: String(index + 1),
      memberNumber: `AGT-${String(index + 1).padStart(4, "0")}`,
      name,
      email: name
        .toLowerCase()
        .replace(/\s/g, ".")
        .concat("@gmail.com"),
      totalAttendance,
      totalAbsent,
      attendancePercentage: percentage,
      status: generateStatus(percentage),
    };
  }
);

export const monthlyAttendanceMock: AttendanceMonthlyData[] = [

  { month: "Jan", totalAttendance: 620 },
  { month: "Feb", totalAttendance: 710 },
  { month: "Mar", totalAttendance: 850 },
  { month: "Apr", totalAttendance: 930 },
  { month: "Mei", totalAttendance: 780 },
  { month: "Jun", totalAttendance: 810 },
  { month: "Jul", totalAttendance: 860 },
  { month: "Agu", totalAttendance: 920 },
  { month: "Sep", totalAttendance: 980 },
  { month: "Okt", totalAttendance: 1010 },
  { month: "Nov", totalAttendance: 1090 },
  { month: "Des", totalAttendance: 1180 },
];