import NextTopLoader from 'nextjs-toploader';

import { twMerge } from 'tailwind-merge';

import ScrollToTop from '@components/ScrollToTop';

import metadataConfig from '../metadata';
import App from './App';
import { inter } from './fonts';
import './globals.css';
import Providers from '@shared/providers';

export const metadata = metadataConfig;

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
   title: string;
   data: number;
}>) {
   return (
      <html lang='en'>
         <body
            id='app'
            className={twMerge(
               inter.variable,
               'overscroll-none bg-white600 font-sans'
            )}
         >
            <App>
               <NextTopLoader color='#BB1E1E' showSpinner={false} />
               <ScrollToTop />
               <Providers>{children}</Providers>
            </App>
         </body>
      </html>
   );
}
