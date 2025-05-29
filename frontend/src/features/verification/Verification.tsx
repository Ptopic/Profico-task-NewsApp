'use client';

import useResendConfirmationEmail from '@api/auth/hooks/useResendConfirmationEmail';
import { LOGIN, removeAuthTokens } from '@shared/utils';
import { toastError, toastSuccess } from '@shared/utils/toast';
import { useQueryClient } from '@tanstack/react-query';

const VerificationPage = () => {
   const queryClient = useQueryClient();

   const { mutate: resendConfirmationEmail, isPending } =
      useResendConfirmationEmail({
         onSuccess: () => {
            toastSuccess({
               title: 'Email sent',
               description: 'Please check your email.',
            });
         },
         onError: (error) => {
            toastError({
               title: 'Error',
               description: error.message,
            });
         },
      });

   const handleLogout = async () => {
      await removeAuthTokens();
      window.location.href = LOGIN;
      await queryClient.invalidateQueries();
      // queryClient.removeQueries({ queryKey: [CURRENT_USER] });
   };

   return (
      <div className='flex h-full w-full items-start bg-white500 px-4 py-6 lg:items-center lg:pl-[5dvw] lg:pr-[15dvw]'>
         <div className='flex w-full flex-col gap-4'>
            <div className='flex w-full flex-col gap-4'>
               <p className='text-[24px] font-bold leading-[100%] text-black600'>
                  Confirm your email!
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Your account has been successfully registered. To complete the
                  process please{' '}
                  <span className='text-red500'>check your email</span> for a
                  validation request.
               </p>
            </div>
            <button
               className='w-full rounded-lg bg-red500 px-4 py-3 text-white500'
               onClick={() => resendConfirmationEmail()}
               disabled={isPending}
            >
               Resend e-mail
            </button>

            <button className='w-full' onClick={handleLogout}>
               Logout
            </button>
         </div>
      </div>
   );
};

export default VerificationPage;
