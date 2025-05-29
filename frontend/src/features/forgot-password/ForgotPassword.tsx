'use client';

import useForgotPassword from '@api/auth/hooks/useForgotPassword';
import Input from '@components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '@shared/utils/toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
   email: z.string().email('Invalid email format'),
});

const ForgotPasswordPage = () => {
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
      },
   });

   const { mutate: forgotPassword, isPending } = useForgotPassword({
      onSuccess: async () => {
         toastSuccess({
            title: 'Success',
            description: 'Password reset email sent',
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
      forgotPassword({ email: values.email });
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
                  Forgot password?
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Please enter your email to reset your password.
               </p>
               <Input
                  name='email'
                  label='E-mail'
                  type='email'
                  error={form.formState.errors['email']?.message as string}
                  register={form.register('email')}
                  disabled={isPending}
               />

               <button
                  className='w-full rounded-lg bg-red500 px-4 py-3 text-white500 disabled:bg-red500/50'
                  disabled={isPending}
               >
                  Send
               </button>

               <Link href='/login' className='text-black600'>
                  Go back to login
               </Link>
            </div>
         </div>
      </form>
   );
};

export default ForgotPasswordPage;
