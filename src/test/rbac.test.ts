import { describe, it, expect } from "vitest";
import { canAccess } from "@/lib/rbac";

describe("canAccess", () => {
  it("grants superadmin access to all resources", () => {
    const resources = [
      "keuangan", "donasi", "laporan", "artikel", "kegiatan",
      "inventaris", "dashboard", "pengaturan", "profil-masjid",
      "jamaah", "gallery", "pengurus", "congregationdetail",
    ];
    for (const resource of resources) {
      expect(canAccess("superadmin", resource)).toBe(true);
    }
  });

  it("grants bendahara access to keuangan, donasi, laporan", () => {
    expect(canAccess("bendahara", "keuangan")).toBe(true);
    expect(canAccess("bendahara", "donasi")).toBe(true);
    expect(canAccess("bendahara", "laporan")).toBe(true);
    expect(canAccess("bendahara", "artikel")).toBe(false);
    expect(canAccess("bendahara", "inventaris")).toBe(false);
  });

  it("grants sekretaris access to artikel, kegiatan, jamaah", () => {
    expect(canAccess("sekretaris", "artikel")).toBe(true);
    expect(canAccess("sekretaris", "kegiatan")).toBe(true);
    expect(canAccess("sekretaris", "jamaah")).toBe(true);
    expect(canAccess("sekretaris", "keuangan")).toBe(false);
    expect(canAccess("sekretaris", "inventaris")).toBe(false);
  });

  it("grants operator access to donasi and inventaris", () => {
    expect(canAccess("operator", "donasi")).toBe(true);
    expect(canAccess("operator", "inventaris")).toBe(true);
    expect(canAccess("operator", "keuangan")).toBe(true);
    expect(canAccess("operator", "artikel")).toBe(false);
  });

  it("grants admin kegiatan access to artikel, kegiatan", () => {
    expect(canAccess("admin kegiatan", "artikel")).toBe(true);
    expect(canAccess("admin kegiatan", "kegiatan")).toBe(true);
    expect(canAccess("admin kegiatan", "inventaris")).toBe(false);
  });

  it("grants admin inventaris access to inventaris only", () => {
    expect(canAccess("admin inventaris", "inventaris")).toBe(true);
    expect(canAccess("admin inventaris", "keuangan")).toBe(false);
    expect(canAccess("admin inventaris", "artikel")).toBe(false);
  });

  it("grants dashboard and pengaturan to all roles", () => {
    const roles = ["bendahara", "sekretaris", "operator", "admin kegiatan", "admin inventaris"] as const;
    for (const role of roles) {
      expect(canAccess(role, "dashboard")).toBe(true);
      expect(canAccess(role, "pengaturan")).toBe(true);
    }
  });

  it("denies audit-log to non-superadmin roles", () => {
    const roles = ["bendahara", "sekretaris", "operator", "admin kegiatan", "admin inventaris"] as const;
    for (const role of roles) {
      expect(canAccess(role, "audit-log")).toBe(false);
    }
  });

  it("allows superadmin to access audit-log", () => {
    expect(canAccess("superadmin", "audit-log")).toBe(true);
  });
});
