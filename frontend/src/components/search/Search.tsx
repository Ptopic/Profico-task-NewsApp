'use client';

import { QUERY_PARAM } from '@shared/constants/query';
import { useGetSearchParams } from '@shared/hooks/useGetSearchParams';
import { CloseIcon, SearchIcon } from '@shared/svgs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   placeholder?: string;
   className?: string;
   containerClassname?: string;
   disabled?: boolean;
}

const Search = ({
   placeholder = 'Search',
   className,
   containerClassname,
   disabled,
}: IProps) => {
   const router = useRouter();
   const searchValue = useGetSearchParams(QUERY_PARAM.SEARCH);

   const [searchTerm, setSearchTerm] = useState(
      decodeURIComponent(searchValue || '')
   );

   useEffect(() => {
      if (!searchValue) {
         setSearchTerm('');
      }
   }, [searchValue]);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   const handleSearch = () => {
      router.push(`?search=${encodeURIComponent(searchTerm)}`);
   };

   const clearSearch = () => {
      setSearchTerm('');
      router.push(`/`);
   };

   return (
      <div
         data-testid='search'
         className={twMerge(
            'flex h-[50px] w-[725px] flex-row items-center gap-1 rounded-[10px] bg-white500 p-1 transition-colors duration-200 ease-linear',
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
            onChange={handleSearchChange}
            value={searchTerm}
            autoComplete='off'
         />
         {searchTerm && (
            <button
               className='flex size-[26px] items-center justify-center'
               onClick={() => clearSearch()}
            >
               <CloseIcon className='size-[26px] text-black600' />
            </button>
         )}
         <div className='w-fit'>
            <button
               className='h-[40px] w-[95px] rounded-md bg-red500 text-[15px] font-bold uppercase leading-5 text-white500'
               onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleSearch();
               }}
            >
               Search
            </button>
         </div>
      </div>
   );
};

export default Search;
