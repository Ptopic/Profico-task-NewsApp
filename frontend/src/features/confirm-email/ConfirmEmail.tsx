'use client';

import useConfirmEmail from '@api/auth/hooks/useConfirmEmail';
import useResendConfirmationEmail from '@api/auth/hooks/useResendConfirmationEmail';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { ErrorIcon, SuccessIcon } from '@shared/svgs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ConfirmEmailPage = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const verificationTokenValue = searchParams.get('verificationToken');
   const verificationToken = verificationTokenValue
      ? decodeURIComponent(verificationTokenValue).replace(/ /g, '+')
      : null;

   const [serverError, setServerError] = useState('');

   const [isLoading, setIsLoading] = useState(true);
   const [isEmailVerified, setIsEmailVerified] = useState(false);

   useEffect(() => {
      setIsLoading(false);
   }, [verificationToken]);

   const { mutate: confirmEmail, isError: isConfirmingEmailError } =
      useConfirmEmail({
         onSuccess: async () => {
            setIsEmailVerified(true);
            setServerError('');
            setTimeout(() => {
               router.push('/');
            }, 1000);
         },
         onError: (error) => {
            setServerError(error.message);
         },
      });

   const { mutate: sendConfirmationEmail, isPending } =
      useResendConfirmationEmail({
         onError: (error) => {
            setServerError(error.message);
         },
      });

   const handleResendEmail = async () => {
      setServerError('');

      sendConfirmationEmail();
   };

   useEffect(() => {
      if (verificationToken != null && !isLoading) {
         confirmEmail({ token: verificationToken });
      }
   }, [verificationToken, isLoading]);

   if (isConfirmingEmailError || !verificationToken) {
      return (
         <div className='flex h-full w-full items-start bg-white500 px-4 py-6 lg:items-center lg:pl-[5dvw] lg:pr-[15dvw]'>
            <div className='flex flex-col gap-4 text-red500'>
               <div className='flex flex-col gap-2'>
                  <h2 className='flex items-center gap-2 text-[24px] font-bold leading-[100%]'>
                     <ErrorIcon className='size-[20px]' />
                     Token is invalid
                  </h2>
                  <p className='text-[16px] leading-[100%] text-black600'>
                     The verification link is invalid or has expired
                  </p>
               </div>
               <button
                  className='w-full rounded-lg bg-red500 px-4 py-3 text-white500'
                  onClick={handleResendEmail}
                  disabled={isPending}
               >
                  Resend e-mail
               </button>
               {serverError && (
                  <span className='text-[16px] leading-[100%] text-red500'>
                     {serverError}
                  </span>
               )}
               <Link
                  href='/'
                  className='text-[16px] leading-[100%] text-black600'
               >
                  Go to home page
               </Link>
            </div>
         </div>
      );
   }

   if (isEmailVerified) {
      return (
         <div className='flex h-full w-full items-start bg-white500 px-4 py-6 lg:items-center lg:pl-[5dvw] lg:pr-[15dvw]'>
            <div className='flex flex-col gap-2 text-green500'>
               <h2 className='flex items-center gap-2 text-[24px] font-bold leading-[100%]'>
                  <SuccessIcon className='size-[20px] text-green500' />
                  Email Verified
               </h2>
               <p className='text-[16px] leading-[100%] text-black600'>
                  Your email address has been verified successfully
               </p>
               <p className='text-[16px] leading-[100%] text-black600'>
                  You will be redirected to the home page in a few seconds
               </p>
            </div>
         </div>
      );
   }

   return isLoading ? (
      <div className='flex h-full w-full items-start bg-white500 px-4 py-6 lg:items-center lg:justify-center lg:pl-[5dvw] lg:pr-[15dvw]'>
         <PulsatingDotsSpinner />
      </div>
   ) : (
      <div className='flex h-full w-full items-start bg-white500 px-4 py-6 lg:items-center lg:pl-[5dvw] lg:pr-[15dvw]'>
         <div className='flex flex-col gap-2'>
            <h2 className='text-[24px] font-bold leading-[100%] text-black600'>
               Verifying your email...
            </h2>
            <p className='text-[16px] leading-[100%] text-black600'>
               Please wait while we confirm your email address
            </p>
         </div>
      </div>
   );
};

export default ConfirmEmailPage;
