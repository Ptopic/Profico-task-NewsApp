'use client';

import useGetLatestNews from '@api/news/hooks/useGetLatestNews';
import LoadingWrapper from '@components/loadingWrapper';
import Modal from '@components/modal';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants';
import { ChevronRightIcon } from '@shared/svgs';
import { toastError } from '@shared/utils/toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import LatestNewsDivider from './LatestNewsDivider';
import LatestNewsItem from './LatestNewsItem';

const LatestNews = () => {
   const LATEST_NEWS_PAGE_SIZE = 20;

   const [isAllLatestNewsModalOpen, setIsAllLatestNewsModalOpen] =
      useState<boolean>(false);

   const {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
   } = useGetLatestNews(LATEST_NEWS_PAGE_SIZE);

   const handleEndReached = useCallback(() => {
      // Error is here because news api has limit of 100 articles on developer account so we cant fetch articles from 100 and more
      if (hasNextPage && !isFetchingNextPage && !error) {
         fetchNextPage();
      }
   }, [hasNextPage, isFetchingNextPage, fetchNextPage, error]);

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
                  {articles.map((article, idx) => (
                     <div className='flex flex-col gap-2' key={article.url}>
                        <LatestNewsItem article={article} />
                        {idx !== articles.length - 1 && <LatestNewsDivider />}
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
         <button
            className='flex flex-row items-center gap-1'
            onClick={() => setIsAllLatestNewsModalOpen(true)}
         >
            <p className='text-sm leading-5 text-blue500'>See all news</p>
            <ChevronRightIcon className='size-3 text-black600' />
         </button>

         <Modal
            isOpen={isAllLatestNewsModalOpen}
            setIsOpen={setIsAllLatestNewsModalOpen}
            modalTitle='All latest news'
            className='full w-full overflow-visible'
         >
            <div
               className='newsScrollbar flex flex-grow-0 flex-col gap-2 overflow-y-scroll'
               onScroll={(e) => {
                  const target = e.target as HTMLElement;
                  const scrollPosition = target.scrollTop + target.clientHeight;
                  const scrollHeight = target.scrollHeight;

                  if (scrollPosition >= scrollHeight) {
                     handleEndReached();
                  }
               }}
               ref={latestNewsGridRef}
            >
               {articles.map((article, idx) => (
                  <div className='flex flex-col gap-2' key={article.url}>
                     <LatestNewsItem article={article} />
                     {idx !== articles.length - 1 && <LatestNewsDivider />}
                  </div>
               ))}
               {isFetchingNextPage && (
                  <div className='col-span-full flex w-full justify-center py-4'>
                     <PulsatingDotsSpinner colorClassName='bg-red500' />
                  </div>
               )}
            </div>
         </Modal>
      </div>
   );
};

export default LatestNews;
