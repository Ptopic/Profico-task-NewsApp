import { IArticle } from '@api/news/types';
import { IFavouriteArticle } from '@api/user/types';
import Article from '@components/article/Article';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';

interface IProps {
   category: string;
   articles: IArticle[];
   favouriteArticles: IFavouriteArticle[];
   isFetchingNextPage: boolean;
}

const RegularArticlesGrid = ({
   category,
   articles,
   favouriteArticles,
   isFetchingNextPage,
}: IProps) => {
   return (
      <div className='grid h-full w-full grid-cols-1 place-items-center gap-6 lg:[grid-auto-rows:252px] lg:[grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]'>
         {category === 'favourites'
            ? favouriteArticles.map((article: IFavouriteArticle) => (
                 <Article
                    key={article.url}
                    article={article as unknown as IArticle}
                    favouriteArticles={favouriteArticles}
                 />
              ))
            : articles.map((article: IArticle) => (
                 <Article
                    key={article.url}
                    article={article}
                    favouriteArticles={favouriteArticles}
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
