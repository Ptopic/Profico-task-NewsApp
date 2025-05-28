import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

interface IProps {
  children: React.ReactNode;
  show?: boolean;
}

const TransitionComponent = ({ children, show = true }: IProps) => {
  return (
    <div className='flex w-full justify-center transition-all'>
      <Transition
        as={Fragment}
        show={show}
        enter='transition ease-out duration-400'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-400'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        {children}
      </Transition>
    </div>
  );
};

export default TransitionComponent;
