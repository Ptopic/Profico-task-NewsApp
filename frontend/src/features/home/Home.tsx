'use client';

import useGetTopHeadlinesNews from '@api/news/hooks/useGetTopHeadlinesNews';
import { IArticle } from '@api/news/types';
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

   const [favouriteArticles, setFavouriteArticles] = useState<IArticle[]>([]);

   useEffect(() => {
      const favouritesFromLocalStorage = localStorage.getItem('favourites');
      setFavouriteArticles(
         favouritesFromLocalStorage
            ? JSON.parse(favouritesFromLocalStorage)
            : []
      );
   }, []);

   const filteredAndSortedFavourites = favouriteArticles
      .filter(
         (article: IArticle) =>
            !searchValue ||
            article.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort(
         (a: IArticle, b: IArticle) =>
            new Date(b.dateAddedToFavourites).getTime() -
            new Date(a.dateAddedToFavourites).getTime()
      );

   const {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
      refetch,
   } = useGetTopHeadlinesNews(searchValue, category, NEWS_PAGE_SIZE);

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
      if (error) {
         toastError({
            title: DEFAULT_ERROR_MESSAGE,
            description: error.message,
         });
      }
   }, [error]);

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
                  Every day discover what’s trending on the internet!
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
            <div className='flex flex-row items-center gap-4 lg:hidden'>
               <button
                  className={twMerge(
                     'leading-5 text-black600',
                     selectedTab === 'Featured' &&
                        'rounded-full bg-red500/10 px-4 py-2 font-semibold text-red500'
                  )}
                  onClick={() => setSelectedTab('Featured')}
               >
                  Featured
               </button>
               <button
                  className={twMerge(
                     'leading-5 text-black600',
                     selectedTab === 'Latest' &&
                        'rounded-full bg-red500/10 px-4 py-2 font-semibold text-red500'
                  )}
                  onClick={() => setSelectedTab('Latest')}
               >
                  Latest
               </button>
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
               <div className='top-[90px] hidden h-[calc(100vh-90px)] lg:sticky lg:flex'>
                  <Sidebar category={category} setCategory={setCategory} />
               </div>
               <div className='flex w-full flex-col gap-2'>
                  <p className='hidden text-lg font-bold leading-6 text-black600 lg:flex'>
                     News
                  </p>

                  {selectedTab === 'Featured' ? (
                     !isLoading &&
                     articles.length === 0 &&
                     category !== 'favourites' ? (
                        <div className='flex h-[50%] w-full items-center justify-center'>
                           <p className='text-[28px] font-black leading-[21px] text-black500'>
                              No news found
                           </p>
                        </div>
                     ) : !isLoading &&
                       favouriteArticles.length === 0 &&
                       category === 'favourites' ? (
                        <div className='flex h-[50%] w-full items-center justify-center'>
                           <p className='text-[28px] font-black leading-[21px] text-black500'>
                              No favourites found
                           </p>
                        </div>
                     ) : (
                        <LoadingWrapper
                           isLoading={isLoading}
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
                                    favouriteArticles={
                                       filteredAndSortedFavourites
                                    }
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
                        className='h-[70dvh]'
                     >
                        <div className='flex h-full w-full pb-10'>
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
