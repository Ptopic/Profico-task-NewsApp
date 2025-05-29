// src/components/animation/AnimatedGridItem.tsx
import { motion, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
   children: ReactNode;
   index: number;
   totalItems: number;
}

const AnimatedGridItem = ({ children, index, totalItems }: Props) => {
   const NEWS_PAGE_SIZE = 50;

   const ref = useRef(null);
   const isInView = useInView(ref, {
      margin: '0px 0px -100px 0px',
   });

   const [hasAnimated, setHasAnimated] = useState(false);

   const isNewItem = index >= totalItems - NEWS_PAGE_SIZE;

   useEffect(() => {
      if (isInView && !hasAnimated) {
         setHasAnimated(true);
      }
   }, [isInView, hasAnimated]);

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 20 }}
         animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
         transition={{
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: isNewItem ? 0.1 : 0,
         }}
         className='h-full w-full'
      >
         {children}
      </motion.div>
   );
};

export default AnimatedGridItem;
