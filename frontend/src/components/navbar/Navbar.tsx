import MobileSearch from '@components/search/MobileSearch';
import { SidebarItems } from '@components/sidebar/constants';
import { CloseIcon, HamburgerIcon } from '@shared/svgs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NavbarItem from './NavbarItem';

interface IProps {
   category: string;
   setCategory: Dispatch<SetStateAction<string>>;
   searchTerm: string;
   setSearchTerm: Dispatch<SetStateAction<string>>;
   setSelectedTab: Dispatch<SetStateAction<string>>;
}

const Navbar = ({
   category,
   setCategory,
   searchTerm,
   setSearchTerm,
   setSelectedTab,
}: IProps) => {
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'auto';
      }
   }, [isOpen]);

   return (
      <div className='fixed left-0 right-0 top-0 z-50 h-fit w-[100dvh-32px] bg-white600 p-4 lg:hidden'>
         <div className='flex flex-row items-center justify-between'>
            <p className='text-[24px] font-black leading-[100%] text-red500'>
               My<span className='text-black600'>News</span>
            </p>
            <button
               className='flex items-center justify-center p-2 hover:cursor-pointer'
               onClick={() => setIsOpen(true)}
            >
               <HamburgerIcon className='size-6 flex-shrink-0 text-black600' />
            </button>
         </div>
         {isOpen && (
            <div className='fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-white600 p-4'>
               <div className='flex flex-col gap-4'>
                  <div className='flex flex-row items-center justify-end'>
                     <button
                        className='flex items-center justify-center p-2 hover:cursor-pointer'
                        onClick={() => setIsOpen(false)}
                     >
                        <CloseIcon className='size-6 flex-shrink-0 text-black600' />
                     </button>
                  </div>
                  <div className='flex h-[15dvh] items-center justify-center'>
                     <p className='text-[32px] font-black leading-[100%] text-red500'>
                        My<span className='text-black600'>News</span>
                     </p>
                  </div>
                  <div className='flex w-full items-center justify-center'>
                     <MobileSearch
                        placeholder='Search news'
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                     />
                  </div>
                  <div className='grid grid-cols-[repeat(auto-fill,95px)] place-items-center items-center justify-center gap-4 p-4'>
                     {SidebarItems.map((item) => (
                        <NavbarItem
                           key={item.name}
                           item={item}
                           isActive={category === item.value}
                           setCategory={setCategory}
                           setSelectedTab={setSelectedTab}
                           setIsOpen={setIsOpen}
                        />
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Navbar;
