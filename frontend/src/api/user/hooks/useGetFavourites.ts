import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@api/constants';
import { FAVOURITES } from '@shared/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { userApi } from '../requests';

const useGetFavourites = (
   search?: string,
   pageSize: number = DEFAULT_PAGE_SIZE
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
      queryKey: [FAVOURITES, search, pageSize],
      queryFn: async ({ pageParam = DEFAULT_PAGE }) => {
         const response = await userApi.client.getFavourites(
            search,
            pageParam,
            pageSize
         );

         const lastPage = Math.ceil(response.totalCount / Number(pageSize));

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

   const favourites =
      data?.pages
         .flatMap((page) => page.data || [])
         .filter((item) => item != null) || [];

   return {
      favourites,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
      refetch,
   };
};

export default useGetFavourites;
