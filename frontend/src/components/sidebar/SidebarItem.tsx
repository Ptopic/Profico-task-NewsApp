import { twMerge } from 'tailwind-merge';
import { SidebarItem as SidebarItemType } from './type';

interface IProps {
   item: SidebarItemType;
   isActive: boolean;
   setCategory: (category: string) => void;
}

const SidebarItem = ({ item, isActive, setCategory }: IProps) => {
   return (
      <div
         key={item.name}
         className={twMerge(
            'flex size-[63px] flex-col items-center justify-center gap-1 rounded-[5px] hover:cursor-pointer',
            isActive && 'bg-white500'
         )}
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
         onClick={() => setCategory(item.value)}
      >
         <div
            className={twMerge(
               'size-[20px] text-gray500',
               isActive && 'text-red500'
            )}
         >
            {item.icon}
         </div>
         <p
            className={twMerge(
               'text-[10px] font-semibold leading-[14px] text-gray500',
               isActive && 'text-red500'
            )}
         >
            {item.name}
         </p>
      </div>
   );
};

export default SidebarItem;
