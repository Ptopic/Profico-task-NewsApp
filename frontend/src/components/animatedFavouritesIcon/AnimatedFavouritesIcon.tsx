import { AnimatePresence, motion } from 'framer-motion';

interface IFavouritesIconProps {
   isFilled: boolean;
   className?: string;
}

const AnimatedFavouritesIcon = ({
   isFilled,
   className,
}: IFavouritesIconProps) => {
   return (
      <AnimatePresence mode='wait'>
         <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='100%'
            viewBox='0 0 24 24'
            className={className}
            initial={false}
            animate={{
               scale: isFilled ? [1, 1.2, 1] : 1,
            }}
            transition={{
               duration: 0.3,
            }}
         >
            <motion.path
               d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'
               stroke='currentColor'
               strokeWidth='2'
               strokeLinecap='round'
               strokeLinejoin='round'
               animate={{
                  fill: isFilled ? 'currentColor' : 'transparent',
                  scale: isFilled ? [1, 1.2, 1] : 1,
               }}
               initial={{
                  fill: 'transparent',
                  scale: 1,
               }}
               transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
               }}
            />
         </motion.svg>
      </AnimatePresence>
   );
};

export default AnimatedFavouritesIcon;
