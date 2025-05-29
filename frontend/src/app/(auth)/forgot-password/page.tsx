import ForgotPasswordPage from '@features/forgot-password';
import { getMetadataTitle } from '@shared/utils';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Forgot Password'),
      openGraph: {
         title: getMetadataTitle('Forgot Password'),
         url: `${parentOpengraphUrl}/forgot-password`,
         ...openGraphImage,
      },
   };
}

const ForgotPassword = () => {
   return <ForgotPasswordPage />;
};

export default ForgotPassword;
