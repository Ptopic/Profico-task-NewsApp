import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@api/constants';
import { NEWS_TOP_HEADLINES } from '@shared/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { newsApi } from '../requests';
import { useEffect } from 'react';

const useGetTopHeadlinesNews = (
   search?: string,
   category?: string,
   pageSize: number = DEFAULT_PAGE_SIZE,
   options?: { onError: (error: Error) => void }
) => {
   const {
      data,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
      refetch,
   } = useInfiniteQuery({
      queryKey: [NEWS_TOP_HEADLINES, search, category, pageSize],
      queryFn: async ({ pageParam = DEFAULT_PAGE }) => {
         const response = await newsApi.client.getTopHeadlinesNews(
            search,
            category,
            pageParam,
            pageSize
         );

         const lastPage = Math.ceil(response.totalResults / Number(pageSize));

         return {
            ...response,
            current_page: Number(pageParam),
            per_page: Number(pageSize),
            last_page: lastPage,
         };
      },
      getNextPageParam: (nextPageRequest) => {
         if (nextPageRequest.current_page < nextPageRequest.last_page) {
            return nextPageRequest.current_page + 1;
         }
         return undefined;
      },
      initialPageParam: DEFAULT_PAGE,
   });

   useEffect(() => {
      if (error && options?.onError) {
         options.onError(error);
      }
   }, [error, options?.onError]);

   const articles =
      data?.pages
         .flatMap((page) => page.articles || [])
         .filter((item) => item != null) || [];

   return {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
      refetch,
   };
};

export default useGetTopHeadlinesNews;
