import { SidebarItem as SidebarItemType } from '@components/sidebar/type';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   item: SidebarItemType;
   isActive: boolean;
   setCategory: Dispatch<SetStateAction<string>>;
   setSelectedTab: Dispatch<SetStateAction<string>>;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarItem = ({
   item,
   isActive,
   setCategory,
   setSelectedTab,
   setIsOpen,
}: IProps) => {
   return (
      <div
         className={twMerge(
            'flex h-[95px] w-[95px] flex-col items-center justify-center gap-2 rounded-[5px] hover:cursor-pointer',
            isActive && 'bg-white500'
         )}
         style={{
            boxShadow: isActive
               ? '0px 6px 36px 0px rgba(0, 0, 0, 0.16)'
               : 'none',
         }}
         onClick={() => {
            setCategory(item.value);
            setSelectedTab('Featured');
            setIsOpen(false);
         }}
      >
         <div
            className={twMerge(
               'text-gray600 size-6',
               isActive && 'text-red500'
            )}
         >
            {item.icon}
         </div>
         <p
            className={twMerge(
               'text-gray600 text-center text-sm leading-5',
               isActive && 'text-red500'
            )}
         >
            {item.name}
         </p>
      </div>
   );
};

export default NavbarItem;
