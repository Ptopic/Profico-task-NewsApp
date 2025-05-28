import useGetLatestNews from '@api/news/hooks/useGetLatestNews';
import LoadingWrapper from '@components/loadingWrapper';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { useCallback, useEffect, useRef } from 'react';
import LatestNewsDivider from './LatestNewsDivider';
import LatestNewsItem from './LatestNewsItem';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants';
import { toastError } from '@shared/utils/toast';

const LatestNews = () => {
   const LATEST_NEWS_PAGE_SIZE = 40;

   const {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
   } = useGetLatestNews(LATEST_NEWS_PAGE_SIZE);

   const handleEndReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
         fetchNextPage();
      }
   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

   useEffect(() => {
      if (error) {
         toastError({
            title: DEFAULT_ERROR_MESSAGE,
            description: error.message,
         });
      }
   }, [error]);

   const latestNewsGridRef = useRef<HTMLDivElement>(null);

   return (
      <div
         className='flex max-h-[528px] flex-col gap-3 rounded-lg bg-white500 p-3'
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         <div className='flex flex-row items-center gap-2'>
            <div className='flex size-[20px] items-center justify-center rounded-full bg-red500/25'>
               <div className='size-[10px] rounded-full bg-red500'></div>
            </div>
            <p className='font-medium leading-5'>Latest news</p>
         </div>
         {!isLoading && articles.length === 0 ? (
            <div className='flex h-full w-full items-center justify-center'>
               <p className='text-[28px] font-black leading-[21px] text-black500'>
                  No news found
               </p>
            </div>
         ) : (
            <LoadingWrapper isLoading={isLoading}>
               <div
                  className='newsScrollbar flex flex-grow-0 flex-col gap-2 overflow-y-scroll'
                  onScroll={(e) => {
                     const target = e.target as HTMLElement;
                     const scrollPosition =
                        target.scrollTop + target.clientHeight;
                     const scrollHeight = target.scrollHeight;

                     if (scrollPosition >= scrollHeight) {
                        handleEndReached();
                     }
                  }}
                  ref={latestNewsGridRef}
               >
                  {articles.map((article) => (
                     <div className='flex flex-col gap-2' key={article.url}>
                        <LatestNewsItem article={article} />
                        <LatestNewsDivider />
                     </div>
                  ))}
                  {isFetchingNextPage && (
                     <div className='col-span-full flex w-full justify-center py-4'>
                        <PulsatingDotsSpinner colorClassName='bg-red500' />
                     </div>
                  )}
               </div>
            </LoadingWrapper>
         )}
      </div>
   );
};

export default LatestNews;
