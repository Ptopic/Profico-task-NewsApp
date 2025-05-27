import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface IProps {
   colorClassName?: string;
}

export default function PulsatingDotsSpinner({ colorClassName }: IProps) {
   return (
      <div className='flex items-center justify-center'>
         <div className='flex space-x-2'>
            <motion.div
               className={twMerge('h-3 w-3 rounded-full', colorClassName)}
               animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
               }}
            />
            <motion.div
               className={twMerge('h-3 w-3 rounded-full', colorClassName)}
               animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: 0.3,
               }}
            />
            <motion.div
               className={twMerge('h-3 w-3 rounded-full', colorClassName)}
               animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: 0.6,
               }}
            />
         </div>
      </div>
   );
}
