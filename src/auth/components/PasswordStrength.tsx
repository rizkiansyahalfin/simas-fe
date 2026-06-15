import { usePasswordStrength } from '../hooks/usePasswordStrength';

type PasswordStrengthProps = {
  password?: string;
};

export const PasswordStrength = ({
  password = "",
}: PasswordStrengthProps) => {
  const {
    label,
    percentage,
  } = usePasswordStrength(password);

  const getBarColor = () => {
    switch (label) {
      case 'Weak':
        return 'bg-red-500';

      case 'Medium':
        return 'bg-amber-500';

      case 'Strong':
        return 'bg-emerald-500';

      default:
        return 'bg-slate-300';
    }
  };

  const getLabelColor = () => {
    switch (label) {
      case 'Weak':
        return 'text-red-500';

      case 'Medium':
        return 'text-amber-500';

      case 'Strong':
        return 'text-emerald-500';

      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Password Strength
        </span>

        <span
          className={`text-sm font-semibold ${getLabelColor()}`}
        >
          {label}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full transition-all duration-300 ${getBarColor()}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};