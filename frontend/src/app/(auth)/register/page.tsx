import RegisterPage from '@features/register';
import { getMetadataTitle } from '@shared/utils';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Register'),
      openGraph: {
         title: getMetadataTitle('Register'),
         url: `${parentOpengraphUrl}/register`,
         ...openGraphImage,
      },
   };
}

const Register = () => {
   return <RegisterPage />;
};

export default Register;
