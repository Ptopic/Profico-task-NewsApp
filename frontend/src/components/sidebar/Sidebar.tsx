import { LogoutIcon } from '@shared/svgs';
import { removeAuthTokens } from '@shared/utils';
import { AnimatePresence, motion } from 'framer-motion';
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
         <AnimatePresence>
            {SidebarItems.map((item, index) => (
               <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.25, delay: 0.1 * index }}
               >
                  <SidebarItem
                     key={item.name}
                     item={item}
                     isActive={category === item.value}
                     setCategory={setCategory}
                  />
               </motion.div>
            ))}
         </AnimatePresence>
         <motion.button
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.25, delay: 0.1 * SidebarItems.length }}
            className='flex size-[63px] flex-col items-center justify-center gap-1 rounded-[5px] bg-white500'
            onClick={handleLogout}
         >
            <div className='size-[20px] text-gray500'>
               <LogoutIcon />
            </div>
            <p className='text-[10px] font-semibold leading-[14px] text-gray500'>
               Logout
            </p>
         </motion.button>
      </div>
   );
};

export default Sidebar;
