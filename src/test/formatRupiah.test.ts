import { describe, it, expect } from "vitest";
import { formatRupiah } from "@/lib/formatRupiah";

describe("formatRupiah", () => {
  it("formats whole numbers with IDR locale", () => {
    expect(formatRupiah(500000)).toBe("Rp 500.000");
    expect(formatRupiah(1000000)).toBe("Rp 1.000.000");
    expect(formatRupiah(0)).toBe("Rp 0");
  });

  it("formats small numbers", () => {
    expect(formatRupiah(500)).toBe("Rp 500");
    expect(formatRupiah(1500)).toBe("Rp 1.500");
  });

  it("formats large numbers", () => {
    expect(formatRupiah(1000000000)).toBe("Rp 1.000.000.000");
  });

  it("formats negative numbers", () => {
    expect(formatRupiah(-50000)).toBe("Rp -50.000");
  });
});
