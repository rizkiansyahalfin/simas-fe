import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(
        passwordRegex,
        'Password harus mengandung huruf besar, huruf kecil, angka, dan simbol'
      ),

    confirmPassword: z
      .string()
      .min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Konfirmasi password tidak cocok',
    }
  );

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordSchema
>;