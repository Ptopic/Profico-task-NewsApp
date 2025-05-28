'use client';

import TransitionComponent from '@components/transition/Transition';
import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon } from '@shared/svgs';
import { Fragment, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
   isOpen: boolean;
   modalTitle?: string;
   modalDescription?: string;
   setIsOpen?: (value: boolean) => void;
   onClose?: () => void;
   children: React.ReactNode;
   disableClose?: boolean;
   titleStyles?: string;
   className?: string;
   dialogClassName?: string;
   contentClassName?: string;
   headerContainerClassName?: string;
   hasSubtitle?: boolean;
   modalBgClassName?: string;
}

const Modal = ({
   isOpen,
   setIsOpen,
   onClose,
   modalTitle,
   modalDescription,
   children,
   disableClose,
   titleStyles,
   className,
   dialogClassName,
   contentClassName,
   headerContainerClassName,
   hasSubtitle,
   modalBgClassName,
}: IProps) => {
   const cancelButtonRef = useRef(null);

   return (
      <Transition.Root show={isOpen} as={Fragment} data-testid='modal'>
         <Dialog
            as='div'
            className={twMerge('relative z-50', dialogClassName)}
            initialFocus={cancelButtonRef}
            onClose={() => {
               if (onClose) {
                  onClose();
               }
               return setIsOpen && !disableClose && setIsOpen(false);
            }}
         >
            <TransitionComponent>
               <div
                  className={twMerge(
                     'bg-overlay fixed inset-0 bg-opacity-80 transition-opacity',
                     modalBgClassName
                  )}
               />
            </TransitionComponent>
            <div className='fixed inset-0 z-10 overflow-y-auto'>
               <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
                  <TransitionComponent>
                     <Dialog.Panel
                        className={twMerge(
                           'relative flex h-full max-h-[90vh] w-full max-w-[592px] transform flex-col overflow-hidden rounded-md bg-white500 text-left shadow-xl transition-all',
                           className
                        )}
                     >
                        {modalTitle || !disableClose ? (
                           <div
                              className={twMerge(
                                 'flex w-full items-center justify-between border-b border-gray500/20 p-4',
                                 headerContainerClassName
                              )}
                           >
                              <div
                                 className={twMerge(
                                    'flex w-full flex-col gap-1',
                                    !modalTitle &&
                                       !modalDescription &&
                                       'hidden',
                                    titleStyles
                                 )}
                              >
                                 {modalTitle && (
                                    <h1 className='text-[20px] font-bold leading-6 text-black500'>
                                       {modalTitle}
                                    </h1>
                                 )}
                                 {modalDescription && (
                                    <p className='text-[12px] leading-none text-gray500'>
                                       {modalDescription}
                                    </p>
                                 )}
                              </div>
                              <div
                                 ref={cancelButtonRef}
                                 className={twMerge(
                                    'flex w-fit cursor-pointer items-start justify-end self-start',
                                    !modalTitle &&
                                       !modalDescription &&
                                       !hasSubtitle &&
                                       'w-full',
                                    disableClose && 'hidden'
                                 )}
                                 onClick={() => {
                                    if (disableClose) return;
                                    if (onClose) onClose();
                                    if (setIsOpen) setIsOpen(false);
                                 }}
                              >
                                 <div className='relative z-20'>
                                    <CloseIcon
                                       aria-hidden='true size-4'
                                       className='text-gray600 size-4'
                                    />
                                 </div>
                              </div>
                           </div>
                        ) : null}
                        <div
                           className={twMerge(
                              'newsScrollbar flex h-full w-full flex-grow overflow-y-auto rounded-bl-md rounded-br-md bg-white500 p-4',
                              contentClassName
                           )}
                        >
                           {children}
                        </div>
                     </Dialog.Panel>
                  </TransitionComponent>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

export default Modal;
