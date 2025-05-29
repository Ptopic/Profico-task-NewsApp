'use client';

import useLogin from '@api/auth/hooks/useLogin';
import Input from '@components/input';
import PasswordInput from '@components/input/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { setAuthTokens } from '@shared/utils';
import { toastError } from '@shared/utils/toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
   email: z.string().email('Invalid email format'),
   password: z.string().min(4, 'Password is required'),
});

const LoginPage = () => {
   const router = useRouter();

   const searchParams = useSearchParams();
   const verificationTokenValue = searchParams.get('verificationToken');
   const verificationToken = verificationTokenValue
      ? decodeURIComponent(verificationTokenValue).replace(/ /g, '+')
      : null;

   const resetPasswordTokenValue = searchParams.get('resetPasswordToken');
   const resetPasswordToken = resetPasswordTokenValue
      ? decodeURIComponent(resetPasswordTokenValue).replace(/ /g, '+')
      : null;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const { mutate: login, isPending } = useLogin({
      onSuccess: async (data) => {
         await setAuthTokens(data);

         if (verificationToken) {
            router.push(
               `/confirm-email?verificationToken=${verificationToken}`
            );
         } else if (resetPasswordToken) {
            router.push(
               `/reset-password?resetPasswordToken=${resetPasswordToken}`
            );
         } else {
            router.push('/');
         }
      },
      onError: (error) => {
         toastError({
            title: 'Error',
            description: error.message,
         });
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      login(values);
   };

   return (
      <form
         className='flex h-full w-full bg-white500'
         onSubmit={form.handleSubmit(onSubmit)}
         noValidate
      >
         <div className='flex h-full w-full items-start px-4 py-6 lg:items-center lg:pl-[5dvw] lg:pr-[15dvw]'>
            <div className='flex w-full flex-col gap-4'>
               <p className='text-[24px] font-bold leading-[100%] text-black600'>
                  Login to your account
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Welcome back! Please enter your details.
               </p>
               <Input
                  name='email'
                  label='E-mail'
                  type='email'
                  error={form.formState.errors['email']?.message as string}
                  register={form.register('email')}
                  disabled={isPending}
               />

               <PasswordInput
                  name='password'
                  label='Password'
                  type='password'
                  error={form.formState.errors['password']?.message as string}
                  register={form.register('password')}
                  topRightElement={
                     <Link href='/forgot-password' className='text-red500'>
                        Forgot password?
                     </Link>
                  }
                  disabled={isPending}
               />

               <button
                  className='w-full rounded-lg bg-red500 px-4 py-3 text-white500 disabled:bg-red500/50'
                  disabled={isPending}
               >
                  Login
               </button>

               <p className='text-center text-black600'>
                  Don't have an account?{' '}
                  <Link href='/register' className='text-red500'>
                     Sign up
                  </Link>
               </p>
            </div>
         </div>
      </form>
   );
};

export default LoginPage;
