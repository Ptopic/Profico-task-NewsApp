import ErrorDisplay from '@components/errorDisplay';
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { handleTabNavigation } from './helpers';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   register?: Partial<UseFormRegisterReturn>;
   error?: string;
   type?: HTMLInputTypeAttribute;
   inputClassName?: string;
   placeholder?: string;
   containerClassName?: string;
}

const Input = ({
   name,
   label,
   register,
   error,
   type = 'text',
   inputClassName,
   placeholder,
   containerClassName,
   ...props
}: IInputProps) => {
   return (
      <div
         className={twMerge('flex w-full flex-col gap-2', containerClassName)}
      >
         {label && (
            <label htmlFor={name} className='leading-5 text-black600'>
               {label} <span className='text-red500'>*</span>
            </label>
         )}

         <input
            id={name}
            type={type}
            {...register}
            {...props}
            aria-invalid={!!error}
            className={twMerge(
               'relative flex h-fit flex-col rounded-lg border-[1px] border-gray-300 bg-white500 p-[10px] leading-5 text-black600 outline-none placeholder:text-gray-400 focus-within:border-black600 hover:border-gray-400 hover:focus-within:border-black600',
               error &&
                  'border-red500 focus-within:border-red500 hover:border-red500 hover:focus-within:border-red500',
               props.disabled && 'opacity-50',
               inputClassName
            )}
            placeholder={placeholder ? placeholder : label}
            aria-autocomplete='none'
            autoComplete='off'
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={handleTabNavigation}
         />
         {error && <ErrorDisplay error={error} />}
      </div>
   );
};

export default Input;
