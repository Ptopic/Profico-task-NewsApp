import { toast } from 'react-toastify';

import { twMerge } from 'tailwind-merge';

import { CloseIcon } from '@shared/svgs';

import { TOAST_VARIANT, TOAST_VARIANT_STYLE } from './toastStyle';

interface IProps {
   title: string | JSX.Element;
   variant?: TOAST_VARIANT;
   description?: string | JSX.Element;
   disabledClose?: boolean;
   Icon?: JSX.Element;
}

const Toast = ({
   variant = TOAST_VARIANT.SUCCESS,
   title,
   description,
   disabledClose,
   Icon,
}: IProps) => {
   const dismiss = () => toast.dismiss();

   return (
      <div
         className={twMerge(
            'flex w-full items-start justify-between rounded-xl p-4 md:w-[640px]',
            TOAST_VARIANT_STYLE[variant].className
         )}
      >
         <div className='flex gap-2'>
            {Icon || TOAST_VARIANT_STYLE[variant].icon}
            <div className='flex flex-col gap-1'>
               <p
                  className={twMerge(
                     'font-bold',
                     TOAST_VARIANT_STYLE[variant].titleText
                  )}
               >
                  {title}
               </p>
               {description && <p>{description}</p>}
            </div>
         </div>
         {!disabledClose ? (
            <button onClick={() => dismiss()} aria-label='Close notification'>
               <CloseIcon className='size-6 text-white500' />
            </button>
         ) : null}
      </div>
   );
};

export default Toast;
