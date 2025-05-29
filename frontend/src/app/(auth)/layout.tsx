import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className='flex h-[100dvh] flex-col-reverse overflow-y-auto lg:grid lg:grid-cols-2'>
         {children}
         <div className='z-30 flex h-[30dvh] w-full flex-shrink-0 flex-col items-center justify-center gap-6 bg-white600 lg:h-full'>
            <p className='text-[48px] font-black leading-[100%] text-red500'>
               My<span className='text-black600'>News</span>
            </p>
            <p className='text-[24px] font-medium leading-[100%] text-black600'>
               Your news. Your way.
            </p>
         </div>
      </div>
   );
};

export default AuthLayout;
