import LoginPage from '@features/login';
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
      title: getMetadataTitle('Login'),
      openGraph: {
         title: getMetadataTitle('Login'),
         url: `${parentOpengraphUrl}/login`,
         ...openGraphImage,
      },
   };
}

const Login = () => {
   return (
      <Suspense>
         <LoginPage />
      </Suspense>
   );
};

export default Login;
