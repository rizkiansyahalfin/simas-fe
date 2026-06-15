import { z } from "zod";
import { REPORT_CATEGORIES, REPORT_FORMATS, REPORT_STATUS } from "../report.types";



export const reportFilterSchema = z
  .object({
    reportType: z.enum(REPORT_CATEGORIES),

    period: z
      .string()
      .trim()
      .min(1, "Periode wajib diisi."),

    startDate: z.date().optional(),

    endDate: z.date().optional(),

    format: z.enum(REPORT_FORMATS),

    status: z.enum(REPORT_STATUS),
  })
  .superRefine((data, ctx) => {
    if (
      data.startDate &&
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message:
          "Tanggal selesai tidak boleh lebih awal dari tanggal mulai.",
      });
    }
  });

export type ReportFilterSchema = z.infer<
  typeof reportFilterSchema
>;

export const reportFilterDefaultValues: ReportFilterSchema = {
  reportType: "ZIS",
  period: "Bulan Ini",
  startDate: undefined,
  endDate: undefined,
  format: "PDF",
  status: "ALL",
};