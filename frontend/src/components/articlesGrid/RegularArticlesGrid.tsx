import { IArticle } from '@api/news/types';
import Article from '@components/article/Article';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
   category: string;
   articles: IArticle[];
   favouriteArticles: IArticle[];
   setFavouriteArticles: Dispatch<SetStateAction<IArticle[]>>;
   isFetchingNextPage: boolean;
}

const RegularArticlesGrid = ({
   category,
   articles,
   favouriteArticles,
   setFavouriteArticles,
   isFetchingNextPage,
}: IProps) => {
   return (
      <div className='grid h-full w-full grid-cols-1 place-items-center gap-6 lg:[grid-auto-rows:252px] lg:[grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]'>
         {category === 'favourites'
            ? favouriteArticles.map((article: IArticle) => (
                 <Article
                    key={article.url}
                    article={article}
                    favouriteArticles={favouriteArticles}
                    setFavouriteArticles={setFavouriteArticles}
                 />
              ))
            : articles.map((article: IArticle) => (
                 <Article
                    key={article.url}
                    article={article}
                    favouriteArticles={favouriteArticles}
                    setFavouriteArticles={setFavouriteArticles}
                 />
              ))}
         {isFetchingNextPage && (
            <div className='col-span-full flex w-full justify-center py-4'>
               <PulsatingDotsSpinner colorClassName='bg-red500' />
            </div>
         )}
      </div>
   );
};

export default RegularArticlesGrid;
