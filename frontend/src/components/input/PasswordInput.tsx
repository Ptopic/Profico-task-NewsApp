'use client';
import ErrorDisplay from '@components/errorDisplay';
import { EyeOffIcon, EyeOnIcon } from '@shared/svgs';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { handleTabNavigation } from './helpers';
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   register?: Partial<UseFormRegisterReturn>;
   error?: string;
   inputClassName?: string;
   topRightElement?: React.ReactNode;
}

const PasswordInput = ({
   name,
   label,
   register,
   error,
   inputClassName,
   topRightElement,
   ...props
}: IInputProps) => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isFocused, setIsFocused] = useState(false);

   const handleFocus = () => setIsFocused(true);
   const handleBlur = () => setIsFocused(false);

   return (
      <div className='flex w-full flex-col gap-2'>
         {label && (
            <div className='flex items-center justify-between'>
               <label htmlFor={name} className='leading-5 text-black600'>
                  {label} <span className='text-red500'>*</span>
               </label>
               {topRightElement}
            </div>
         )}

         <div
            className={twMerge(
               'relative flex h-fit flex-col rounded-lg border-[1px] border-gray-300 bg-white500 p-[10px] leading-5 text-black600 outline-none focus-within:border-black600 hover:border-gray-400 hover:focus-within:border-black600',
               error &&
                  'border-red500 focus-within:border-red500 hover:border-red500 hover:focus-within:border-red500',
               props.disabled && 'opacity-50'
            )}
         >
            <div className='flex w-[90%] items-center justify-between'>
               <input
                  {...register}
                  {...props}
                  id={name}
                  type={isPasswordVisible ? 'text' : 'password'}
                  aria-invalid={!!error}
                  className={twMerge(
                     'w-full outline-none placeholder:text-gray-400 active:border-black600 disabled:cursor-not-allowed',
                     inputClassName
                  )}
                  placeholder={label || props.placeholder}
                  aria-autocomplete='none'
                  autoComplete='off'
                  onKeyDown={handleTabNavigation}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
               />
            </div>
            <div>
               <button
                  type='button'
                  className='absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer'
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label={
                     isPasswordVisible ? 'Hide password' : 'Show password'
                  }
               >
                  {isPasswordVisible ? (
                     <EyeOnIcon
                        className={twMerge(
                           'flex size-[16px] items-center justify-center',
                           isFocused ? 'text-black600' : 'text-gray-400'
                        )}
                     />
                  ) : (
                     <EyeOffIcon
                        className={twMerge(
                           'flex size-[16px] items-center justify-center',
                           isFocused ? 'text-black600' : 'text-gray-400'
                        )}
                     />
                  )}
               </button>
            </div>
         </div>
         {error && <ErrorDisplay error={error} />}
      </div>
   );
};

export default PasswordInput;
