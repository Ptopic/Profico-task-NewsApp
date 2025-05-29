import ResetPasswordPage from '@features/reset-password';
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
      title: getMetadataTitle('Reset Password'),
      openGraph: {
         title: getMetadataTitle('Reset Password'),
         url: `${parentOpengraphUrl}/reset-password`,
         ...openGraphImage,
      },
   };
}

const ResetPassword = () => {
   return (
      <Suspense>
         <ResetPasswordPage />
      </Suspense>
   );
};

export default ResetPassword;
