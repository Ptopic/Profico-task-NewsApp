import { LogoutIcon } from '@shared/svgs';
import router from 'next/router';
import { SidebarItems } from './constants';
import SidebarItem from './SidebarItem';

interface IProps {
   category: string;
   setCategory: (category: string) => void;
}

const Sidebar = ({ category, setCategory }: IProps) => {
   const handleLogout = () => {
      localStorage.removeItem('token');
      router.push('/login');
   };

   return (
      <div className='flex flex-col gap-2'>
         {SidebarItems.map((item) => (
            <SidebarItem
               key={item.name}
               item={item}
               isActive={category === item.value}
               setCategory={setCategory}
            />
         ))}
         <div className='flex size-[63px] flex-col items-center justify-center gap-1 rounded-[5px] bg-white500'>
            <div className='size-[20px] text-gray500'>
               <LogoutIcon />
            </div>
            <p className='text-[10px] font-semibold leading-[14px] text-gray500'>
               Logout
            </p>
         </div>
      </div>
   );
};

export default Sidebar;
