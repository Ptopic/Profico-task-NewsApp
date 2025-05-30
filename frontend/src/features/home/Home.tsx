'use client';

import useGetTopHeadlinesNews from '@api/news/hooks/useGetTopHeadlinesNews';
import useGetFavourites from '@api/user/hooks/useGetFavourites';
import { IFavouriteArticle } from '@api/user/types';
import {
   HomeArticlesGrid,
   RegularArticlesGrid,
} from '@components/articlesGrid';
import LatestNews from '@components/latestNews';
import LoadingWrapper from '@components/loadingWrapper';
import Navbar from '@components/navbar';
import Search from '@components/search';
import MobileSearch from '@components/search/MobileSearch';
import Sidebar from '@components/sidebar';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants';
import usePaginationParams from '@shared/hooks/usePaginationParams';
import { toastError } from '@shared/utils/toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const HomePage = () => {
   const router = useRouter();

   const NEWS_PAGE_SIZE = 50;

   const { searchValue } = usePaginationParams();

   const [mobileSearchTerm, setMobileSearchTerm] = useState<string>(
      decodeURIComponent(searchValue || '')
   );
   const [searchTerm, setSearchTerm] = useState<string>(
      decodeURIComponent(searchValue || '')
   );

   const [category, setCategory] = useState<string>('');

   const [selectedTab, setSelectedTab] = useState<string>('Featured');

   const {
      data: favourites,
      isLoading: isLoadingFavourites,
      isFetching: isFetchingFavourites,
      refetch: refetchFavourites,
   } = useGetFavourites(searchValue);

   const [favouriteArticles, setFavouriteArticles] = useState<
      IFavouriteArticle[]
   >([]);

   useEffect(() => {
      if (!isLoadingFavourites && !isFetchingFavourites) {
         setFavouriteArticles(favourites || []);
      }
   }, [isLoadingFavourites, isFetchingFavourites, favourites]);

   useEffect(() => {
      refetchFavourites();
   }, [searchValue]);

   const {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      refetch,
   } = useGetTopHeadlinesNews(searchValue, category, NEWS_PAGE_SIZE, {
      onError: (error) => {
         toastError({
            title: DEFAULT_ERROR_MESSAGE,
            description: error.message,
         });
      },
   });

   const handleEndReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
         fetchNextPage();
      }
   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

   useEffect(() => {
      const handleScroll = () => {
         if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
         ) {
            handleEndReached();
         }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [handleEndReached]);

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [category]);

   useEffect(() => {
      let resizeTimeout: NodeJS.Timeout | null = null;

      const handleRefetch = () => {
         if (resizeTimeout) clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
            router.push(
               window.innerWidth > 1150
                  ? `?search=${searchTerm}`
                  : `?search=${mobileSearchTerm}`
            );
            window.innerWidth > 1150 && setSelectedTab('Featured');
            refetch();
            refetchFavourites();
         }, 400);
      };

      window.addEventListener('resize', handleRefetch);
      return () => {
         window.removeEventListener('resize', handleRefetch);
         if (resizeTimeout) clearTimeout(resizeTimeout);
      };
   }, [refetch, mobileSearchTerm, searchTerm]);

   return (
      <div className='h-full w-full'>
         <nav className='news-gradient fixed left-0 top-0 z-30 hidden h-[60px] w-full items-center justify-between lg:flex lg:px-[11dvw]'>
            <div className='flex flex-row items-center gap-10'>
               <p className='font-bold leading-[21px] text-white500'>
                  Make MyNews your homepage
               </p>
               <p className='text-sm font-light leading-[21px] text-white500'>
                  Every day discover what's trending on the internet!
               </p>
            </div>
            <div className='flex flex-row items-center gap-6'>
               <button className='text-sm font-bold leading-5 text-white500'>
                  No, thanks
               </button>
               <button className='h-[40px] w-[60px] rounded-lg bg-white500 text-sm font-bold leading-5 text-black600'>
                  Get
               </button>
            </div>
         </nav>
         <div className='mt-[72px] flex h-full w-full flex-col items-center gap-6 px-4 lg:mt-[90px] lg:px-[11dvw]'>
            <Navbar
               category={category}
               setCategory={setCategory}
               searchTerm={mobileSearchTerm}
               setSearchTerm={setMobileSearchTerm}
               setSelectedTab={setSelectedTab}
            />
            <div className='flex w-full items-center justify-center lg:hidden'>
               <MobileSearch
                  placeholder='Search news'
                  searchTerm={mobileSearchTerm}
                  setSearchTerm={setMobileSearchTerm}
               />
            </div>
            <div className='flex flex-row items-center gap-2 lg:hidden'>
               <motion.button
                  initial={false}
                  animate={{
                     backgroundColor:
                        selectedTab === 'Featured'
                           ? 'rgba(239, 68, 68, 0.1)'
                           : 'transparent',
                     color:
                        selectedTab === 'Featured'
                           ? 'rgb(187, 30, 30)'
                           : 'rgb(51, 51, 51)',
                     fontWeight: selectedTab === 'Featured' ? 600 : 400,
                  }}
                  transition={{
                     duration: 0.2,
                     ease: 'easeInOut',
                  }}
                  className={twMerge(
                     'relative rounded-full px-4 py-2 leading-5',
                     'transition-colors hover:bg-red500/5'
                  )}
                  onClick={() => setSelectedTab('Featured')}
               >
                  Featured
                  {selectedTab === 'Featured' && (
                     <motion.div
                        layoutId='activeTab'
                        className='absolute inset-0 rounded-full bg-red500/10'
                        transition={{
                           type: 'spring',
                           bounce: 0.2,
                           duration: 0.6,
                        }}
                     />
                  )}
               </motion.button>

               <motion.button
                  initial={false}
                  animate={{
                     backgroundColor:
                        selectedTab === 'Latest'
                           ? 'rgba(239, 68, 68, 0.1)'
                           : 'transparent',
                     color:
                        selectedTab === 'Latest'
                           ? 'rgb(187, 30, 30)'
                           : 'rgb(51, 51, 51)',
                     fontWeight: selectedTab === 'Latest' ? 600 : 400,
                  }}
                  transition={{
                     duration: 0.2,
                     ease: 'easeInOut',
                  }}
                  className={twMerge(
                     'relative rounded-full px-4 py-2 leading-5',
                     'transition-colors hover:bg-red500/5'
                  )}
                  onClick={() => setSelectedTab('Latest')}
               >
                  Latest
                  {selectedTab === 'Latest' && (
                     <motion.div
                        layoutId='activeTab'
                        className='absolute inset-0 rounded-full bg-red500/10'
                        transition={{
                           type: 'spring',
                           bounce: 0.2,
                           duration: 0.6,
                        }}
                     />
                  )}
               </motion.button>
            </div>
            <div className='hidden w-full flex-row items-center justify-between lg:flex'>
               <p className='text-[32px] font-black leading-[100%] text-red500'>
                  My<span className='text-black600'>News</span>
               </p>
               <div className='flex w-full flex-row items-center justify-center'>
                  <Search
                     placeholder='Search news'
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm}
                  />
               </div>
            </div>
            <div className='hidden h-[1px] w-full flex-shrink-0 bg-divider/10 lg:flex'></div>
            <div className='flex h-full w-full flex-row gap-6 pb-2'>
               <div className='top-[90px] hidden h-[calc(100dvh-90px)] lg:sticky lg:flex'>
                  <Sidebar category={category} setCategory={setCategory} />
               </div>
               <div className='flex w-full flex-col gap-2'>
                  <p className='hidden text-lg font-bold leading-6 text-black600 lg:flex'>
                     News
                  </p>

                  {selectedTab === 'Featured' ? (
                     !isLoading &&
                     !isLoadingFavourites &&
                     !isFetchingFavourites &&
                     articles.length === 0 &&
                     category !== 'favourites' ? (
                        <div className='flex h-[50%] w-full items-center justify-center'>
                           <p className='text-[28px] font-black leading-[21px] text-black500'>
                              No news found
                           </p>
                        </div>
                     ) : !isLoading &&
                       !isLoadingFavourites &&
                       !isFetchingFavourites &&
                       favouriteArticles.length === 0 &&
                       category === 'favourites' ? (
                        <div className='flex h-[50%] w-full items-center justify-center'>
                           <p className='text-[28px] font-black leading-[21px] text-black500'>
                              No favourites found
                           </p>
                        </div>
                     ) : (
                        <LoadingWrapper
                           isLoading={
                              isLoading ||
                              isLoadingFavourites ||
                              isFetchingFavourites
                           }
                           className='h-[70dvh]'
                        >
                           <div className='flex h-full flex-col gap-6 pb-10'>
                              {category === '' && searchValue === '' ? (
                                 <HomeArticlesGrid
                                    articles={articles}
                                    favouriteArticles={favouriteArticles}
                                    setFavouriteArticles={setFavouriteArticles}
                                    isFetchingNextPage={isFetchingNextPage}
                                 />
                              ) : (
                                 <RegularArticlesGrid
                                    category={category}
                                    articles={articles}
                                    favouriteArticles={favouriteArticles}
                                    setFavouriteArticles={setFavouriteArticles}
                                    isFetchingNextPage={isFetchingNextPage}
                                 />
                              )}
                           </div>
                        </LoadingWrapper>
                     )
                  ) : (
                     <LoadingWrapper
                        isLoading={isLoading}
                        className='h-[70dvh] lg:hidden'
                     >
                        <div className='flex h-full w-full pb-10 lg:hidden'>
                           <LatestNews />
                        </div>
                     </LoadingWrapper>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
