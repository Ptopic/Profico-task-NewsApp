import { LogoutIcon } from '@shared/svgs';
import { removeAuthTokens } from '@shared/utils';
import { useRouter } from 'next/navigation';
import { SidebarItems } from './constants';
import SidebarItem from './SidebarItem';

interface IProps {
   category: string;
   setCategory: (category: string) => void;
}

const Sidebar = ({ category, setCategory }: IProps) => {
   const router = useRouter();

   const handleLogout = async () => {
      await removeAuthTokens();
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
         <button
            className='flex size-[63px] flex-col items-center justify-center gap-1 rounded-[5px] bg-white500'
            onClick={handleLogout}
         >
            <div className='size-[20px] text-gray500'>
               <LogoutIcon />
            </div>
            <p className='text-[10px] font-semibold leading-[14px] text-gray500'>
               Logout
            </p>
         </button>
      </div>
   );
};

export default Sidebar;
