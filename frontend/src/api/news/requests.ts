import { withClientRequest } from '@api/requestBuilder/client/withClientRequest';
import { withServerRequest } from '@api/requestBuilder/server/withServerRequest';
import { ICallableRequestBuilder } from '@api/requestBuilder/types';
import { config } from '@shared/config/config';
import queryString from 'query-string';
import { IArticleResponse } from './types';

const getTopHeadlinesNews =
   (request: ICallableRequestBuilder<IArticleResponse>) =>
   async (
      search?: string,
      category?: string,
      page?: number,
      pageSize?: number
   ) => {
      const params = {
         sortBy: 'publishedAt',
         page,
         pageSize,
         apiKey: config.newsApiKey,
         category: category || 'general',
         ...(search && { q: search }),
      };
      const url = queryString.stringifyUrl({
         url: `https://newsapi.org/v2/top-headlines`,
         query: params,
      });

      return request.call(url);
   };

const getLatestNews =
   (request: ICallableRequestBuilder<IArticleResponse>) =>
   async (page?: number, pageSize?: number) => {
      const params = {
         sortBy: 'publishedAt',
         page,
         pageSize,
         apiKey: config.newsApiKey,
      };
      const url = queryString.stringifyUrl({
         url: `https://newsapi.org/v2/everything`,
         query: params,
      });

      return request.call(url);
   };

export const newsApi = {
   client: {
      // TODO: Change to withAuthenticatedClientRequest
      getTopHeadlinesNews: withClientRequest(getTopHeadlinesNews),
      getLatestNews: withClientRequest(getLatestNews),
   },
   server: {
      // TODO: Change to withAuthenticatedServerRequest
      getTopHeadlinesNews: withServerRequest(getTopHeadlinesNews),
      getLatestNews: withServerRequest(getLatestNews),
   },
};
