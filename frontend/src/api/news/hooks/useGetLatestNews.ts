import { useQuery } from '@tanstack/react-query';

import { newsApi } from '@api/news/requests';
import { NEWS_LATEST } from '@shared/queryKeys';
import { IArticleResponse } from '../types';

const useGetLatestNews = (page?: number, pageSize?: number) =>
   useQuery<IArticleResponse>({
      queryKey: [NEWS_LATEST, page, pageSize],
      queryFn: () => newsApi.client.getLatestNews(page, pageSize),
   });

export default useGetLatestNews;
