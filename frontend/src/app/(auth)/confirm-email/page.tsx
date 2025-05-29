import ConfirmEmailPage from '@features/confirm-email';
import { getMetadataTitle } from '@shared/utils';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Confirm Email'),
      openGraph: {
         title: getMetadataTitle('Confirm Email'),
         url: `${parentOpengraphUrl}/confirm-email`,
         ...openGraphImage,
      },
   };
}

const ConfirmEmail = () => {
   return (
      <Suspense>
         <ConfirmEmailPage />
      </Suspense>
   );
};

export default ConfirmEmail;
