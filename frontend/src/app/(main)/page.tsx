import HomePage from '@features/home/Home';
import { COOKIE_NAME } from '@shared/constants';
import { getSSRQueryClient } from '@shared/queryClient';
import { getCookie, getMetadataTitle } from '@shared/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
   {},
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpengraphUrl = (await parent).openGraph?.url;

   return {
      title: getMetadataTitle('Home'),
      openGraph: {
         title: getMetadataTitle('Home'),
         url: `${parentOpengraphUrl}/home`,
         ...openGraphImage,
      },
   };
}

const Home = async () => {
   const queryClient = getSSRQueryClient();

   // await Promise.all([
   //   queryClient.prefetchQuery({
   //     queryKey: instancesQueryKey,
   //     queryFn: () =>
   //       instancesServerRequests.getInstances({
   //         page,
   //         pageSize,
   //         search,
   //         gpu,
   //         region,
   //         sortField: sortField,
   //         sortDirection: sortDirection,
   //       }),
   //   }),
   //   queryClient.prefetchQuery({
   //     queryKey: [GPU_NAMES],
   //     queryFn: () => instancesServerRequests.getMachinesGpuName(),
   //   }),
   //   queryClient.prefetchQuery({
   //     queryKey: [CURRENT_USER],
   //     queryFn: () => authServerRequests.authCurrentUser(),
   //   }),
   // ]);

   const dehydratedState = dehydrate(queryClient);

   const cookie = await getCookie(COOKIE_NAME.ACCESS_TOKEN);
   console.log(cookie);
   return (
      <HydrationBoundary state={dehydratedState}>
         <HomePage />
      </HydrationBoundary>
   );
};

export default Home;
