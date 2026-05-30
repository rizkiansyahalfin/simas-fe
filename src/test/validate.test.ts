import { describe, it, expect } from "vitest";
import { validateForm, required, minLength, email, phone, positiveNumber, matchField } from "@/lib/validate";

describe("required", () => {
  it("returns error for empty string", () => {
    expect(required("Nama").validate("", {})).toBe("Nama wajib diisi.");
  });

  it("returns null for non-empty string", () => {
    expect(required("Nama").validate("John", {})).toBeNull();
  });

  it("returns null for whitespace-only string", () => {
    expect(required("Nama").validate("   ", {})).toBe("Nama wajib diisi.");
  });
});

describe("minLength", () => {
  it("returns error for short string", () => {
    expect(minLength("Password", 8).validate("abc", {})).toBe("Password minimal 8 karakter.");
  });

  it("returns null for sufficient length", () => {
    expect(minLength("Password", 8).validate("abcdefgh", {})).toBeNull();
  });
});

describe("email", () => {
  it("returns null for valid email", () => {
    expect(email.validate("test@example.com", {})).toBeNull();
  });

  it("returns error for invalid email", () => {
    expect(email.validate("not-an-email", {})).toBe("Format email tidak valid.");
  });

  it("returns null for empty email", () => {
    expect(email.validate("", {})).toBeNull();
  });
});

describe("positiveNumber", () => {
  it("returns null for positive number", () => {
    expect(positiveNumber("Nominal").validate("50000", {})).toBeNull();
  });

  it("returns error for zero", () => {
    expect(positiveNumber("Nominal").validate("0", {})).toBe("Nominal harus berupa angka positif.");
  });

  it("returns null for empty", () => {
    expect(positiveNumber("Nominal").validate("", {})).toBeNull();
  });
});

describe("matchField", () => {
  it("returns null when fields match", () => {
    expect(matchField("Password", "confirmPassword").validate("abc", { confirmPassword: "abc" })).toBeNull();
  });

  it("returns error when fields differ", () => {
    expect(matchField("Password", "confirmPassword").validate("abc", { confirmPassword: "xyz" })).toBe("Password tidak cocok.");
  });
});

describe("validateForm", () => {
  it("returns empty object for valid data", () => {
    const errors = validateForm({ name: "John", email: "john@test.com" }, {
      name: [required("Nama")],
      email: [email],
    });
    expect(errors).toEqual({});
  });

  it("returns errors for invalid data", () => {
    const errors = validateForm({ name: "", email: "bad" }, {
      name: [required("Nama")],
      email: [email],
    });
    expect(errors.name).toBe("Nama wajib diisi.");
    expect(errors.email).toBe("Format email tidak valid.");
  });

  it("stops at first error per field", () => {
    const errors = validateForm({ name: "" }, {
      name: [required("Nama"), minLength("Nama", 3)],
    });
    expect(errors.name).toBe("Nama wajib diisi.");
  });
});
