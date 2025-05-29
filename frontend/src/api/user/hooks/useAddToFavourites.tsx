import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { userApi } from '../requests';
import { IAddArticleToFavouritesPayload, IFavouriteArticle } from '../types';

const useAddToFavourites = (
   options?: UseMutationOptions<
      IFavouriteArticle,
      Error,
      IAddArticleToFavouritesPayload,
      unknown
   >
) => {
   return useMutation<
      IFavouriteArticle,
      Error,
      IAddArticleToFavouritesPayload,
      unknown
   >({
      mutationFn: (data: IAddArticleToFavouritesPayload) =>
         userApi.client.addFavourite(data),
      ...options,
   });
};

export default useAddToFavourites;
