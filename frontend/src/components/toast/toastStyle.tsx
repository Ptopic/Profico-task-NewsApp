import { ErrorIcon, SuccessIcon } from '@shared/svgs';

export enum TOAST_VARIANT {
   SUCCESS = 'success',
   ERROR = 'error',
}

export const TOAST_VARIANT_STYLE = {
   [TOAST_VARIANT.SUCCESS]: {
      icon: <SuccessIcon className='size-6 flex-shrink-0 text-white500' />,
      className: 'bg-green500 text-white500 toast-success-shadow',
      titleText: 'text-white500',
   },
   [TOAST_VARIANT.ERROR]: {
      icon: <ErrorIcon className='size-6 flex-shrink-0 text-white500' />,
      className: 'bg-red500 text-white500',
      titleText: 'text-white500',
   },
};
