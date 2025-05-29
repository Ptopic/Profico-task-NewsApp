import { IArticle } from '@api/news/types';
import { IFavouriteArticle } from '@api/user/types';
import Article from '@components/article/Article';
import PulsatingDotsSpinner from '@components/pulsatingDotsSpinner';
import AnimatedGridItem from './AnimatedGridItem';

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
            ? favouriteArticles.map((article, index) => (
                 <AnimatedGridItem
                    key={`fav-${article.url}`}
                    index={index}
                    totalItems={favouriteArticles.length}
                 >
                    <Article
                       article={article as unknown as IArticle}
                       favouriteArticles={favouriteArticles}
                    />
                 </AnimatedGridItem>
              ))
            : articles.map((article, index) => (
                 <AnimatedGridItem
                    key={`reg-${article.url}`}
                    index={index}
                    totalItems={articles.length}
                 >
                    <Article
                       article={article}
                       favouriteArticles={favouriteArticles}
                    />
                 </AnimatedGridItem>
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
