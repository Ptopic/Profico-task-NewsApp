import { FAVOURITES } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../requests';
import { IFavouriteArticle } from '../types';

const useGetFavourites = (search?: string) =>
   useQuery<IFavouriteArticle[]>({
      queryKey: [FAVOURITES, search],
      queryFn: () => userApi.client.getFavourites(search),
   });

export default useGetFavourites;
