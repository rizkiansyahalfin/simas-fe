import { useMemo } from 'react';

export type PasswordStrengthResult = {
  score: number;
  label: 'Weak' | 'Medium' | 'Strong';
  percentage: number;
};

const checks = [
  (password: string) => password.length >= 8,
  (password: string) => /[A-Z]/.test(password),
  (password: string) => /[a-z]/.test(password),
  (password: string) => /\d/.test(password),
  (password: string) => /[^A-Za-z\d]/.test(password),
];

export const usePasswordStrength = (
  password?: string
): PasswordStrengthResult => {
    const safePassword = password ?? '';

  return useMemo(() => {
    const score = checks.reduce(
      (acc, check) => acc + (check(safePassword) ? 1 : 0),
      0
    );

    let label: PasswordStrengthResult['label'] = 'Weak';

    if (score >= 4) {
      label = 'Strong';
    } else if (score >= 2) {
      label = 'Medium';
    }

    return {
      score,
      label,
      percentage: (score / 5) * 100,
    };
  }, [password]);
};