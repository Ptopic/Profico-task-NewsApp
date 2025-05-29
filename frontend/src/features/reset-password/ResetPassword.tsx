'use client';

import useResetPassword from '@api/auth/hooks/useResetPassword';
import PasswordInput from '@components/input/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '@shared/utils/toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
   .object({
      currentPassword: z.string().min(4, 'Current password is required'),
      newPassword: z.string().min(4, 'New password is required'),
      confirmNewPassword: z.string().min(4, 'Confirm new password is required'),
   })
   .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords don't match",
      path: ['confirmNewPassword'],
   });

const ResetPasswordPage = () => {
   const router = useRouter();

   const searchParams = useSearchParams();
   const resetPasswordTokenValue = searchParams.get('resetPasswordToken');
   const resetPasswordToken = resetPasswordTokenValue
      ? decodeURIComponent(resetPasswordTokenValue).replace(/ /g, '+')
      : null;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmNewPassword: '',
      },
   });

   const { mutate: resetPassword, isPending } = useResetPassword({
      onSuccess: async () => {
         toastSuccess({
            title: 'Success',
            description: 'Password reset successfully',
         });

         setTimeout(() => {
            router.push('/');
         }, 1000);
      },
      onError: (error) => {
         toastError({
            title: 'Error',
            description: error.message,
         });
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      resetPassword({
         currentPassword: values.currentPassword,
         newPassword: values.newPassword,
         confirmNewPassword: values.confirmNewPassword,
         token: resetPasswordToken as string,
      });
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
                  Reset password
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Please enter your current password and new password.
               </p>

               <PasswordInput
                  name='currentPassword'
                  label='Current password'
                  type='password'
                  error={
                     form.formState.errors['currentPassword']?.message as string
                  }
                  register={form.register('currentPassword')}
                  disabled={isPending}
               />

               <PasswordInput
                  name='newPassword'
                  label='New password'
                  type='password'
                  error={
                     form.formState.errors['newPassword']?.message as string
                  }
                  register={form.register('newPassword')}
                  disabled={isPending}
               />

               <PasswordInput
                  name='confirmNewPassword'
                  label='Confirm new password'
                  type='password'
                  error={
                     form.formState.errors['confirmNewPassword']
                        ?.message as string
                  }
                  register={form.register('confirmNewPassword')}
                  disabled={isPending}
               />

               <button
                  className='w-full rounded-lg bg-red500 px-4 py-3 text-white500 disabled:bg-red500/50'
                  disabled={isPending}
               >
                  Reset password
               </button>

               <Link href='/login' className='text-black600'>
                  Go back to login
               </Link>
            </div>
         </div>
      </form>
   );
};

export default ResetPasswordPage;
