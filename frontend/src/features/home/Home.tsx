'use client';

import useGetTopHeadlinesNews from '@api/news/hooks/useGetTopHeadlinesNews';
import { IArticle } from '@api/news/types';
import {
   HomeArticlesGrid,
   RegularArticlesGrid,
} from '@components/articlesGrid';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import Search from '@components/search';
import Sidebar from '@components/sidebar';
import usePaginationParams from '@shared/hooks/usePaginationParams';
import { useCallback, useEffect, useRef, useState } from 'react';

const HomePage = () => {
   const NEWS_PAGE_SIZE = 50;

   const { searchValue } = usePaginationParams();

   const [category, setCategory] = useState<string>('');

   const [selectedTab, setSelectedTab] = useState<string>('All');

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

   const newsGridRef = useRef<HTMLDivElement>(null);

   const {
      articles,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
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
      if (newsGridRef.current && !isLoading) {
         newsGridRef.current.scrollTop = 0;
         newsGridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
   }, [category, isLoading]);

   return (
      <div className='h-full w-full'>
         <nav className='news-gradient fixed left-0 top-0 z-30 flex h-[60px] w-full items-center justify-between px-[11dvw]'>
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
         <div className='mt-[90px] flex h-full w-full flex-col items-center gap-6 px-[11dvw]'>
            <div className='flex w-full flex-row items-center justify-between'>
               <p className='text-[32px] font-black leading-[100%] text-red500'>
                  My<span className='text-black600'>News</span>
               </p>
               <div className='flex w-full flex-row items-center justify-center'>
                  <Search placeholder='Search news' />
               </div>
            </div>
            <div className='h-[1px] w-full flex-shrink-0 bg-divider/10'></div>
            <div className='flex h-full w-full flex-row gap-6 pb-2'>
               <div className='sticky top-[90px] h-[calc(100vh-90px)]'>
                  <Sidebar category={category} setCategory={setCategory} />
               </div>
               <div className='flex w-full flex-col gap-2'>
                  <p className='text-lg font-bold leading-6 text-black600'>
                     News
                  </p>

                  {isLoading ? (
                     <div className='flex h-full w-full items-center justify-center'>
                        <PulsatingDotsSpinner colorClassName='bg-red500' />
                     </div>
                  ) : articles.length === 0 && category !== 'favourites' ? (
                     <div className='flex h-[50%] w-full items-center justify-center'>
                        <p className='text-[28px] font-black leading-[21px] text-black500'>
                           No news found
                        </p>
                     </div>
                  ) : favouriteArticles.length === 0 &&
                    category === 'favourites' ? (
                     <div className='flex h-[50%] w-full items-center justify-center'>
                        <p className='text-[28px] font-black leading-[21px] text-black500'>
                           No favourites found
                        </p>
                     </div>
                  ) : (
                     <div
                        className='flex h-full flex-col gap-6 pb-10'
                        ref={newsGridRef}
                     >
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
                              favouriteArticles={filteredAndSortedFavourites}
                              setFavouriteArticles={setFavouriteArticles}
                              isFetchingNextPage={isFetchingNextPage}
                           />
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
