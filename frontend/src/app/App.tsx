'use client';

import Providers from '@shared/providers';
import { ReactNode } from 'react';

interface IProps {
   children: ReactNode;
}

const App = ({ children }: IProps) => {
   return <Providers>{children}</Providers>;
};

export default App;
