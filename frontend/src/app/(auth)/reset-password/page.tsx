import ResetPasswordPage from '@features/reset-password';
import { getMetadataTitle } from '@shared/utils';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

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
   return <ResetPasswordPage />;
};

export default ResetPassword;
