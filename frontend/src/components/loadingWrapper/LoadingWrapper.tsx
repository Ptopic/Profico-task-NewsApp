import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { twMerge } from 'tailwind-merge';

interface IProps {
   isLoading: boolean;
   children: React.ReactNode;
   className?: string;
}

const LoadingWrapper = ({ isLoading, children, className }: IProps) => {
   if (isLoading) {
      return (
         <div
            className={twMerge(
               'flex h-full w-full items-center justify-center',
               className
            )}
         >
            <PulsatingDotsSpinner colorClassName='bg-red500' />
         </div>
      );
   }
   return children;
};

export default LoadingWrapper;
