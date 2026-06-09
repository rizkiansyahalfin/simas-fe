import { useState } from 'react';
import {
  Eye,
  EyeOff,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  resetPasswordSchema
} from '../validation/resetPasswordSchema';

import type {
  ResetPasswordFormValues
} from '../validation/resetPasswordSchema';

import { PasswordStrength } from '../components/PasswordStrength';
import { PasswordChecklist } from '../components/PasswordChecklist';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { toast } from 'sonner';

const simulateResetPassword =
  async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );
  };

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const form =
    useForm<ResetPasswordFormValues>({
      resolver: zodResolver(
        resetPasswordSchema
      ),
      mode: 'onChange',

      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    });

  const password =
  form.watch('password') ?? '';
    
  console.log('password:', password);

  const mutation = useMutation({
    mutationFn:
      simulateResetPassword,

    onSuccess: () => {
      toast.success(
        'Password berhasil diperbarui.'
      );

      navigate('/login');
    },
  });

  const onSubmit = (
    values: ResetPasswordFormValues
  ) => {
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[480px] rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>
            Reset Password
          </CardTitle>

          <CardDescription>
            Buat password baru untuk
            akun Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>
                Password Baru
              </Label>

              <div className="relative">
                <Input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  {...form.register(
                    'password'
                  )}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) =>
                        !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <PasswordStrength
                password={password}
              />

              <PasswordChecklist
                password={password}
              />

              {form.formState.errors
                .password && (
                <p className="text-sm text-red-500">
                  {
                    form.formState
                      .errors.password
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Konfirmasi Password
              </Label>

              <div className="relative">
                <Input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  {...form.register(
                    'confirmPassword'
                  )}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) =>
                        !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {form.formState.errors
                .confirmPassword && (
                <p className="text-sm text-red-500">
                  {
                    form.formState
                      .errors
                      .confirmPassword
                      .message
                  }
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? 'Memperbarui Password...'
                : 'Simpan Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}