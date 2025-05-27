'use client';

import useGetTopHeadlinesNews from '@api/news/hooks/useGetTopHeadlinesNews';
import { IArticle } from '@api/news/types';
import Article from '@components/article';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import Search from '@components/search';
import Sidebar from '@components/sidebar';
import usePaginationParams from '@shared/hooks/usePaginationParams';
import { useCallback, useEffect, useRef, useState } from 'react';

const HomePage = () => {
   const NEWS_PAGE_SIZE = 20;

   const { searchValue } = usePaginationParams();

   const [category, setCategory] = useState<string>('');

   const [selectedTab, setSelectedTab] = useState<string>('All');

   const [favouriteArticles, setFavouriteArticles] = useState<IArticle[]>([]);

   useEffect(() => {
      const favouritesFromLocalStorage = localStorage.getItem('favourites');
      const favourites = favouritesFromLocalStorage
         ? JSON.parse(favouritesFromLocalStorage)
         : [];

      setFavouriteArticles(favourites);
   }, []);

   useEffect(() => {
      localStorage.setItem('favourites', JSON.stringify(favouriteArticles));
   }, [favouriteArticles]);

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
      if (newsGridRef.current && !isLoading) {
         newsGridRef.current.scrollTop = 0;
         newsGridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
   }, [category, isLoading]);

   return (
      <div className='h-[calc(100dvh-90px)] w-full'>
         <nav className='news-gradient fixed left-0 top-0 z-30 flex h-[60px] w-full items-center justify-between px-[11vw]'>
            <div className='flex flex-row items-center gap-10'>
               <p className='font-bold leading-[21px] text-white500'>
                  Make MyNews your homepage
               </p>
               <p className='font-lightleading-[21px] text-sm text-white500'>
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
         <div className='mt-[90px] flex h-full w-full flex-col items-center gap-6 px-[11vw]'>
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
               <Sidebar category={category} setCategory={setCategory} />
               <div className='flex w-full flex-col gap-2'>
                  <p className='text-lg font-bold leading-6 text-black600'>
                     News
                  </p>
                  {isLoading ? (
                     <div className='flex h-full w-full items-center justify-center'>
                        <PulsatingDotsSpinner colorClassName='bg-red500' />
                     </div>
                  ) : (
                     <div
                        className='newsScrollbar flex h-[70dvh] flex-col gap-6 overflow-y-scroll'
                        onScroll={(e) => {
                           const target = e.target as HTMLElement;
                           const scrollPosition =
                              target.scrollTop + target.clientHeight;
                           const scrollHeight = target.scrollHeight;

                           if (scrollPosition >= scrollHeight) {
                              handleEndReached();
                           }
                        }}
                        ref={newsGridRef}
                     >
                        <div
                           className='grid h-full w-full gap-6'
                           style={{
                              gridTemplateColumns:
                                 'repeat(auto-fill, minmax(320px, 1fr))',
                              gridAutoRows: '300px',
                              placeItems: 'center',
                           }}
                        >
                           {category === 'favourites'
                              ? favouriteArticles.map((article: IArticle) => (
                                   <Article
                                      key={article.title}
                                      article={article}
                                      favouriteArticles={favouriteArticles}
                                      setFavouriteArticles={
                                         setFavouriteArticles
                                      }
                                   />
                                ))
                              : articles.map((article: IArticle) => (
                                   <Article
                                      key={article.title}
                                      article={article}
                                      favouriteArticles={favouriteArticles}
                                      setFavouriteArticles={
                                         setFavouriteArticles
                                      }
                                   />
                                ))}
                           {isFetchingNextPage && (
                              <div className='col-span-full flex w-full justify-center py-4'>
                                 <PulsatingDotsSpinner colorClassName='bg-red500' />
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
