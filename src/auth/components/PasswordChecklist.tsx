import {
  CheckCircle2,
  XCircle,
} from 'lucide-react';

type PasswordChecklistProps = {
  password?: string;
};

type Rule = {
  label: string;
  valid: boolean;
};

export const PasswordChecklist = ({
  password = "",
}: PasswordChecklistProps) => {
  const rules: Rule[] = [
    {
      label: 'Minimal 8 karakter',
      valid: password.length >= 8,
    },
    {
      label: 'Mengandung huruf besar',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'Mengandung huruf kecil',
      valid: /[a-z]/.test(password),
    },
    {
      label: 'Mengandung angka',
      valid: /\d/.test(password),
    },
    {
      label: 'Mengandung simbol',
      valid: /[^A-Za-z\d]/.test(password),
    },
  ];

  return (
    <div className="space-y-2">
      {rules.map((rule) => (
        <div
          key={rule.label}
          className="flex items-center gap-2 text-sm"
        >
          {rule.valid ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}

          <span
            className={
              rule.valid
                ? 'text-emerald-600'
                : 'text-muted-foreground'
            }
          >
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
};