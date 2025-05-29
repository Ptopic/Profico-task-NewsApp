import { ErrorIcon } from '@shared/svgs';
import { twMerge } from 'tailwind-merge';

interface IProps {
   error: string;
   className?: string;
}

const ErrorDisplay = ({ error, className }: IProps) => {
   return (
      <div className={twMerge('flex items-center gap-2', className)}>
         <ErrorIcon className='size-[14px] text-red500' />
         <span className='body-small-regular text-red500'>{error}</span>
      </div>
   );
};

export default ErrorDisplay;
