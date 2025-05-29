import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@api/constants';
import { withAuthenticatedClientRequest } from '@api/requestBuilder/client/withClientRequest';
import { withAuthenticatedServerRequest } from '@api/requestBuilder/server/withServerRequest';
import { ICallableRequestBuilder } from '@api/requestBuilder/types';
import { config } from '@shared/config/config';
import queryString from 'query-string';
import { IArticleResponse } from './types';

const getTopHeadlinesNews =
   (request: ICallableRequestBuilder<IArticleResponse>) =>
   async (
      search?: string,
      category?: string,
      page: number = DEFAULT_PAGE,
      pageSize: number = DEFAULT_PAGE_SIZE
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
   async (
      page: number = DEFAULT_PAGE,
      pageSize: number = DEFAULT_PAGE_SIZE
   ) => {
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));
      const yesterdayDate = yesterday.toISOString().split('T')[0];

      const params = {
         sortBy: 'publishedAt',
         page,
         pageSize,
         apiKey: config.newsApiKey,
         from: yesterdayDate,
         to: yesterdayDate,
         sources: 'abc-news,buzzfeed,cbc-news,google-news',
      };
      const url = queryString.stringifyUrl({
         url: `https://newsapi.org/v2/everything`,
         query: params,
      });

      return request.call(url);
   };

export const newsApi = {
   client: {
      getTopHeadlinesNews: withAuthenticatedClientRequest(getTopHeadlinesNews),
      getLatestNews: withAuthenticatedClientRequest(getLatestNews),
   },
   server: {
      getTopHeadlinesNews: withAuthenticatedServerRequest(getTopHeadlinesNews),
      getLatestNews: withAuthenticatedServerRequest(getLatestNews),
   },
};
