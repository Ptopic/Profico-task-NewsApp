import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@api/constants';
import { withAuthenticatedClientRequest } from '@api/requestBuilder/client/withClientRequest';
import { withAuthenticatedServerRequest } from '@api/requestBuilder/server/withServerRequest';
import { ICallableRequestBuilder } from '@api/requestBuilder/types';
import { IPaginationResponse } from '@interfaces/pagination';
import { config } from '@shared/config/config';
import queryString from 'query-string';
import {
   IAddArticleToFavouritesPayload,
   IFavouriteArticle,
   IRemoveArticleFromFavouritesPayload,
} from './types';

const getFavourites =
   (request: ICallableRequestBuilder<IPaginationResponse<IFavouriteArticle>>) =>
   async (
      search?: string,
      page: number = DEFAULT_PAGE,
      pageSize: number = DEFAULT_PAGE_SIZE
   ) => {
      const params = {
         page,
         pageSize,
         ...(search && { searchQuery: search }),
      };
      const url = queryString.stringifyUrl({
         url: `${config.apiUrl}/users/favourites`,
         query: params,
      });

      return request.call(url, (init) => ({
         ...init,
         method: 'GET',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
      }));
   };

const addFavourite =
   (request: ICallableRequestBuilder<IFavouriteArticle>) =>
   (data: IAddArticleToFavouritesPayload) =>
      request.call(`${config.apiUrl}/users/favourites`, (init) => ({
         ...init,
         method: 'POST',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      }));

const removeFavourite =
   (request: ICallableRequestBuilder<IFavouriteArticle>) =>
   (data: IRemoveArticleFromFavouritesPayload) =>
      request.call(`${config.apiUrl}/users/favourites`, (init) => ({
         ...init,
         method: 'DELETE',
         headers: {
            ...init.headers,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ url: data.url }),
      }));

export const userApi = {
   client: {
      getFavourites: withAuthenticatedClientRequest(getFavourites),
      addFavourite: withAuthenticatedClientRequest(addFavourite),
      removeFavourite: withAuthenticatedClientRequest(removeFavourite),
   },
   server: {
      getFavourites: withAuthenticatedServerRequest(getFavourites),
      addFavourite: withAuthenticatedServerRequest(addFavourite),
      removeFavourite: withAuthenticatedServerRequest(removeFavourite),
   },
};
