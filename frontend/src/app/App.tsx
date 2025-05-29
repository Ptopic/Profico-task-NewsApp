'use client';

import { ReactNode } from 'react';

interface IProps {
   children: ReactNode;
}

const App = ({ children }: IProps) => {
   return <>{children}</>;
};

export default App;
