import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { Seo } from '@/components/layout/Seo';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export const SignInPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const signIn = useAuthStore((state) => state.signIn);
  const status = useAuthStore((state) => state.status);

  const onSubmit = (values: FormValues) => {
    void signIn(values.email, values.password);
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-8">
      <Seo title="Sign in" />
      <h1 className="text-3xl font-semibold text-ink">Sign in</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" {...register('email')} error={formState.errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={formState.errors.password?.message} />
        <Button type="submit" fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <button className="mt-4 text-sm text-brand underline" type="button">
        Forgot password (we will email you a reset link)
      </button>
    </div>
  );
};
