import { IArticle } from '@api/news/types';
import { Article, BreakingNewsArticle } from '@components/article';
import LatestNews from '@components/latestNews';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
   articles: IArticle[];
   favouriteArticles: IArticle[];
   setFavouriteArticles: Dispatch<SetStateAction<IArticle[]>>;
   isFetchingNextPage: boolean;
}

const HomeArticlesGrid = ({
   articles,
   favouriteArticles,
   setFavouriteArticles,
   isFetchingNextPage,
}: IProps) => {
   return (
      <div className='grid h-full w-full grid-cols-1 place-items-stretch gap-4 lg:grid-cols-3 lg:gap-6'>
         <div className='h-full w-full flex-shrink-0 lg:col-span-2 lg:row-span-2'>
            <div className='grid h-full w-full flex-shrink-0 grid-cols-1 place-items-center gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-6'>
               {articles.slice(0, 3).map((article: IArticle) => (
                  <Article
                     key={article.url}
                     article={article}
                     favouriteArticles={favouriteArticles}
                     setFavouriteArticles={setFavouriteArticles}
                  />
               ))}
               {articles.slice(3, 4).map((article: IArticle) => (
                  <BreakingNewsArticle key={article.url} article={article} />
               ))}
            </div>
         </div>
         <div className='hidden h-full w-full lg:col-start-3 lg:row-span-2 lg:flex'>
            <div className='h-full w-full'>
               <LatestNews />
            </div>
         </div>
         <div className='h-full w-full lg:col-span-3 lg:row-start-3'>
            <div className='grid h-full w-full place-items-center gap-4 lg:gap-6 lg:[grid-auto-rows:252px] lg:[grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]'>
               {articles.slice(4).map((article: IArticle) => (
                  <Article
                     key={article.url}
                     article={article}
                     favouriteArticles={favouriteArticles}
                     setFavouriteArticles={setFavouriteArticles}
                  />
               ))}
            </div>
         </div>
         {isFetchingNextPage && (
            <div className='col-span-full flex w-full justify-center py-4'>
               <PulsatingDotsSpinner colorClassName='bg-red500' />
            </div>
         )}
      </div>
   );
};

export default HomeArticlesGrid;
