'use client';
import useRegister from '@api/auth/hooks/useRegister';
import { IRegisterPayload } from '@api/auth/types';
import Input from '@components/input';
import PasswordInput from '@components/input/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { setAuthTokens } from '@shared/utils';
import { toastError } from '@shared/utils/toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
   .object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(4, 'Password is required'),
      confirmPassword: z.string().min(4, 'Confirm password is required'),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   });

const RegisterPage = () => {
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         firstName: '',
         lastName: '',
         password: '',
         confirmPassword: '',
      },
   });

   const {
      mutate: register,
      isPending,
   }: {
      mutate: (data: IRegisterPayload) => void;
      isPending: boolean;
   } = useRegister({
      onSuccess: async (data) => {
         await setAuthTokens(data);

         router.push('/');
      },
      onError: (error) => {
         toastError({
            title: 'Error',
            description: error.message,
         });
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      register({ ...values });
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
                  Create your account
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Please enter your details to get started.
               </p>

               <Input
                  name='firstName'
                  label='First Name'
                  type='text'
                  error={form.formState.errors['firstName']?.message as string}
                  register={form.register('firstName')}
                  disabled={isPending}
               />

               <Input
                  name='lastName'
                  label='Last Name'
                  type='text'
                  error={form.formState.errors['lastName']?.message as string}
                  register={form.register('lastName')}
                  disabled={isPending}
               />

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
                  error={form.formState.errors['password']?.message as string}
                  register={form.register('password')}
                  disabled={isPending}
               />

               <PasswordInput
                  name='confirmPassword'
                  label='Confirm Password'
                  error={
                     form.formState.errors['confirmPassword']?.message as string
                  }
                  register={form.register('confirmPassword')}
                  disabled={isPending}
               />

               <button
                  type='submit'
                  className='w-full rounded-lg bg-red500 px-4 py-3 text-white500 disabled:bg-red500/50'
                  disabled={isPending}
               >
                  Sign Up
               </button>

               <p className='text-center text-black600'>
                  Already have an account?{' '}
                  <Link href='/login' className='text-red500'>
                     Sign in
                  </Link>
               </p>
            </div>
         </div>
      </form>
   );
};

export default RegisterPage;
