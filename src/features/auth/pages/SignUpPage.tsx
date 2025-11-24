import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { Seo } from '@/components/layout/Seo';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export const SignUpPage = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const registerUser = useAuthStore((state) => state.register);
  const status = useAuthStore((state) => state.status);

  const onSubmit = (values: FormValues) => {
    void registerUser(values);
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-8">
      <Seo title="Sign up" />
      <h1 className="text-3xl font-semibold text-ink">Create account</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" {...register('name')} error={formState.errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={formState.errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={formState.errors.password?.message} />
        <Button type="submit" fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating…' : 'Sign up'}
        </Button>
      </form>
    </div>
  );
};
