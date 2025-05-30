import NextTopLoader from 'nextjs-toploader';

import { twMerge } from 'tailwind-merge';

import ScrollToTop from '@components/ScrollToTop';

import Providers from '@shared/providers';
import metadataConfig from '../metadata';
import App from './App';
import { inter } from './fonts';
import './globals.css';
import { Viewport } from 'next';
import { headers } from 'next/headers';

export const metadata = metadataConfig;

export async function generateViewport(): Promise<Viewport> {
   const userAgent = headers().get('user-agent');
   const isIOS = /iPad|iPhone|iPod/i.test(userAgent ?? '');
   return isIOS
      ? {
           width: 'device-width',
           initialScale: 1,
           maximumScale: 1,
        }
      : {};
}

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
