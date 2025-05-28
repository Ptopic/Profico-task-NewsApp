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
      <div
         className='grid h-full w-full gap-6'
         style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            placeItems: 'stretch',
         }}
      >
         <div
            className='h-full w-full flex-shrink-0'
            style={{
               gridColumn: 'span 2 / span 2',
               gridRow: 'span 2 / span 2',
            }}
         >
            <div
               className='grid h-full w-full flex-shrink-0 gap-6'
               style={{
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  placeItems: 'center',
               }}
            >
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
         <div
            className='h-full w-full'
            style={{
               gridRow: 'span 2 / span 2',
               gridColumnStart: 3,
            }}
         >
            <div className='grid h-full w-full gap-6'>
               <LatestNews />
            </div>
         </div>
         <div
            className='h-full w-full'
            style={{
               gridColumn: 'span 3 / span 3',
               gridRowStart: 3,
            }}
         >
            <div
               className='grid h-full w-full gap-6'
               style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gridAutoRows: '252px',
                  placeItems: 'center',
               }}
            >
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
