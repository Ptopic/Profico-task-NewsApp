import VerificationPage from '@features/verification';
import { getMetadataTitle } from '@shared/utils';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Verification'),
      openGraph: {
         title: getMetadataTitle('Verification'),
         url: `${parentOpengraphUrl}/verification`,
         ...openGraphImage,
      },
   };
}

const Verification = () => {
   return <VerificationPage />;
};

export default Verification;
