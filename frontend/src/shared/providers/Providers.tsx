'use client';

import ToastContainerSetup from '@components/toast';
import { queryClientDefaultOptions } from '@shared/queryClient';
import {
   HydrationBoundary,
   QueryClient,
   QueryClientProvider,
   dehydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

interface IProps {
   children: ReactNode;
}

const Providers = ({ children }: IProps) => {
   const [client] = useState(
      () => new QueryClient({ ...queryClientDefaultOptions })
   );

   const dehydratedState = dehydrate(client, {
      shouldDehydrateQuery: () => true,
   });

   return (
      <QueryClientProvider client={client}>
         <HydrationBoundary state={dehydratedState}>
            {children}
         </HydrationBoundary>
         <ReactQueryDevtools />
         <ToastContainerSetup />
      </QueryClientProvider>
   );
};

export default Providers;
