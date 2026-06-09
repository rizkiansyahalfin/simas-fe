import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  forgotPasswordSchema,
} from '../validation/forgotPasswordSchema';

import type {
  ForgotPasswordFormValues,
} from '../validation/forgotPasswordSchema';

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

const simulateForgotPassword = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );
};

export default function ForgotPasswordPage() {
  const form =
    useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(
        forgotPasswordSchema
      ),
      defaultValues: {
        email: '',
      },
    });

  const mutation = useMutation({
    mutationFn: simulateForgotPassword,

    onSuccess: () => {
      toast.success(
        'Link reset password berhasil dikirim ke email Anda.'
      );

      form.reset();
    },
  });

  const onSubmit = (
    values: ForgotPasswordFormValues
  ) => {
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[480px] rounded-2xl shadow-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            LOGO
          </div>

          <div>
            <CardTitle>
              Lupa Password
            </CardTitle>

            <CardDescription>
              Masukkan email Anda untuk
              menerima link reset password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="johndoe@email.com"
                {...form.register(
                  'email'
                )}
              />

              {form.formState.errors
                .email && (
                <p className="text-sm text-red-500">
                  {
                    form.formState
                      .errors.email
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
                ? 'Mengirim...'
                : 'Kirim Link Reset'}
            </Button>

            <div className="text-center text-sm">
              <Link
                to="/login"
                className="text-primary hover:underline"
              >
                Kembali ke Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}