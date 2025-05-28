'use client';

import useDebounce from '@shared/hooks/useDebounce';
import { CloseIcon, SearchIcon } from '@shared/svgs';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   placeholder?: string;
   className?: string;
   containerClassname?: string;
   disabled?: boolean;
   searchTerm: string;
   setSearchTerm: Dispatch<SetStateAction<string>>;
}

const MobileSearch = ({
   placeholder = 'Search',
   className,
   containerClassname,
   disabled,
   searchTerm,
   setSearchTerm,
}: IProps) => {
   const router = useRouter();

   const debouncedSearchValue = useDebounce(searchTerm, 600);

   useEffect(() => {
      router.push(`?search=${encodeURIComponent(debouncedSearchValue)}`);
   }, [debouncedSearchValue]);

   const clearSearch = () => {
      setSearchTerm('');
      router.push(`/`);
   };

   return (
      <div
         data-testid='search'
         className={twMerge(
            'flex h-[50px] w-full flex-row items-center rounded-[10px] bg-white500 p-1 transition-colors duration-200 ease-linear lg:hidden',
            containerClassname,
            disabled && 'pointer-events-none'
         )}
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         <div className='h-fit w-fit p-3'>
            <SearchIcon className='size-[20px] text-gray500' />
         </div>
         <input
            type='search'
            id='search'
            className={twMerge(
               'h-full w-full border-none bg-transparent text-[15px] leading-5 text-black500 outline-none placeholder:text-gray500 focus:border-none focus:outline-none',
               className
            )}
            placeholder={placeholder}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoComplete='off'
         />
         {searchTerm && (
            <button
               className='mr-2 flex size-[16px] items-center justify-center'
               onClick={() => clearSearch()}
            >
               <CloseIcon className='size-[26px] text-black600' />
            </button>
         )}
      </div>
   );
};

export default MobileSearch;
