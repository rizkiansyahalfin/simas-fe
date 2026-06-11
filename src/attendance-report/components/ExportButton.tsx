import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";


import { useExportAttendance } from "../hooks/useExportAttendance";
import type { AttendanceReportItem } from "../attendance-report.types";

interface ExportButtonProps {
  data: AttendanceReportItem[];
}

export const ExportButton = ({
  data,
}: ExportButtonProps) => {
  const { exportAttendance } =
    useExportAttendance();

  return (
    <Button
      onClick={() => exportAttendance(data)}
      className="gap-2"
    >
      <Download className="h-4 w-4" />

      Export Excel
    </Button>
  );
};