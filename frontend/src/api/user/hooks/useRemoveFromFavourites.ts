import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { userApi } from '../requests';
import {
   IFavouriteArticle,
   IRemoveArticleFromFavouritesPayload,
} from '../types';

const useLogin = (
   options?: UseMutationOptions<
      IFavouriteArticle,
      Error,
      IRemoveArticleFromFavouritesPayload,
      unknown
   >
) => {
   return useMutation<
      IFavouriteArticle,
      Error,
      IRemoveArticleFromFavouritesPayload,
      unknown
   >({
      mutationFn: (data: IRemoveArticleFromFavouritesPayload) =>
         userApi.client.removeFavourite(data),
      ...options,
   });
};

export default useLogin;
