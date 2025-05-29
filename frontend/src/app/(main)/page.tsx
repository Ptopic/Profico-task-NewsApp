import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@api/constants';
import { newsApi } from '@api/news/requests';
import HomePage from '@features/home';
import { getSSRQueryClient } from '@shared/queryClient';
import { NEWS_LATEST, NEWS_TOP_HEADLINES } from '@shared/queryKeys';
import { getMetadataTitle } from '@shared/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Home'),
      openGraph: {
         title: getMetadataTitle('Home'),
         url: `${parentOpengraphUrl}/`,
         ...openGraphImage,
      },
   };
}

const Home = async () => {
   const queryClient = getSSRQueryClient();

   await Promise.all([
      queryClient.prefetchQuery({
         queryKey: [NEWS_TOP_HEADLINES, '', '', DEFAULT_PAGE_SIZE],
         queryFn: () => newsApi.client.getTopHeadlinesNews(),
      }),
      queryClient.prefetchQuery({
         queryKey: [NEWS_LATEST, DEFAULT_PAGE, DEFAULT_PAGE_SIZE],
         queryFn: () => newsApi.client.getLatestNews(),
      }),
   ]);

   const dehydratedState = dehydrate(queryClient);
   return (
      <HydrationBoundary state={dehydratedState}>
         <Suspense>
            <HomePage />
         </Suspense>
      </HydrationBoundary>
   );
};

export default Home;
